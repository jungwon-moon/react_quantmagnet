import style from "./LayoutHeader.module.scss"
import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import MainMenu from "./LayoutMenu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { authUser, logoutUser } from "../store/modules/auth"
import stockListJson from "../store/json/stockList.json"




const Search = ({ style, isDropDown, searchWord, onChange, onKeyPress, onBlur,
  onMouseDown, onMouseOver, searchItems, searchItemsIndex, recentSearches, onClickXmark }) => {

  return (
    <div className={style.searchBox}>
      <input
        className={style.searchInput}
        value={searchWord}
        onChange={onChange}
        onKeyUp={onKeyPress}
        placeholder={'검색'} />
      <FontAwesomeIcon icon={faXmark} className={style.searchBoxXMark} onClick={onClickXmark} />
      {
        isDropDown
          ? <SearchItems
            style={style}
            onBlur={onBlur}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            searchItems={searchItems}
            searchItemsIndex={searchItemsIndex}
            recentSearches={recentSearches}
          />
          : null
      }
    </div>
  )
}

const SearchItems = ({ style, onBlur, onMouseDown, onMouseOver,
  searchItems, searchItemsIndex, recentSearches }) => {
  return (
    <>
      {/* isDropDown True */}
      {
        searchItems.length !== 0
          ? <ul className={style.searchItems} onClick={onBlur}>
            {
              searchItems.map((item, index) => (
                <div className={style.searchItem} key={index}
                  onMouseDown={() => onMouseDown(item)}
                  onMouseEnter={() => onMouseOver(index)}>
                  {
                    searchItemsIndex === index
                      ? <div className={style.searchItemFocus}>
                        {item.stcd} {item.stnm}
                      </div>
                      : <div>
                        {item.stcd} {item.stnm}
                      </div>
                  }
                </div>
              ))}
          </ul>
          : <>
            {/* <ul className={style.searchItems} onClick={onBlur}></ul>
            {
              recentSearches.map((item, index) => (
                <div className={style.searchItem} key={index}
                  onMouseDown={() => onMouseDown(item)}
                  onMouseEnter={() => onMouseOver(index)}
                >
                  <div>
                    {item.stcd}   {item.stnm}
                  </div>
                </div>
              ))
            } */}
          </>
      }
    </>
  )
}


// Main Components
const LayoutHeader = ({ recentSearches, setRecentSearches }) => {
  // useState
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isMenu, setIsMenu] = useState(false)
  // Search 동작유무. 모바일 환경에서만 사용.
  const [isSearch, setIsSearch] = useState(false)
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
  // console.log("authenticated ", authenticated)


  // useEffect
  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  useEffect(setList, [searchWord])

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])


  // Events
  const onToggleMenu = () => {
    setIsMenu(!isMenu)
  }
  const onToggleSearch = () => {
    setIsSearch(!isSearch)
  }

  const onClickLogout = () => {
    dispatch(logoutUser())
  }

  const onMouseDownDropDownItem = (clickedItem) => {
    handleAddRecentSearches(clickedItem)
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
    setIsDropDown(true)
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
        e.target.blur()
        break
      // no default
    }
  }
  const handleAddRecentSearches = (stock) => {
    const item = {
      stcd: stock.stcd,
      stnm: stock.stnm
    }
    // 최초 실행
    if (recentSearches === null) {
      setRecentSearches([item])
    } else {
      // 중복 확인
      const arr = [item, ...recentSearches]
      const result = arr.filter((v, i) =>
        arr.findIndex(x => x.stcd === v.stcd) === i)
      // 길이 제한
      result.length = 5
      setRecentSearches(result.filter(i => i !== null))
    }
  }


  // render
  const desktopAndTablet = (
    <div className={style.header}>
      <div className={style.left}>
        <div className={style.headerLogo}>
          <a href="/">Quant Magnet</a>
        </div>
      </div>
      <div className={style.center}>
        <div onBlur={onBlurSearch}>
          <Search
            style={dStyle}
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
            recentSearches={recentSearches}
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
  )

  const mobile = (
    <div className={style.headerM}>
      <div className={style.leftM}>
        <FontAwesomeIcon
          icon={faBars}
          className={style.buttonM}
          onClick={onToggleMenu} />
      </div>
      {
        isSearch
          ? <Search
            style={mStyle}
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
            recentSearches={recentSearches}
          />
          : <Link to="" className={style.centerM}>QuantMagnet</Link>
      }
      <div className={style.rightM}>
        <FontAwesomeIcon
          className={style.buttonM}
          icon={faMagnifyingGlass}
          onClick={onToggleSearch} />
      </div>
      {
        isMenu &&
        <>
          <MainMenu
            authenticated={authenticated}
            onClickLogout={onClickLogout}
            setIsMenu={setIsMenu}
          />
          <div className={style.menuBack} onClick={onToggleMenu}></div>
        </>
      }
    </div>
  )

  return (
    <>
      <Desktop>
        {desktopAndTablet}
      </Desktop>
      <Tablet>
        {desktopAndTablet}
      </Tablet>
      <Mobile>
        {mobile}
      </Mobile>
    </>
  )
}

const dStyle = {
  "searchBox": style.searchBox,
  "searchInput": style.searchInput,
  "searchBoxXMark": style.searchBoxXMark,
  "searchItems": style.searchItems,
  "searchItem": style.searchItem,
  "searchItemFocus": style.searchItemFocus
}
const mStyle = {
  "searchBox": style.searchBoxM,
  "searchInput": style.searchInput,
  "searchBoxXMark": style.searchBoxXMark,
  "searchItems": style.searchItemsM,
  "searchItem": style.searchItemM,
  "searchItemFocus": style.searchItemFocus
}

export default React.memo(LayoutHeader)