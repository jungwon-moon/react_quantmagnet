import { React, useState, useEffect } from "react";
import axios from 'axios';
import './Screener.css'
import SortTable from '../components/SortTable'


const Filters = () => {
  return (
    <>
      <Filter />
    </>
  )
}

const Filter = () => {
  return (
    <>

    </>
  )
}

function Screener() {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    date__contains: '20220331',
    per__lte: '10',
    roe__gte: '30'
  })
  const columns = [
    { accessor: "stnm", Header: "종목명" },
    { accessor: "stcd", Header: "종목코드" },
    { accessor: "pbr", Header: "PBR" },
    { accessor: "per", Header: "PER" },
    { accessor: "eps", Header: "EPS" },
    { accessor: "bps", Header: "BPS" },
    { accessor: "roe", Header: "ROE" },
    { accessor: "dvd_yld", Header: "DVD_YLD" },
  ]
  

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/kr/fundamental',
      params: params
    }).then(
      res => setData([...res.data.results])
    )
  }, []);


  return (
    <div>
      <div className="main-page">
        <h1>종목 스크리너</h1>
        <Filters />
        <SortTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Screener