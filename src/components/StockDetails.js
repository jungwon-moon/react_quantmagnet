import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { comma } from '../utils/utils'
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
        <div className="priceBox">{comma(price.close)}</div>
        <div className="prevdBox">
          <div style={{ fontWeight: "300" }}>기준일: {price.date}</div>
          {price.prevd > 0
            ? <div style={{ color: "red" }}>+{comma(price.prevd)}(+{price.rate} %)</div>
            : <div style={{ color: "blue" }}>{comma(price.prevd)}({price.rate} %)</div>
          }
        </div>
      </div>
    </div>
  )
}


const StockDetailBody = ({ details, price, prices }) => {
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
          <div>{String(comma(price.close - price.prevd))}</div>
        </div>
        <div className="contentTableRow">
          <div>시작가</div>
          <div>{comma(price.open)}</div>
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
          <div>BPS</div>
          <div>{details.bps}</div>
        </div>
        <div className="contentTableRow">
          <div>DPS</div>
          <div>{details.dps}</div>
        </div>
        <div className="contentTableRow">
          <div>ROE</div>
          <div>{details.roe}</div>
        </div>
        <div className="contentTableRow">
          <div>DVD_YLD</div>
          <div>{details.dvd_yld}</div>
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
      url: '/api/kr/valuation/',
      params: { stcd__contains: stcd }
    }).then(
      res => {
        const data = res.data.results
        setDetails(data[data.length - 1])
      }
      )
    }, [stcd])
    
    useEffect(() => {
      axios({
        method: 'get',
        url: '/api/kr/stockprice/',
        params: { stcd__contains: stcd }
      }).then(
        res => {
          const data = res.data.results
          setPrice(data[data.length - 1])
          setPrices(data.slice(-200))
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