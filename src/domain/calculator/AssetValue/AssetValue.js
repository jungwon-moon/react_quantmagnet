import style from "./AssetValue.module.scss"
import { React, useState } from "react"
import { comma, uncomma } from "../../../utils/utils"
import { useNavigate } from "react-router-dom"
import { faChevronLeft, faSackDollar, faPiggyBank, faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CalculatorArea from "./CalculatorArea"
import ResultArea from "./ResultArea"
import ButtonListJson from "../../../store/json/assetValueButtonList.json"



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
  const [isCalculate, setIsCalculate] = useState(false)
  const [chartData, setChartData] = useState()

  const [values, setValues] = useState({
    goal: "100,000,000", // 목표 저축액(goal)
    current: "0", // 현재 저축액(current)
    investment: "600,000",  // 월 투자액(investment)
    yieldRate: "12",  // 연 수익률(yieldRate)
    frequency: "1", // 계산 주기(frequency)
    numOfYear: "5" // 투자 기간(numOfYear)
  })

  const [outValues, setOutValues] = useState({
    result: 0,
    yield: 0,
    investment: 0,
    sumInvest: [],
    sumYield: [],
    sumSaving: []
  })

  const navigate = useNavigate()


  // event
  const onClickGoBack = () => {
    navigate(-1)
  }

  const onClickHeaderButton = (conn) => {
    setSeleced(buttonList[conn])
    setIsCalculate(false)
  }

  const onChangeInputValue = (e) => {
    const { name, value } = e.target
    if (name === "numOfYear") {
      setValues({ ...values, [name]: value })
    } else {
      setValues({ ...values, [name]: comma(uncomma(value)) })
    }
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
        {
          ButtonListJson.map((item, idex) => (
            selected === idex
              ? <CalculatorArea key={idex}
                selected={selected}
                values={values}
                outValues={outValues}
                title={item.title}
                description={item.description}
                onChange={onChangeInputValue}
                isCalculate={isCalculate}
              />
              : null
          ))
        }
        <div>
          <div>

            <ResultArea
              selected={selected}
              values={values}
              outValues={outValues}
              setOutValues={setOutValues}
              chartData={chartData}
              setChartData={setChartData}
              isCalculate={isCalculate}
              setIsCalculate={setIsCalculate}
            />

          </div>
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