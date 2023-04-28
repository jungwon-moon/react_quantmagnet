import style from "./Calculator.module.scss"
import React from "react"
import Card from "../../components/DomainCard"
import calculatorListJS from "../../store/json/calculatorList.json"


const Calculator = () => {
  return (
    <div className={style.content}>
      <div className={style.title}>금융 계산기</div>
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