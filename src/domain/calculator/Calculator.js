import React from "react"
import { useNavigate } from "react-router-dom"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../components/DomainCard"
import calculatorListJS from "../../store/json/calculatorList.json"

import style from "./Calculator.module.scss"


const Calculator = () => {
  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate("/")
  }
  
  return (
    <div className={style.content}>
      <div className={style.title}>
        <FontAwesomeIcon 
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack}
          />
        금융 계산기
      </div>
      {
        calculatorListJS.map((item, index) => (
          <Card key={index}
            title={item.title}
            link={item.link}
            description={item.description}
          />
        ))
      }
    </div>
  )
}

export default Calculator