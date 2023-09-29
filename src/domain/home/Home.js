import style from "./Home.module.scss"
import { useState, useEffect } from "react"
import { comma } from "../../utils/utils"
import { Link } from "react-router-dom"
import axios from "axios"
import Highcharts from "highcharts"
import wordCloud from "highcharts/modules/wordcloud.js"
import HighchartsReact from "highcharts-react-official"
import { BarLoader } from "react-spinners"
import { loader_override } from "../../store/export_const"

wordCloud(Highcharts)

const StockListCard = ({ title, data, path }) => {
  return (
    <div className={style.stockListCard}>
      <Link
        className={style.SLCTitle}
        to={path}
      >{title}</Link>
      <div className={style.SLCHeader}>
        <div className={`${style.SLCItem1} ${style.textCenter}`}>종목코드</div>
        <div className={`${style.SLCItem2} ${style.textCenter}`}>종목명</div>
        <div className={`${style.SLCItem1} ${style.textCenter}`}>변동률</div>
        <div className={`${style.SLCItem3} ${style.textCenter}`}>종가</div>
        <div className={`${style.SLCItem4} ${style.textCenter}`}>거래대금</div>
      </div>
      {
        data ? <> {
          data.slice(0, 10).map((item, index) => (
            <Link
              className={style.SLCItems}
              to={`/stockdetails/${item.stcd}`}
              key={index}>
              <div className={style.SLCItem1}>{item.stcd}</div>
              <div className={style.SLCItem2}>{item.stnm}</div>
              <div className={`${style.SLCItem1} ${style.textRight}`}>{item.rate} %</div>
              <div className={`${style.SLCItem3} ${style.textRight}`}>{comma(item.close)}</div>
              <div className={`${style.SLCItem4} ${style.textRight}`}>{comma(item.value)}</div>
            </Link>
          ))
        }
        </>
          : <>해당 종목이 없습니다.</>
      }
      <Link
        className={style.SLCFooter}
        to={path}>더보기</Link>
    </div >
  )
}

// Main Components
const Home = () => {
  // useState
  const [cloudLoading, setCloudLoading] = useState(true)
  const [data, setData] = useState('')
  const [gains, setGains] = useState('')
  const [losers, setLosers] = useState('')
  const [values, setValues] = useState('')

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
      style: { "color": "#e9e9e9", "fontSize": "25px" }
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
    setCloudLoading(true)
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
        setCloudLoading(false)
      }
    )
  }, [])

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/kr/gainers-losers"
    }).then(
      res => {
        const results = res.data
        setGains(results.slice(0, 10))
        setLosers(results.slice(-10).reverse())
      }
    )
  }, [])

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/kr/soaringvalue"
    }).then(
      res => {
        const results = res.data
        setValues(results)
      }
    )
  }, [])

  return (
    <div className={style.home}>
      <div className={style.contents}>
        <div className={style.wordCloud}>
          {
            cloudLoading ? <BarLoader cssOverride={loader_override} size={150} />
              : <HighchartsReact highcharts={Highcharts} options={options} />
          }
        </div>
        <StockListCard title="상승률" path="./trend/gainers-losers" data={gains} />
        <StockListCard title="하락률" path="./trend/gainers-losers" data={losers} />
        <StockListCard title="거래대금 급등주" path="./trend/soaringvalue" data={values} />
      </div>
    </div>
  )
}


export default Home