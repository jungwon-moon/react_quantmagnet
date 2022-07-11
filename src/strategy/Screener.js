import { useState, useEffect } from "react";
import axios from 'axios';
import './Screener.css'
import SortTable from '../components/SortTable'
import MultilRangeSlider from "../components/MultiRangeSlider";
import { getScreenerDate } from "../utils/utils";
import { RingLoader } from "react-spinners";
  

const override = {
  display: "block",
  margin: "auto",
  borderColor: "black"
}

const filter = [
  {
    id: 1,
    title: "주가순자산비율(PBR)",
    name: "pbr",
    min: "0",
    max: "50",
    left: "0",
    right: "50",
  },
  {
    id: 2,
    title: "주가수익률(PER)",
    name: "per",
    min: "0",
    max: "500",
    left: "0",
    right: "500",
  },
  {
    id: 3,
    title: "주당순이익(EPS)",
    name: "eps",
    min: "0",
    max: "100",
    left: "0",
    right: "100",
  },
  {
    id: 4,
    title: "주당순자산가치(BPS)",
    name: "bps",
    min: "500",
    max: "200000",
    left: "500",
    right: "200000",
  },
  {
    id: 5,
    title: "자기자본이익률(ROE)",
    name: "roe",
    min: "0",
    max: "300",
    left: "0",
    right: "300",
  },
]
const Filters = ({ change, onClickLookup }) => {
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
      <button className="button"
        onClick={onClickLookup}>조회</button>
    </div>
  )
}

// Screener Components
function Screener() {
  const date = getScreenerDate()

  const [loading, setLoading] = useState(true)
  const [lookup, setLookup] = useState(true)
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    date__contains: date,
    pbr__gte: '0',
    pbr__lte: '50',
    per__gte: '0',
    per__lte: '500',
    eps__gte: '0',
    eps__lte: '100',
    bps__gte: '500',
    bps__lte: '20000',
    roe__gte: '0',
    roe__lte: '300',
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

  // useEffect
  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: '/api/kr/valuation',
      params: params
    }).then(
      res => {
        setData([...res.data.results])
        setLoading(false)
      }
    )
  }, [lookup])   // eslint-disable-line react-hooks/exhaustive-deps


  const handleSliderChange = (e) => {
    const { name, value } = e.target
    setParams({
      ...params,
      [name]: value
    })
  }

  const onClickLookup = () => {
    setLookup(!lookup)
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>종목 스크리너</h1>
      <div className="container">
        <Filters params={params} change={handleSliderChange} onClickLookup={onClickLookup} />
        {
          loading ? <RingLoader cssOverride={override} size={150} />
          :<SortTable className="screenerTable" columns={columns} data={data} />
        }
      </div>
    </div>
  )
}

export default Screener