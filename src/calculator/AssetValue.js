import { React, useState, memo } from "react";
import InputBody from "./AssetValue_InputBody";
import InputHeader from "./AssetValue_InputHeader";
import OutputArea from "./AssetValue_OutputArea";
import { comma } from '../utils/utils'
import './AssetValue.css';


// AssetValue Component
const AssetValue = () => {
  // // Toggle state
  const [mode, setMode] = useState('savingsGoal')
  const [outputToggle, setOutputToggle] = useState(false)
  const [outputHeaderToggle, setOutputHeaderToggle] = useState(false)
  const [outputBodyToggle, setOutputBodyToggle] = useState(true)

  // // Values state
  const [values, setValues] = useState({
    goal: '10000000', // 목표 저축액(goal)
    current: '1000000', // 현재 저축액(current)
    investment: '1000000',  // 월 투자액(investment)
    yieldRate: '12',  // 연 수익률(yieldRate)
    compounding: '1', //복리 계산 단위(compounding)
    numOfYear: '6' // 투자 기간(numOfYear)
  })
  const [outputValues, setOutputValues] = useState({
    main: '99999',
    yield: '99999',
    investment: '99999',
    sumInvestment: [],
    sumYield: [],
    sumSavings: []
  })
  const [outputChartData, setOutputChartData] = useState({
    labels: [],
  })
  const handleOutputHeaderToggleChange = () => {
    setOutputHeaderToggle(prev => !prev)
  }
  const handleOutputbodyToggleChange = () => {
    // Output Body 차트(true)로 전환
    setOutputBodyToggle(prev => !prev)
  }
  const handleHeaderToggleChange = (e) => {
    // Calc 선택시 Output영역 끔
    setOutputToggle(false)
    setMode(e.target.id)
  }
  const handleInputValueChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleCalculatorClick = (e) => {
    // Output 영억 토글
    setOutputToggle(true)
    // Output Header 토글 끔
    setOutputHeaderToggle(false)
    // Output Body 차트(true)로 전환
    setOutputBodyToggle(true)
    // 계산 -> state 변경
    handleCalculator()
  }
  const handleCalculator = (e) => {
    // common state
    let compounding = Number(values.compounding)
    const goal = Number(values.goal)
    const current = Number(values.current)
    let investment = Number(values.investment * compounding)
    let yieldRate = Number(values.yieldRate / 1200 * compounding)
    const numOfMonth = Number(values.numOfYear * 12)
    const numOfMul = Number(values.numOfYear * 12 / compounding)
    // output state
    const sumInvestment = [0]
    const sumYield = [0]
    const sumSavings = [current]
    const chartCurrent = []
    const chartYield = []
    const chartSavings = []
    const labels = []

    if (mode === 'savingsGoal') {
      // output header 계산
      const monthly = (goal - current * (1 + yieldRate) ** numOfMul) / (((1 + yieldRate) ** numOfMul - 1) / yieldRate) / compounding
      const accumulate = monthly * numOfMonth + current

      // output 계산
      for (let month = compounding; month <= numOfMonth; month += compounding) {
        sumInvestment.push(sumInvestment[sumInvestment.length - 1] + monthly * compounding)
        let currentYield = sumSavings[sumSavings.length - 1] * yieldRate
        sumYield.push(sumYield[sumYield.length - 1] + currentYield)
        sumSavings.push(sumSavings[sumSavings.length - 1] + monthly * compounding + currentYield)
        if (month % 12 === 0) {
          labels.push(month / 12 + '년')
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(sumYield[sumYield.length - 1]))
          chartSavings.push(Math.round(sumSavings[sumSavings.length - 1] - sumYield[sumYield.length - 1] - current))
        }
      }
      // set state
      setOutputValues({
        ...outputValues,
        current: current,
        compounding: compounding,
        main: comma(Math.round(monthly)),
        yield: comma(Math.round(goal - accumulate)),
        investment: comma(Math.round(accumulate)),
        sumInvestment: sumInvestment,
        sumYield: sumYield,
        sumSavings: sumSavings,
      })
      setOutputChartData({
        ...outputChartData,
        labels: labels,
        datasets: [
          {
            // type: 'bar',
            label: '현재 저축액',
            data: chartCurrent,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            // type: 'bar',
            label: '누적 투자액',
            data: chartSavings,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            // type: 'bar',
            label: '누적 수익',
            data: chartYield,
            backgroundColor: 'rgb(255, 205, 86)',
          },
        ],
      })

    } else if (mode === 'savingsEstimator') {
      // output header 계산
      const accumulate = current + investment * numOfMul
      const currentInterest = current * (1 + yieldRate) ** numOfMul
      const totalSavings = currentInterest + investment * ((1 + yieldRate) ** numOfMul - 1) / yieldRate

      // output 계산
      for (let month = compounding; month <= numOfMonth; month += compounding) {
        sumInvestment.push(sumInvestment[sumInvestment.length - 1] + investment)
        let currentYield = sumSavings[sumSavings.length - 1] * yieldRate
        sumYield.push(sumYield[sumYield.length - 1] + currentYield)
        sumSavings.push(sumSavings[sumSavings.length - 1] + investment + currentYield)
        if (month % 12 === 0) {
          labels.push(month / 12 + '년')
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(sumYield[sumYield.length - 1]))
          chartSavings.push(Math.round(sumSavings[sumSavings.length - 1] - sumYield[sumYield.length - 1] - current))
        }
      }

      // set state
      setOutputValues({
        ...outputValues,
        current: current,
        compounding: compounding,
        main: comma(Math.round(totalSavings)),
        yield: comma(Math.round(totalSavings - accumulate)),
        investment: comma(Math.round(accumulate)),
        sumInvestment: sumInvestment,
        sumYield: sumYield,
        sumSavings: sumSavings
      })
      setOutputChartData({
        ...outputChartData,
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: '현재 저축액',
            data: chartCurrent,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            type: 'bar',
            label: '누적 투자액',
            data: chartSavings,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            type: 'bar',
            label: '누적 수익',
            data: chartYield,
            backgroundColor: 'rgb(255, 205, 86)',
          },
        ]
      })
    } else {
      // state 초기화
      // yieldRate = yieldRate / compounding
      investment = investment / compounding
      const months = [0]
      let month = 1
      let totalInvestment = current + investment
      let totalSavings = current + investment
      let totalYield = 0
      let currentYield = totalSavings* yieldRate
      while (true) {
        if (month%compounding===0) {
          totalYield += currentYield
          months.push(month)
          sumInvestment.push(totalInvestment)
          sumYield.push(totalYield)
          sumSavings.push(totalSavings + currentYield)
          totalInvestment += investment
          totalSavings += currentYield + investment
          currentYield = totalSavings * yieldRate
        } else {
          totalInvestment += investment
          totalSavings += investment
          currentYield = totalSavings * yieldRate
        }
        // 1년 주기로 set Chart 데이터 
        if (month % 12 === 0) {
          labels.push(month / 12 + '년')
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(totalYield))
          chartSavings.push(Math.round(totalSavings - currentYield - current))
        }
        month++
        // 루프 끝내기 위한 조건
        if (totalSavings > goal) {
          if (month % compounding !== 0) {
            months.push(month)
            sumInvestment.push(totalInvestment)
            sumYield.push(totalYield)
            sumSavings.push(totalSavings)
          }
          if (month % 12 !== 0) {
            labels.push(`${parseInt(month/12)}년 ${month %12}개월`)
            chartCurrent.push(Math.round(current))
            chartYield.push(Math.round(totalYield))
            chartSavings.push(Math.round(totalSavings - currentYield - current))
          }
          break
        }
      }

      setOutputValues({
        ...outputValues,
        current: current,
        compounding: compounding,
        main: `${parseInt(month / 12)}년 ${parseInt(month % 12)}개월`,
        yield: comma(Math.round(sumYield[sumYield.length - 1])),
        investment: comma(Math.round(sumSavings[sumSavings.length - 1])),
        months: months,
        sumInvestment: sumInvestment,
        sumYield: sumYield,
        sumSavings: sumSavings
      })

      setOutputChartData({
        ...outputChartData,
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: '현재 저축액',
            data: chartCurrent,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            type: 'bar',
            label: '누적 투자액',
            data: chartSavings,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            type: 'bar',
            label: '누적 수익',
            data: chartYield,
            backgroundColor: 'rgb(255, 205, 86)',
          },
        ]
      })
    }
  }

  return (
    <div>
      <div className="main-page">
        <h1>자산가치 계산기</h1>
        <div className="container">
          <div className="inputArea">
            <InputHeader mode={mode}
              toggleChange={handleHeaderToggleChange} />
            <InputBody mode={mode} values={values}
              InputValueChange={handleInputValueChange} />
            <button onClick={handleCalculatorClick}>계산</button>
          </div>
          {outputToggle &&
            <OutputArea mode={mode} outputData={''}
              headerToggle={outputHeaderToggle}
              bodyToggle={outputBodyToggle}
              outputValues={outputValues}
              outputChartData={outputChartData}
              headerToggleChange={handleOutputHeaderToggleChange}
              bodyToggleChange={handleOutputbodyToggleChange} />}
        </div>
      </div>
    </div>
  )
}

export default memo(AssetValue);