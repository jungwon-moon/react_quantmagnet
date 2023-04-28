import style from "./Layout.module.scss"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import LayoutHeader from "./LayoutHeader"
import MainMenu  from "./LayoutMenu"
import { Outlet } from 'react-router-dom';


const Layout = () => {

  return (
    <>
      <Desktop>
        <div className={style.full}>
          <div className={style.top}>
            <LayoutHeader />
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
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className={style.full}>
          <div className={style.top}>
            <LayoutHeader />
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
          </div>
        </div>
      </Tablet>
      
      <Mobile>
        <div className={style.full}>
          <div className={style.topM}>
            <LayoutHeader />
          </div>
          <div className={style.leftM}>
          </div>
          <div className={style.centerM}>
            <div className={style.content}>
              <Outlet />
            </div>
          </div>
          <div className={style.rightM}>
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default Layout