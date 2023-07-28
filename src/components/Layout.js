import style from "./Layout.module.scss"
import { useState } from "react"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import LayoutHeader from "./LayoutHeader"
import MainMenu from "./LayoutMenu"
import LayoutRight from "./LayoutRight"
import { Outlet } from 'react-router-dom'


const Layout = () => {
  const [recentSearches, setRecentSearches] =
    useState(JSON.parse(localStorage.getItem("recentSearches")))

  return (
    <>
      <Desktop>
        <div className={style.full}>
          <div className={style.top}>
            <LayoutHeader
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
          <div className={style.left}>
            <MainMenu />
          </div>
          <div className={style.center}>
            <div className={style.content}>
              <Outlet />
            </div>
          </div>
          <div className={style.right}>
            <LayoutRight
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className={style.full}>
          <div className={style.top}>
            <LayoutHeader
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
          <div className={style.leftT}>
            <MainMenu />
          </div>
          <div className={style.centerT}>
            <div className={style.content}>
              <Outlet />
            </div>
          </div>
          <div className={style.rightT}>
            <LayoutRight
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
        </div>
      </Tablet>

      <Mobile>
        <div className={style.full}>
          <div className={style.topM}>
            <LayoutHeader
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
          <div className={style.leftM}>
          </div>
          <div className={style.centerM}>
            <div className={style.content}>
              <Outlet />
            </div>
          </div>
          <div className={style.rightM}>
            <LayoutRight
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default Layout