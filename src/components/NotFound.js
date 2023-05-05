import style from "./NotFound.module.scss"
import { React } from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className={style.main}>
      <Link to="" className={style.title}>Quantmagnet</Link>
      <h3>없는 페이지 입니다.</h3>
      <Link to="" className={style.link}>홈으로 이동</Link>
    </div>
  )
}

export default NotFound