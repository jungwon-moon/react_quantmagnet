import style from "./LayoutSideMenu.module.scss"
import { Link } from "react-router-dom"
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
const SideMenu = () => {
  return (
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
}

export default SideMenu