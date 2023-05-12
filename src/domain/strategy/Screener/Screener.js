import style from "./Screener.module.scss"
import { React, useState, useEffect } from "react"
import { Desktop, Tablet, Mobile } from "../../../store/mediaQuery"
import {
  faChevronLeft, faFilter, faFolder, faFolderOpen
} from "@fortawesome/free-solid-svg-icons"
import {
  faSquare, faSquareCheck
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import SortTable from "../../../components/SortTable"
import MultilRangeSlider from "../../../components/MultiRangeSlider"
import { BarLoader } from "react-spinners"
import { loader_override } from "../../../store/export_const"

import filterListJson from "../../../store/json/screenerFilterList.json"
import { useNavigate } from "react-router-dom"



const FilterBox = ({ filterList, setFilterList }) => {

  const onClickFolder = (e) => {
    const category = e.target.attributes.category.value
    const opened = filterList[category].opened
    setFilterList(
      {
        ...filterList,
        [category]: {
          ...filterList[category],
          "opened": !opened
        }
      })
  }
  const onClickSelected = (e) => {
    const category = e.target.attributes.category.value
    const name = e.target.attributes.name.value
    const selected = filterList[category].list[name].selected
    setFilterList(
      {
        ...filterList,
        [category]: {
          ...filterList[category],
          "list": {
            ...filterList[category].list,
            [name]: {
              ...filterList[category].list[name],
              "selected": !selected
            }
          }
        }
      }
    )
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
            Object.values(filterList).map((categoryItem, index) => (
              <div className={style.category} key={index}>
                <div className={style.categoryHeader}>
                  {
                    categoryItem.opened === true
                      ?
                      <FontAwesomeIcon icon={faFolderOpen} className={style.folderIcon} />
                      : <FontAwesomeIcon icon={faFolder} className={style.folderIcon} />
                  }
                  <div
                    className={style.categoryTitle}
                    onClick={onClickFolder}
                    category={categoryItem.category}
                  >{categoryItem.categoryTitle}</div>
                </div>
                {
                  // 하위 리스트
                  categoryItem.opened === true
                    ? Object.values(categoryItem.list).map((item, index) => (
                      item.selected === true
                        ? <div key={index}
                          className={style.selectedCategoryBody}
                          onClick={onClickSelected}
                          category={categoryItem.category}
                          name={item.name}
                        > {item.title} </div>
                        : <div key={index}
                          className={style.categoryBody}
                          onClick={onClickSelected}
                          category={categoryItem.category}
                          name={item.name}
                        > {item.title} </div>
                    ))
                    : null
                }
              </div>))
          }
        </div>
        <hr className={style.hr} />

        <div className={style.selectedFilterList}>
          {
            Object.values(filterList).map((categoryItem) => (
              Object.values(categoryItem.list).map((item, index) => (
                // 선택된 필터
                item.selected === true
                  ? <div key={index}>{item.title}</div>
                  : null

              ))
            ))
          }
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