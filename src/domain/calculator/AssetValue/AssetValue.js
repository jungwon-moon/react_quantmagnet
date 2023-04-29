import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import { faChevronLeft, faSackDollar, faPiggyBank, faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonListJson from "../../../store/json/assetValueButtonList.json"


import InputArea from "./InputArea"
import style from "./AssetValue.module.scss"


const HeaderButton = ({ title, conn, icon, onClick }) => {
  const objIcon = buttonIcons.filter(item =>
    item.iconName.includes(icon))
  return (
    <div className={style.headerButton}
      onClick={() => onClick(conn)}>
      <FontAwesomeIcon
        icon={objIcon[0]}
        className={style.headerIcon}
      />
      {title}
    </div>
  )
}

const AssetValue = () => {
  // state
  const [selected, setSeleced] = useState(0)

  const [values, setValues] = useState({
    goal: '100000000', // 목표 저축액(goal)
    current: '0', // 현재 저축액(current)
    investment: '600000',  // 월 투자액(investment)
    yieldRate: '6',  // 연 수익률(yieldRate)
    frequency: '1', // 계산 주기(frequency)
    numOfYear: '10' // 투자 기간(numOfYear)
  })

  const navigate = useNavigate()


  // event
  const onClickGoBack = () => {
    navigate(-1)
  }
  const onClickHeaderButton = (conn) => {
    setSeleced(buttonList[conn])
  }

  const onChangeInputValue = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <div className={style.content}>
      
      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack} />
        자산가치 계산기
      </div>

      <div className={style.container}>
        <div className={style.headerArea}>
          <div className={style.headerBack} />
          <div className={style.header}>
            {
              ButtonListJson.map((item, index) => (
                <HeaderButton key={index}
                  title={item.title}
                  conn={item.conn}
                  icon={item.iconName}
                  onClick={onClickHeaderButton}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className={style.body}>
        <div>
          {
            ButtonListJson.map((item, idex) => (
              selected === idex
                ? <InputArea key={idex}
                  selected={selected}
                  values={values}
                  title={item.title}
                  description={item.description}
                  onChange={onChangeInputValue}
                />
                : null
            ))
          }
        </div>

        <div>
          outputArea
        </div>
      </div>
    </div>
  )

}


// global variable
const buttonList = {
  "savingsGoal": 0,
  "savingsEstimator": 1,
  "achieveGoal": 2
}

const buttonIcons = [
  faSackDollar, faPiggyBank, faHourglassHalf
]

export default AssetValue