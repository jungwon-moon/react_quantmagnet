import React, { useState } from "react";
import "./Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { Outlet, Link } from 'react-router-dom';


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

// function User(props) {

// }

function Navbar() {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 })

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
                {<Link to="/">
                  <li>Sign In</li>
                </Link>}
              </ul>
            </>
          )
        }
        <div className="navbar_toggle" onClick={onToggle}><FontAwesomeIcon icon={faBars} /></div>
      </nav >
      <Outlet />
      {visible&&
        <div className="navbar_back" onClick={onToggle}/>
      }
    </>
  )
}

export default Navbar;