import style from "./Screener.module.scss"
import { React, useState, useEffect } from "react"
import { Desktop, Tablet, Mobile } from "../../../store/mediaQuery"
import { faChevronLeft, faFilter, faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import SortTable from "../../../components/SortTable"
import MultilRangeSlider from "../../../components/MultiRangeSlider"
import { BarLoader } from "react-spinners"
import { loader_override } from "../../../store/export_const"

import filterListJson from "../../../store/json/screenerFilterList.json"
import { useNavigate } from "react-router-dom"



const FilterBox = ({ change, filterList, setFilterList }) => {

  const onClickFolder = (e) => {
    const category = e.target.attributes.category.value
    const opened = !filterList[category].opened
    setFilterList(
      {
        ...filterList,
        [category]: {
          ...filterList[category],
          ["opened"]: opened
        }
      })
  }
  return (
    <div className={style.filterBox}>
      <div className={style.filterTitle}>
        <FontAwesomeIcon icon={faFilter} className={style.filterIcon} />
        종목 필터</div>
      <hr className={style.hr} />
      <div className={style.filterBody}>

        <div className={style.filterList}>
          {
            // categoty
            Object.values(filterList).map((item, index) => (
              <div className={style.category} key={index}>
                <div className={style.categoryHeader}>
                  {
                    item.opened === true
                      ?
                      <FontAwesomeIcon
                        icon={faFolderOpen}
                        className={style.folderIcon}
                      />
                      : <FontAwesomeIcon
                        icon={faFolder}
                        className={style.folderIcon}
                      />
                  }
                  <div
                    className={style.categoryTitle}
                    onClick={onClickFolder}
                    category={item.category}
                  >{item.categoryTitle}</div>
                </div>
                {
                  // 하위 리스트
                  item.opened === true
                    ? Object.values(item.list).map((item, index) => (
                      <div key={index}
                        className={style.categoryBody}>
                        {item.title}
                      </div>
                    ))
                    : null
                }
              </div>))
          }
        </div>
        <hr className={style.hr} />

        <div className={style.selectedFilterList}>
          {/* {
            filterList.map((item, index) =>
              <div key={index} className={style.filter}>
                <div className={style}>{item.title}</div>
                <MultilRangeSlider key={index}
                  name={item.name} change={change}
                  min={item.min} max={item.max}
                  left={item.left} right={item.right} />
              </div>
            )
          } */}
        </div>

      </div>
    </div>
  )
}
// Screener Components
function Screener() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [filterList, setFilterList] = useState(filterListJson)
  const [lookup, setLookup] = useState(true)
  const [data, setData] = useState([])
  const [params, setParams] = useState({
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
      method: "get",
      url: "/api/kr/valuation",
      params: params
    }).then(
      res => {
        setData([...res.data])
        setLoading(false)
      }
    )
  }, [lookup])   // eslint-disable-line react-hooks/exhaustive-deps


  // Event
  const onClickGoBack = () => {
    navigate(-1)
  }

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
    <div className={style.content}>

      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack} />
        종목 스크리너
      </div>


      <div className={style.container}>
        <FilterBox
          params={params}
          change={handleSliderChange}
          filterList={filterList}
          setFilterList={setFilterList}
        />
        <div className={style.lookupButton}
          onClick={onClickLookup}>조회</div>

        {/* table */}
        {
          loading
            ? <BarLoader cssOverride={loader_override} size={150} />
            : <SortTable className="screenerTable" columns={columns} data={data} />
        }
      </div>
    </div>
  )
}

export default Screener