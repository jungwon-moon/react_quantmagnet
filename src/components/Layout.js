import layout from "./Layout.module.scss"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import { useState, useEffect, useRef } from "react"
import LayoutHeader from "./LayoutHeader"
import LayoutSideMenu from "./LayoutSideMenu"
import { Outlet, useNavigate } from 'react-router-dom';


const Layout = () => {

  return (
    <>
      <Desktop>
        <div className={layout.full}>
          <div className={layout.top}>
            <LayoutHeader />
          </div>
          <div className={layout.left}>
            <LayoutSideMenu />
          </div>
          <div className={layout.center}>
            <Outlet />
          </div>
          <div className={layout.right}>
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className={layout.full}>
          <div className={layout.top}>
            <LayoutHeader />
          </div>
          <div className={layout.tabletLeft}>
            <LayoutSideMenu />
          </div>
          <div className={layout.tabletCenter}>
            <Outlet />
          </div>
          <div className={layout.tabletRight}>
          </div>
        </div>
      </Tablet>
      
      <Mobile>
        <div className={layout.full}>
          <div className={layout.mobileTop}>
            <LayoutHeader />
          </div>
          <div className={layout.mobileLeft}>
            <LayoutSideMenu />
          </div>
          <div className={layout.mobileCenter}>
            <Outlet />
          </div>
          <div className={layout.mobileRight}>
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default Layout