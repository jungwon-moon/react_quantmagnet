import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Chart from "react-apexcharts"
import axios from "axios"
import "./StockDetails.css"


const StockDetailHeader = ({ details, price }) => {
  return (
    <div className="stockDetailHeader">
      <div className="symbolArea">
        <div className="symbolBox">{price.market}</div>
        <div className="symbolBox">{details.stcd}</div>
        <div style={{ fontSize: "2rem" }}>{details.stnm}</div>
      </div>

      <div className="priceArea">
        <div className="priceBox">{price.close}</div>
        <div className="prevdBox">
          <div style={{ fontWeight: "300" }}>기준일: {price.date}</div>
          {price.prevd > 0
            ? <div style={{ color: "red" }}>+{price.prevd}(+{price.rate} %)</div>
            : <div style={{ color: "blue" }}>{price.prevd}({price.rate} %)</div>
          }
        </div>
      </div>
    </div>
  )
}


const StockDetailBody = ({ details, price, prices }) => {
  const data = prices.map((d) => [{
      x: d.date.slice(0, 4)+'-'+d.date.slice(4,6)+'-'+d.date.slice(6,8),
      y: [d.open, d.high, d.low, d.close]
  }]).map(d => d[0])

  const priceChart = {
    options: {
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },
    series: [{
      data: data
    }]
  }

  return (
    <div className="stockDetailBody">
      <div className="contentChart">
        <Chart
          type="candlestick"
          height={250}
          width={300}
          options={priceChart.options}
          series={priceChart.series}
        />
      </div>


      <div className="contentTable">
        <div className="contentTableRow">
          <div>전일 종가</div>
          <div>{String(price.close - price.prevd)}</div>
        </div>
        <div className="contentTableRow">
          <div>시작가</div>
          <div>{price.open}</div>
        </div>
        <div className="contentTableRow">
          <div>PBR</div>
          <div>{details.pbr}</div>
        </div>
        <div className="contentTableRow">
          <div>PER</div>
          <div>{details.per}</div>
        </div>
        <div className="contentTableRow">
          <div>PER</div>
          <div>{details.per}</div>
        </div>
      </div>
    </div>
  )
}


const StockDetails = () => {
  const stcd = useParams().stcd
  const [price, setPrice] = useState([{  }])
  const [prices, setPrices] = useState([{
    date: '000000'
    }])
  const [details, setDetails] = useState([{}])
  const params = {
    stcd__contains: stcd,
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/valuation/',
      params: params
    }).then(
      res => {
        const data = res.data.results
        setDetails(data[data.length - 1])
      }
    )
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/stockprice/',
      params: params
    }).then(
      res => {
        const data = res.data.results
        setPrice(data[data.length - 1])
        setPrices(data.slice(-200))
      }
    )
  }, [])


  return (
    <>
      <div className="main-page-vertical">
        <StockDetailHeader details={details} price={price} />
        <StockDetailBody details={details} price={price} prices={prices} />
      </div>
    </>
  )
}

export default StockDetails