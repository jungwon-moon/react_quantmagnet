import React from "react"
import { Link } from 'react-router-dom'
import style from "./DomainCard.module.scss"


const Card = ({ title, link, description }) => {
  return (
    <Link to={link} className={style.card}>
      <div className={style.cardTitle}>{title}</div>
      {
        description.map((item, index) => (
          <div key={index} className={style.cardItem}>{item}</div>
        ))
      }
    </Link>
  )
}

export default Card