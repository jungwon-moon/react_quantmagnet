import style from "./LayoutHeader.module.scss"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authUser, logoutUser } from "../store/modules/auth"
import stockListJson from "../store/json/stockList.json"



const Search = ({ isDropDown, searchWord, onChange, onKeyPress,
  onMouseDown, onMouseOver, searchItems, searchItemsIndex }) => {
  return (
    <div className={style.searchBox}>
      <input
        className={style.searchInput}
        value={searchWord}
        onChange={onChange}
        onKeyUp={onKeyPress}
        placeholder={'검색'} />

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
      {searchItems.map((d, index) => (
        <div className={style.searchItem} key={index}
          onMouseDown={() => onMouseDown(d)}
          onMouseEnter={() => onMouseOver(index)}>
            {searchItemsIndex === index
              ? <div className={style.searchItemFocus}>
                {d.stcd}   {d.stnm}</div>
              : <div>
                {d.stcd}   {d.stnm}</div>
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