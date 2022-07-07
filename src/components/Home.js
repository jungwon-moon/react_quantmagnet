import './Home.css'
import { useState, useEffect } from "react"
import axios from "axios"
import Highcharts from 'highcharts'
import wordCloud from 'highcharts/modules/wordcloud.js'
import HighchartsReact from 'highcharts-react-official'
import { getKeywordsTime } from '../utils/utils'

wordCloud(Highcharts)

// Main Components
const Home = () => {
  // useState
  const width = window.innerWidth

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
        condition: { maxWidth: 800 },
        chartOptions: {
          chart: {
            width: width
          },
          caption: {
            text: getKeywordsTime()
          }
        }
      }]
    }
  }


  // useEffect
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/categorykeywords/',
      params: {
        date__contains: getKeywordsTime(),
        category_code__contains: '002000000'
      }
    }).then(
      res => {
        const results = res.data.results
        const keywords = results.map(
          x => {
            let y = {}
            y['name'] = x['named_entity']
            y['weight'] = x['named_entity_count']
            return y
          })
        setData(keywords)
      })
  }, [])


  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}

export default Home;