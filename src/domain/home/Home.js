import style from "./Home.module.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import Highcharts from "highcharts"
import wordCloud from "highcharts/modules/wordcloud.js"
import HighchartsReact from "highcharts-react-official"
import { BarLoader } from "react-spinners"
import { loader_override } from "../../store/export_const"

wordCloud(Highcharts)

// Main Components
const Home = () => {
  // useState

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState('')
  const options = {
    chart: {
      backgroundColor: '#202020',
      type: "wordcloud",
    },
    series: [{
      data: data,
      name: "count"
    }],
    title: {
      text: "<b>경제 뉴스 키워드</b>",
      style: {"color": "#e9e9e9", "fontSize": "30px"}
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
          }
        )
        setData(keywords)
        setLoading(false)
      }
    )
  }, [])
  return (
    <div className={style.home}>
      <div className={style.contents}>
        {loading ? <BarLoader cssOverride={loader_override} size={150} />
          : <HighchartsReact highcharts={Highcharts} options={options} />
        }
      </div>
    </div>
  )
}


export default Home