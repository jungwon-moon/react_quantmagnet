import style from "./LayoutMenu.module.scss"
import { Link } from "react-router-dom"
import { Desktop, Tablet, Mobile } from "../store/mediaQuery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faCalculator, faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons"
import menuListJS from "../store/json/menuList.json"

const menuIcons = [
  faHouse,
  faCalculator,
  faMagnifyingGlassChart
]

//Components
const MenuItem = ({ title, link, icon }) => {
  const objIcon = menuIcons.filter(item =>
    item.iconName.includes(icon))

  return (
    <Link to={link} className={style.menuItem}>
      <FontAwesomeIcon icon={objIcon[0]} className={style.menuIcon} />
      <div>{title}</div>
    </Link>
  )
}

const Footer = () => {
  return (
    <>
      <div>footer</div>
    </>
  )
}

// MainComponenets
const MainMenu = ({ authenticated, onClickLogout, setIsMenu }) => {
  
  const onClickIsMenu = () => {
    setIsMenu(false)
  }
  // render
  const desktopAndTablet = (
    <>
      <div className={style.menu}>
        {menuListJS.map((item, index) => (
          <MenuItem key={index}
            title={item.title}
            link={item.link}
            icon={item.iconName}
          />
        ))}
      </div>

      <div className={style.footer}>
        <Footer />
      </div>
    </>
  )

  const mobile = (
      <div className={style.menuM} onClick={onClickIsMenu}>
        {menuListJS.map((item, index) => (
          <MenuItem key={index}
            title={item.title}
            link={item.link}
            icon={item.iconName}
          />
        ))}
        <div className={style.authMenu}>
          {
            authenticated === false
              ? <a href="/login">로그인</a>
              : <a href="/" onClick={onClickLogout}>로그아웃</a>
          }
        </div>
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

export default MainMenu 