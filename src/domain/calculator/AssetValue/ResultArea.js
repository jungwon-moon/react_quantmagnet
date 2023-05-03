import style from "./ResultArea.module.scss"
import { React, useState } from "react"
import { comma, uncomma } from "../../../utils/utils"
import { Bar } from "react-chartjs-2"
import "chart.js/auto"


const ResultArea = ({
  selected,
  values,
  outValues,
  setOutValues,
  chartData,
  setChartData,
  isCalculate,
  setIsCalculate,
}) => {

  const calc = () => {
    // state
    let monthly = 0
    let accumulate = 0
    let currentInterest = 0
    let totalSaving = 0
    let months = [0]

    let frequency = Number(values.frequency)
    let investment = Number(uncomma(values.investment) * frequency)
    let yieldRate = Number(uncomma(values.yieldRate) / 1200 * frequency)

    const goal = Number(uncomma(values.goal))
    const current = Number(uncomma(values.current))
    const numOfMon = Number(values.numOfYear * 12)
    const numOfMul = Number(values.numOfYear * 12 / frequency)
    
    // output state
    let outputResult = 0
    let outputYield = 0
    let outputAccum = 0
    const sumInvest = [0]
    const sumYield = [0]
    const sumSaving = [current]
    const chartCurrent = []
    const chartYield = []
    const chartSaving = []
    const labels = []


    if (selected === 0) {
      monthly =
        (goal - current * (1 + yieldRate) ** numOfMul) /
        (((1 + yieldRate) ** numOfMul - 1) / yieldRate) /
        frequency
      accumulate = monthly * numOfMon + current
      // 
      for (let month = frequency; month <= numOfMon; month += frequency) {
        sumInvest.push(sumInvest[sumInvest.length - 1] + monthly * frequency)

        let currentYield = sumSaving[sumSaving.length - 1] * yieldRate
        sumYield.push(sumYield[sumYield.length - 1] + currentYield)
        sumSaving.push(sumSaving[sumSaving.length - 1] + monthly * frequency + currentYield)

        if (month % 12 === 0) {
          labels.push(month / 12 + "년")
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(sumYield[sumYield.length - 1]))
          chartSaving.push(Math.round(sumSaving[sumSaving.length - 1]
            - sumYield[sumYield.length - 1] - current))
        }
      }
      outputResult = comma(Math.round(monthly))
      outputYield = comma(Math.round(goal - accumulate))
      outputAccum = comma(Math.round(accumulate))
    } else if (selected === 1) {
      accumulate = current + investment * numOfMul
      currentInterest = current * (1 + yieldRate) ** numOfMul
      totalSaving = currentInterest + investment * ((1 + yieldRate) ** numOfMul - 1) / yieldRate

      for (let month = frequency; month <= numOfMon; month += frequency) {
        sumInvest.push(sumInvest[sumInvest.length - 1] + investment)
        let currentYield = sumSaving[sumSaving.length - 1] * yieldRate
        sumYield.push(sumYield[sumYield.length - 1] + currentYield)
        sumSaving.push(sumSaving[sumSaving.length - 1] + investment + currentYield)

        if (month % 12 === 0) {
          labels.push(month / 12 + "년")
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(sumYield[sumYield.length - 1]))
          chartSaving.push(Math.round(sumSaving[sumSaving.length - 1]
            - sumYield[sumYield.length - 1] - current))
        }
      }
      outputResult = comma(Math.round(totalSaving))
      outputYield = comma(Math.round(totalSaving - accumulate))
      outputAccum = comma(Math.round(accumulate))
    } else {
      investment = investment / frequency
      totalSaving = current + investment
      let month = 1
      let totalInvest = current + investment
      let totalYield = 0
      let currentYield = totalSaving * yieldRate

      while (true) {
        if (month % frequency === 0) {
          totalYield += currentYield
          months.push(month)
          sumInvest.push(totalInvest)
          sumYield.push(totalYield)
          sumSaving.push(totalSaving + currentYield)
          totalInvest += investment
          totalSaving += currentYield + investment
          currentYield = totalSaving * yieldRate
        } else {
          totalInvest += investment
          totalSaving += investment
          currentYield = totalSaving * yieldRate
        }
        // 1년 주기로 set Chart 데이터
        if (month % 12 === 0) {
          labels.push(month / 12 + "년")
          chartCurrent.push(Math.round(current))
          chartYield.push(Math.round(totalYield))
          chartSaving.push(Math.round(totalSaving - totalYield - currentYield - current))
        }
        month++
        if (totalSaving > goal) {
          if (month % frequency !== 0) {
            months.push(month)
            sumInvest.push(totalInvest)
            sumYield.push(totalYield)
            sumSaving.push(totalSaving)
          }
          if (month % 12 !== 0) {
            labels.push(`${parseInt(month / 12)}년 ${month % 12}개월`)
            chartCurrent.push(Math.round(current))
            chartYield.push(Math.round(totalYield))
            chartSaving.push(Math.round(totalSaving - totalYield - currentYield - current))
          }
          break
        }
      }
      outputResult = `${parseInt(month / 12)}년 ${parseInt(month % 12)}개월`
      outputYield = comma(Math.round(sumYield[sumYield.length - 1]))
      outputAccum = comma(Math.round(sumSaving[sumSaving.length - 1]))
    }

    return [
      outputResult, outputYield, outputAccum,
      sumInvest, sumYield, sumSaving,
      labels, chartCurrent, chartSaving, chartYield,
    ]
  }

  const onClickCalculate = () => {

    const [
      outputResult,
      outputYield,
      outputAccum,

      sumInvest,
      sumYield,
      sumSaving,

      labels,
      chartCurrent,
      chartSaving,
      chartYield,

    ] = calc()

    // set state
    setOutValues({
      ...outValues,
      result: outputResult,
      yield: outputYield,
      accumulate: outputAccum,

      sumInvest: sumInvest,
      sumYield: sumYield,
      sumSaving: sumSaving,
    })

    setChartData({
      ...chartData,
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: "현재 저축액",
          data: chartCurrent,
          backgroundColor: "rgb(255, 99, 132)",
        }, {
          type: "bar",
          label: "누적 투자액",
          data: chartSaving,
          backgroundColor: "rgb(54, 162, 235)",
        }, {
          type: "bar",
          label: "누적 수익",
          data: chartYield,
          backgroundColor: "rgb(255, 205, 86)",
        },
      ]
    })
    setIsCalculate(true)
  }

  return (
    <>
      <div className={style.calculate} onClick={onClickCalculate}>
        계산
      </div>
      {
        isCalculate
          ? <div className={style.resultArea}>
            <Bar className={style.chart }
              options={options}
              data={chartData} />
            {/* <div className={style.table}>table</div> */}
          </div>
          : null
      }
    </>
  )
}


//
const options = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        boxHeight: 12,
      }
    }
  },
  responsive: true,
  scales: {
    x: { stacked: true },
    y: { stacked: true }
  }
}


export default ResultArea