import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { comma } from '../common/utils/utils'
import Chart from "react-apexcharts"
import axios from "axios"
import "./StockDetails.css"


function resultValue(value) {
  if (value === null) {
    return '-'
  } else {
    return value
  }
}

const StockDetailHeader = ({ details, price }) => {
  return (
    <div className="stockDetailHeader">
      <div className="symbolArea">
        <div className="symbolBox">{price.market}</div>
        <div className="symbolBox">{details.stcd}</div>
        <div style={{ fontSize: "2rem", paddingTop: "4px" }}>{details.stnm}</div>
      </div>

      <div className="priceArea">
        <div className="priceBox">{comma(price.close)}</div>
        <div className="prevdBox">
          <div style={{ fontWeight: "300" }}>기준일: {price.date}</div>
          {price.prevd > 0
            ? <div style={{ color: "red", fontSize: "20px" }}>+{comma(price.prevd)}(+{price.rate} %)</div>
            : <div style={{ color: "blue", fontSize: "20px" }}>{comma(price.prevd)}({price.rate} %)</div>
          }
        </div>
      </div>
    </div>
  )
}


const StockDetailBody = ({ details, price, prices }) => {
  const width = window.innerWidth - 20

  const data = prices.map((d) => [{
    x: d.date.slice(0, 4) + '-' + d.date.slice(4, 6) + '-' + d.date.slice(6, 8),
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
      },
      responsive: [{
        breakpoint: 867,
        options: {
          chart: {
            width: width
          }
        }
      }]

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
          height={350}
          width={width / 3}
          options={priceChart.options}
          series={priceChart.series}
        />
      </div>

      <div className="contentTable">
        <div className="contentTableRow">
          <div>전일 종가</div>
          <div>{String(comma(price.close - price.prevd))}</div>
        </div>
        <div className="contentTableRow">
          <div>시작가</div>
          <div>{comma(price.open)}</div>
        </div>
        <div className="contentTableRow">
          <div>PBR</div>
          <div>{resultValue(details.pbr)}</div>
        </div>
        <div className="contentTableRow">
          <div>PER</div>
          <div>{resultValue(details.per)}</div>
        </div>
        <div className="contentTableRow">
          <div>BPS</div>
          <div>{resultValue(details.bps)}</div>
        </div>
        <div className="contentTableRow">
          <div>DPS</div>
          <div>{resultValue(details.dps)}</div>
        </div>
        <div className="contentTableRow">
          <div>ROE</div>
          <div>{resultValue(details.roe)}</div>
        </div>
        <div className="contentTableRow">
          <div>DVD_YLD</div>
          <div>{resultValue(details.dvd_yld)}</div>
        </div>
      </div>
    </div>
  )
}

// Main Components
const StockDetails = () => {
  // useState
  const stcd = useParams().stcd
  const [price, setPrice] = useState([{}])
  const [prices, setPrices] = useState([{
    date: '000000'
  }])
  const [details, setDetails] = useState([{}])


  // useEffect
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/val-det/',
      params: {
        stcd__contains: stcd,
        // limit: 1
      }
    }).then(
      res => {
        const data = res.data
        setDetails(data[data.length - 1])
      }
    )
  }, [stcd])

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/stockprice/',
      params: {
        stcd__contains: stcd,
        limit: 300
      }
    }).then(
      res => {
        const data = res.data.results.reverse()
        console.log(res.data.results)
        setPrice(data[data.length - 1])
        setPrices(data.slice())
      }
    )
  }, [stcd])


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