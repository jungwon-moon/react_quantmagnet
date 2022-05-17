import { React, useState, useEffect } from "react";
import axios from 'axios';
import './Screener.css'
import SortTable from '../components/SortTable'
import MultilRangeSlider from "../components/MultiRangeSlider";

const filter = [
  {
    id: 1,
    title: "주당순이익(EPS) ⓘ",
    name: "eps",
    min: "0",
    max: "100",
    left: "0",
    right: "100",
  },
  {
    id: 2,
    title: "주가수익률(PER) ⓘ",
    name: "per",
    min: "0",
    max: "500",
    left: "0",
    right: "500",
  },
  {
    id: 3,
    title: "주당순자산가치(BPS) ⓘ",
    name: "bps",
    min: "500",
    max: "200000",
    left: "500",
    right: "200000",
  },
  {
    id: 4,
    title: "주가순자산비율(PBR) ⓘ",
    name: "pbr",
    min: "0",
    max: "50",
    left: "0",
    right: "50",
  },
  {
    id: 5,
    title: "자기자본이익률(ROE) ⓘ",
    name: "roe",
    min: "0",
    max: "300",
    left: "0",
    right: "300",
  },
]
const Filters = ({ change }) => {
  return (
    <div className="filter-box">
      {
        filter.map((filter) =>
          <div key={filter.id} className="filter">
            <div className="filterItem">{filter.title}</div>
            <MultilRangeSlider key={filter.id}
              name={filter.name} change={change}
              min={filter.min} max={filter.max}
              left={filter.left} right={filter.right} />
          </div>
        )}
      <button>조회</button>

    </div>
  )
}

// Screener Components
function Screener() {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    date__contains: '20220404',
    per__gte: '0',
    per__lte: '100',
    roe__gte: '30',
    roe__lte: '100',
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


  const handleSliderChange = (e) => {
    const { name, value } = e.target
    setParams({
      ...params,
      [name]: value
    })
  }

  return (
    <div>
      <div>
        <h1>종목 스크리너</h1>
        <div className="container">
          <Filters params={params} change={handleSliderChange} />
          <SortTable className="screenerTable" columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Screener