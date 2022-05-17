import React, { useState, useEffect } from "react";
import "./Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, logoutUser } from '../store/modules/auth';


function Menu(props) {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return (
    <>
      <li>{props.title}</li>
      {isMobile &&
        <hr></hr>
      }
    </>
  )
}

function Navbar({ }) {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 })
  
  const authenticated = useSelector(state => state.auth.authenticated)
  const user = useSelector(state => state.auth.data.username)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [])

  const onClickLogout = () => {
    dispatch(logoutUser())
  }
  
  function onToggle() {
    setVisible(!visible)
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
                {<Link to="/strategy">
                  <Menu title="투자전략" />
                </Link>}
                {<Link to="/calculator">
                  <Menu title="계산기" />
                </Link>}
              </ul>
              <ul className="navbar_user">
                {authenticated === false ?
                  <>
                    {<Link to="/login">
                      <li>로그인</li>
                    </Link>}
                  </>
                  : <>
                    <a onClick={onClickLogout}>로그아웃</a>
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