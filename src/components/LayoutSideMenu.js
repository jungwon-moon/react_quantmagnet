import { Link } from "react-router-dom"
import style from "./LayoutSideMenu.module.scss"


//Components
const MenuItem = ({ title, link }) => {
  return (
    <Link to={link}>
      <div className={style.menuItem}>
        {title}
      </div>
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
  console.log("SideMenu")
  return (
    <>
      <div className={style.menu}>
        <MenuItem
          title="홈"
          link="/" />
        <MenuItem
          title="투자전략"
          link="/strategy" />
        <MenuItem
          title="계산기"
          link="/calculator" />
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </>
  )
}

export default SideMenu