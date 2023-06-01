import style from "./StockDetails.module.scss"
import axios from "axios"
import { React, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { comma } from '../utils/utils'
import Chart from "react-apexcharts"

import outputListJson from "../store/json/stockDetailsOutputList.json"


function resultNotNull(value) {
  if (value === ("null" || null)) {
    return '-'
  } else {
    return value
  }
}

const TableRow = ({ title, variable, price, details }) => {
  const tableList = {
    "prevd": String(comma(price.close - price.prevd)),
    "open": resultNotNull(comma(price.open)),
    "pbr": resultNotNull(comma(details.pbr)),
    "per": resultNotNull(comma(details.per)),
    "bps": resultNotNull(comma(details.bps)),
    "dps": resultNotNull(comma(details.dps)),
    "roe": resultNotNull(comma(details.roe)),
    "dvd_yld": resultNotNull(comma(details.dvd_yld)),
  }

  return (
    <div className={style.tableRow}>
      <div>{title}</div>
      <div>{tableList[variable]}
      </div>
    </div>
  )
}

const StockDetailHeader = ({ details, price }) => {
  return (
    <div className={style.header}>
      <div className={style.symbolArea}>
        <div className={style.symbolBox}>{price.market}</div>
        <div className={style.symbolBox}>{details.stcd}</div>
        <div className={style.stockName}>{details.stnm}</div>
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
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },
    },
    series: [{
      data: data
    }]
  }

  return (
    <div className={style.body}>
      <div className={style.priceArea}>
        <div className={style.priceBox}>{comma(price.close)}</div>
        <div className={style.prevBox}>
          <div>기준일: {price.date}</div>
          {price.prevd > 0
            ? <div className={style.pricePlus}>+{comma(price.prevd)}(+{price.rate} %)</div>
            : <div className={style.priceMinus}>{comma(price.prevd)}({price.rate} %)</div>
          }
        </div>
      </div>
      <Chart
        type="candlestick"
        height="auto"
        options={priceChart.options}
        series={priceChart.series}
      />

      <div className={style.contentTable}>
        {
          outputListJson.map((item, index) => (
            <TableRow
              key={index}
              title={item.title}
              variable={item.variable}
              price={price}
              details={details}
            />
          ))
        }
      </div>
    </div>
  )
}

// Main Components
const StockDetails = () => {
  // useState
  const navigate = useNavigate()
  const onClickGoBack = () => {
    navigate(-1)
  }
  const stcd = useParams().stcd
  const [price, setPrice] = useState([{}])
  const [prices, setPrices] = useState([{
    date: '000000', stcd: "000000"
  }])
  const [details, setDetails] = useState([{}])


  // useEffect
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/val-det/',
      params: {
        stcd__contains: stcd,
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
        limit: 40
      }
    }).then(
      res => {
        const data = res.data.results.reverse()
        setPrice(data[data.length - 1])
        setPrices(data.slice())
      }
    )
  }, [stcd])

  return (
    <div className={style.content}>
      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack}
        />
        주식 상세 정보
      </div>
      <StockDetailHeader details={details} price={price} />
      <StockDetailBody details={details} price={price} prices={prices} />
    </div>
  )
}

export default StockDetails