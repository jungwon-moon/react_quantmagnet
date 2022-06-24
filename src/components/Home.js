import './Home.css'
import './Card.css'
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
  const [data, setData] = useState('')
  const options = {
    chart: {
      type: "wordcloud",
      width: 1000,
      height: 600
    },
    series: [{
      data: data,
      name: 'count'
    }],
    title: {
      text: '<b>경제 뉴스 키워드</b>'
    },
    responsive: {
      rules: [{
        condition: { maxWidth: 576 },
        chartOptions: {
          chart: {
            width: 300,
            height: 300
          },
          // subtitle: { text: null },
          // navigator: { enabled: false }
        }
      }]
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
      // text: ''
    },
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