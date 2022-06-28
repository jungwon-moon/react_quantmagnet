import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, logoutUser } from '../store/modules/auth';


// Componenets
function Menu({ title, isMobile }) {
  return (
    <>
      <li>{title}</li>
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
      />
      <FontAwesomeIcon className="search_btn" icon={faMagnifyingGlass} />
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
        : searchItems.map((d, index) => (
          <Link to={`stockdetails/${d.stcd}`} key={index}>
            {searchItemsIndex === index
              ? <li className="search_item_focus">{d.stcd} {d.stnm}</li>
              : <li className="search_item">{d.stcd} {d.stnm}</li>
            }
          </Link>
        ))
      }
    </ul>
  )
}

// Main Components
function Navbar() {
  // useState
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const refs = useRef([])

  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [visible, setVisible] = useState(false)
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

  function onToggle() {
    setVisible(!visible)
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
          {<Link to="/">
            <i><FontAwesomeIcon icon={faChartColumn} /></i>
          </Link>}
          <a href="/">QuantMagnet</a>
        </div>
        {
          (visible || !isMobile) && (
            <>
              <ul className="navbar_menu">
                <Link to="/strategy">
                  <Menu
                    isMobile={isMobile}
                    title="투자전략" />
                </Link>
                <Link to="/calculator">
                  <Menu
                    isMobile={isMobile}
                    title="계산기" />
                </Link>
              </ul>

              <Search
                refs={refs}
                searchWord={searchWord}
                onChange={onChangeSearchWord}
                onKeyPress={onKeyPress}
                searchItems={searchItems}
                searchItemsIndex={searchItemsIndex}
              />


              <ul className="navbar_user">
                {authenticated === false ?
                  <>
                    <Link to="/login">
                      <li>로그인</li>
                    </Link>
                  </>
                  : <>
                    <li onClick={onClickLogout}>로그아웃</li>
                  </>
                }
              </ul>
            </>
          )
        }
        <div className="navbar_toggle" onClick={onToggle}><FontAwesomeIcon icon={faBars} /></div>
      </nav >
      <Outlet />
      {visible &&
        <div className="navbar_back" onClick={onToggle} />
      }
    </>
  )
}

export default Navbar;