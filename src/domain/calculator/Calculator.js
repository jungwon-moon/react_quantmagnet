import style from "./Calculator.module.scss"
import React from "react"
import { useNavigate } from "react-router-dom"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../components/DomainCard"

import calculatorListJson from "../../store/json/calculatorList.json"



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
        calculatorListJson.map((item, index) => (
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