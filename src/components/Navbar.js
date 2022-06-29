import { useState, useEffect, useRef } from "react";
import "./Navbar.css"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, logoutUser } from '../store/modules/auth';


// Componenets
function Menu({ title, isMobile, link }) {
  return (
    <>
      <a href={link}>{title}</a>
      {isMobile && <hr></hr>}
    </>
  )
}

function Search({ refs, searchWord, onChange, onKeyPress, searchItems, searchItemsIndex }) {
  return (
    <div className="search_box">
      <input
        className="search_input"
        value={searchWord}
        onChange={onChange}
        onKeyUp={onKeyPress}
        placeholder={'검색'} />

      {searchItems.length === 0
        ? <></>
        : <SearchItems
          refs={refs}
          searchItems={searchItems}
          searchItemsIndex={searchItemsIndex}
        />
      }
    </div>
  )
}

function SearchItems({ refs, searchItems, searchItemsIndex }) {
  return (
    <ul className="search_items" ref={elem => (refs.current[0] = elem)}>
      {searchItems.length === 0
        ? <></>
        : searchItems.map((d, index) => (<>
          {searchItemsIndex === index
            ? <a href={`/stockdetails/${d.stcd}`} className="search_item_focus">{d.stcd}   {d.stnm}</a>
            : <a href={`/stockdetails/${d.stcd}`} className="search_item">{d.stcd}   {d.stnm}</a>
          }
        </>
        ))}
    </ul>
  )
}


// Main Components
function Navbar() {
  // useState
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const refs = useRef([])

  const isMobile = useMediaQuery({ maxWidth: 800 })

  const [isMenu, setIsMenu] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [searchItems, setSearchItems] = useState([])
  const [searchItemsIndex, setSearchItemsIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const authenticated = useSelector(state => state.auth.authenticated)
  // const user = useSelector(state => state.auth.data.username)


  // Function
  async function searchAPI(params) {
    await axios({
      method: 'get',
      url: '/api/searchstock',
      params: params
    }).then(
      res => {
        const data = res.data.results
        setSearchItems(data)
      })
  }


  // useEffect 
  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  useEffect(() => {
    if (searchWord === '') {
      setSearchItems([])
    } else {
      const params = {
        'search': searchWord
      }
      searchAPI(params)
    }
  }, [searchWord]);

  useEffect(() => {
    setMaxIndex(searchItems.length)
  }, [searchItems])


  // Events
  const onClickLogout = () => {
    dispatch(logoutUser())
  }

  function onToggleMenu() {
    setIsMenu(!isMenu)
  }
  function onToggleSearch() {
    setIsSearch(!isSearch)
  }

  function onChangeSearchWord(e) {
    const value = e.target.value
    setSearchWord(value)
    if (value === '') {
      setSearchItemsIndex(0)
    }
  }

  function onKeyPress(e) {
    switch (e.key) {
      case "Enter":
        navigate(`/stockdetails/${searchItems[searchItemsIndex].stcd}`)
        break;
      case "ArrowUp":
        if (searchItemsIndex <= 0) {
          setSearchItemsIndex(maxIndex - 1)
        } else {
          setSearchItemsIndex(searchItemsIndex - 1)
        }
        break;
      case "ArrowDown":
        if (searchItemsIndex >= 9) {
          setSearchItemsIndex(0)
        } else {
          setSearchItemsIndex(searchItemsIndex + 1)
        }
        break;
      case "Escape":
        console.log(e.key)
        break;
      // no default
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar_logo">
          {!isMobile && (
            <a href="/"><FontAwesomeIcon icon={faChartColumn} /></a>
          )}
          <a href="/">QuantMagnet</a>
        </div>
        {
          (isMenu || !isMobile) && (
            <>
              <div className="navbar_menu">
                <Menu
                  isMobile={isMobile}
                  title="투자전략"
                  link="/strategy" />
                <Menu
                  isMobile={isMobile}
                  title="계산기"
                  link="/calculator" />
              </div>
              <div className="navbar_end">
                {!isMobile && (
                  <Search
                    refs={refs}
                    searchWord={searchWord}
                    onChange={onChangeSearchWord}
                    onKeyPress={onKeyPress}
                    searchItems={searchItems}
                    searchItemsIndex={searchItemsIndex} />
                )}

                <div className="navbar_user">
                  {authenticated === false ?
                    <a href="/login">로그인</a>
                    :
                    <a href={() => false} onClick={onClickLogout}>로그아웃</a>
                  }
                </div>
              </div>
            </>)}

        <FontAwesomeIcon className="navbar_toggle" onClick={onToggleMenu} icon={faBars} />
        <FontAwesomeIcon className="search_toggle" onClick={onToggleSearch} icon={faMagnifyingGlass} />
        {(isMobile && isSearch) && (
          <Search
            refs={refs}
            searchWord={searchWord}
            onChange={onChangeSearchWord}
            onKeyPress={onKeyPress}
            searchItems={searchItems}
            searchItemsIndex={searchItemsIndex} />
        )}
      </nav >
      <Outlet />
      {(isMenu) &&
        <div className="navbar_back" onClick={onToggleMenu} />
      }
    </>
  )
}

export default Navbar;