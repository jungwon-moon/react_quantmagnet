import './Home.css'
import { useState, useEffect } from "react"
import axios from "axios"
import Highcharts from 'highcharts'
import wordCloud from 'highcharts/modules/wordcloud.js'
import HighchartsReact from 'highcharts-react-official'
import { getKeywordsTime } from '../../common/utils/utils'
import { BarLoader } from "react-spinners";
import { loader_override } from "../../common/export_const"

wordCloud(Highcharts)

// Main Components
const Home = () => {
  // useState
  const width = window.innerWidth

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState('')
  const options = {
    chart: {
      type: "wordcloud",
      width: width / 2
    },
    series: [{
      data: data,
      name: 'count'
    }],
    title: {
      text: '<b>경제 뉴스 키워드</b>'
    },
    accessibility: {
      enabled: false
    },
    // 하단 워터마크
    credits: {
      enabled: false
    },
    // 하단 캡션
    caption: {
      text: null
    },
    // 반응형 차트 설정
    responsive: {
      rules: [{
        condition: { maxWidth: 768 },
        chartOptions: {
          chart: {
            width: width
          },
          caption: {
            text: parseInt(getKeywordsTime()) + 5
          }
        }
      }]
    }
  }


  // useEffect
  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: '/api/categorykeywords',
      params: {
        code: '002000000',
        format: 'json'
      }
    }).then(
      res => {
        const results = res.data
        const keywords = results.map(
          x => {
            let y = {}
            y['name'] = x['named_entity']
            y['weight'] = x['named_entity_count']
            return y
          })
        setData(keywords)
        setLoading(false)
      })
  }, [])


  return (
    <>
      {loading ? <BarLoader cssOverride={loader_override} size={150} />
        : <HighchartsReact highcharts={Highcharts} options={options} />
      }
    </>
  )
}

export default Home;