import style from "./LayoutHeader.module.scss"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { authUser, logoutUser } from "../store/modules/auth"
import stockListJson from "../store/json/stockList.json"



const Search = ({ isDropDown, searchWord, onChange, onKeyPress,
  onMouseDown, onMouseOver, searchItems, searchItemsIndex, onClickXmark }) => {
  return (
    <div className={style.searchBox}>
      <input
        className={style.searchInput}
        value={searchWord}
        onChange={onChange}
        onKeyUp={onKeyPress}
        placeholder={'검색'} />
      <FontAwesomeIcon icon={faXmark} className={style.searchBoxXMark} onClick={onClickXmark} />
      {isDropDown && searchItems.length !== 0
        ? <SearchItems
          onMouseDown={onMouseDown}
          onMouseOver={onMouseOver}
          searchItems={searchItems}
          searchItemsIndex={searchItemsIndex}
        />
        : <></>
      }
    </div>
  )
}

const SearchItems = ({ onMouseDown, onMouseOver, searchItems, searchItemsIndex }) => {
  return (
    <ul className={style.searchItems}    >
      {searchItems.map((item, index) => (
        <div className={style.searchItem} key={index}
          onMouseDown={() => onMouseDown(item)}
          onMouseEnter={() => onMouseOver(index)}>
            {searchItemsIndex === index
              ? <div className={style.searchItemFocus}>
                {item.stcd}   {item.stnm}</div>
              : <div>
                {item.stcd}   {item.stnm}</div>
            }
          </div>
      ))}
    </ul>
  )
}


// Main Components
const LayoutHeader = () => {
  // useState
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDropDown, setIsDropDown] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [stockList, setStockList] = useState([])
  const [stockListIndex, setStockListIndex] = useState(-1)

  const setList = () => {
    if (searchWord === "") {
      setIsDropDown(false)
      setStockList([])
    } else {
      const filterList = stockListJson.filter(jsItem =>
        jsItem.stcd.includes(searchWord) || jsItem.stnm.includes(searchWord))
      if (filterList.length >= 10) {
        filterList.length = 10
      }
      setStockList(filterList)
    }
  }

  const authenticated = useSelector(state => state.auth.authenticated)
  // console.log(authenticated)


  // useEffect
  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  useEffect(setList, [searchWord])

  
  // Events
  const onClickLogout = () => {
    dispatch(logoutUser())
  }

  const onMouseDownDropDownItem = (clickedItem) => {
    navigate(`/stockdetails/${clickedItem.stcd}`)
  }
  
  const onClickXmark = () => {
    setSearchWord("")
  }
  
  const onBlurSearch = () => {
    setIsDropDown(false)
  }
  const onFocusDropDown = () => {
    setIsDropDown(true)
  }
  
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value)
    setStockListIndex(0)
    setIsDropDown(true)
    }
  
  
  const onMouseOverSearch = (item) => {
    setStockListIndex(item)
  }

  const onKeyPressSearch = (e) => {
    switch (e.key) {
      case "Enter":
        if (stockListIndex >= 0) {
          onMouseDownDropDownItem(stockList[stockListIndex])
          e.target.blur()
        }
        break

      case "ArrowUp":
        if (stockListIndex > 0) {
          setStockListIndex(stockListIndex - 1)
        }
        break

      case "ArrowDown":
        if (stockList.length - 1 > stockListIndex) {
          setStockListIndex(stockListIndex + 1)
        }
        break
        
      case "Escape":
        break
      // no default
    }
  }


  return (
    <>
      <Desktop>
        <div className={style.header}>
          <div className={style.left}>
            <div className={style.headerLogo}>
              <a href="/">Quant Magnet</a>
            </div>
          </div>
          <div className={style.center}>
            <div onBlur={onBlurSearch}>
              <Search
                isDropDown={isDropDown}
                searchWord={searchWord}
                onChange={onChangeSearch}
                onKeyPress={onKeyPressSearch}
                onBlur={onBlurSearch}
                onFocus={onFocusDropDown}
                onMouseDown={onMouseDownDropDownItem}
                onMouseOver={onMouseOverSearch}
                onClickXmark={onClickXmark}
                searchItems={stockList}
                searchItemsIndex={stockListIndex}
              />
            </div>
          </div>
          <div className={style.right}>
            {authenticated === false ?
              <a href="/login">로그인</a>
              : <a href="/" onClick={onClickLogout}>로그아웃</a>
            }
          </div>
        </div>
      </Desktop>
      <Tablet>
        <></>
      </Tablet>

      <Mobile>
        <></>
      </Mobile>
    </>
  )
}

export default React.memo(LayoutHeader)