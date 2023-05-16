import style from "./Screener.module.scss"
import { React, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Desktop, Tablet, Mobile } from "../../../store/mediaQuery"
import {
  faChevronLeft, faFilter, faFolder, faFolderOpen
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import SortTable from "./SortTable"
import MultiSlider from "../../../components/MultiSlider"
import { BarLoader } from "react-spinners"
import { loader_override } from "../../../store/export_const"

import filterListJson from "../../../store/json/screenerFilterList.json"



const FilterBox = ({
  filterList,
  setFilterList,
  onChangeSlider
}) => {
  const [toggleFilter, setToggleFilter] = useState(true)

  const onClickFilter = () => {
    setToggleFilter(!toggleFilter)
  }

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
      })
  }
  return (
    <div className={style.filterBox}>
      <div className={style.filterTitle} onClick={onClickFilter}>
        <FontAwesomeIcon icon={faFilter} className={style.filterIcon} />
        종목 필터
      </div>
      <hr className={style.hr} />
      {
        toggleFilter
          ? <>
            <div className={style.filterBody}>
              <div className={style.filterList}>
                {
                  // categoty
                  Object.values(filterList).map((categoryItem, index) => (
                    <div className={style.category} key={index}>
                      <div className={style.categoryHeader}>
                        {
                          categoryItem.opened === true
                            ? <FontAwesomeIcon icon={faFolderOpen} className={style.folderIcon} />
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
                        ? <div key={index}
                          className={style.filter}
                        >
                          <div>{item.title}</div>
                          <MultiSlider
                            name={categoryItem.category + "_" + item.name}
                            min={item.min}
                            max={item.max}
                            left={item.left}
                            right={item.right}
                            onChange={onChangeSlider}
                          />
                        </div>
                        : null
                    ))
                  ))
                }
              </div>

            </div>
          </>
          : null
      }
    </div>
  )
}


// Screener Components
function Screener() {
  // State
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const [filterList, setFilterList] = useState(filterListJson)
  const [isLookup, setIsLookup] = useState(false)
  const [data, setData] = useState([])
  const [params, setParams] = useState({})
  const columns = [
    { accessor: "stnm", Header: "종목명", class: "title" },
    { accessor: "stcd", Header: "종목코드", class: "fixed" },
    { accessor: "pbr", Header: "PBR" },
    { accessor: "per", Header: "PER" },
    { accessor: "eps", Header: "EPS" },
    { accessor: "bps", Header: "BPS" },
    { accessor: "roe", Header: "ROE" },
    { accessor: "dvd_yld", Header: "DVD_YLD" },
  ]


  // Event
  const onClickGoBack = () => {
    navigate(-1)
  }

  const onChangeSlider = (name, value) => {
    const names = name.split('_')
    setFilterList({
      ...filterList,
      [names[0]]: {
        ...filterList[names[0]],
        "list": {
          ...filterList[names[0]].list,
          [names[1]]: {
            ...filterList[names[0]].list[names[1]],
            [names[2]]: value
          }
        }
      }
    })
  }

  const onClickLookup = () => {
    setLoading(true)
    setIsLookup(true)
    let tmp = {}
    for (let category in filterList) {
      for (let items in filterList[category].list) {
        const item = filterList[category].list[items]
        if (item.selected === true) {
          tmp[`${item.name}__gte`] = item.left
          tmp[`${item.name}__lte`] = item.right
        }
      }
    } setParams(tmp)
  }
  

  // Effect
  useEffect(() => {
    if (isMounted.current) {
      async function fetchData() {
        await axios({
          method: "get",
          url: "/api/kr/valuation",
          params: params
        }).then((res) => {
          setData([...res.data.results])
          setLoading(false)
        })
      }
      fetchData()
    } else {
      isMounted.current = true
    }
  }, [params])


  return (
    <div className={style.content}>

      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack}
        />
        종목 스크리너
      </div>


      <div className={style.container}>
        <FilterBox
          params={params}
          filterList={filterList}
          setFilterList={setFilterList}
          onChangeSlider={onChangeSlider}
        />
        <div className={style.lookupButton}
          onClick={onClickLookup}>조회</div>

        {/* table */}
        <div className={style.tableArea}>
          {
            loading
              ? <BarLoader cssOverride={loader_override} size={150} />
              : isLookup
                ? <SortTable columns={columns} data={data} />
                : null
          }
        </div>
      </div>
    </div>
  )
}

export default Screener