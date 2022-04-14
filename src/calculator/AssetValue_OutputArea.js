import React from "react"
import SortTable from '../components/SortTable'
import { comma } from '../utils/utils'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js'
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
)

const Toggle = ({ conn, Toggle, change, name }) => {
  return (
    <>
      <input id={conn} name="bodyToggle" onChange={change}
        type="radio" checked={Toggle} />
      <label htmlFor={conn}>{name}</label>
    </>
  )
}

const OutputArea = ({ mode, outputValues, outputChartData,
  headerToggle, headerToggleChange, bodyToggle,
  bodyToggleChange }) => {

  const months = outputValues.months
  const sumInvestment = outputValues.sumInvestment
  const sumYield = outputValues.sumYield
  const sumSavings = outputValues.sumSavings
  const compounding = outputValues.compounding
  const current = Number(outputValues.current)
  const columns = [
    { accessor: "month", Header: "경과 개월" },
    { accessor: "sumInvestment", Header: "투자액" },
    { accessor: "sumYield", Header: "수익" },
    { accessor: "sumSavings", Header: "총 저축액" }
  ]
  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text:''
      // },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    }
  }
  const data = []
  for (let idx = 1; idx < sumSavings.length; idx++) {

    mode === 'achieveGoal'
      ? data.push({
        month: months[idx],
        sumInvestment: comma(Math.round(Number(sumInvestment[idx]))),
        sumYield: comma(Math.round(Number(sumYield[idx]))),
        sumSavings: comma(Math.round(Number(sumSavings[idx])))
      })
      : data.push({
        month: idx * compounding,
        sumInvestment: comma(Math.round(Number(sumInvestment[idx]) + current)),
        sumYield: comma(Math.round(Number(sumYield[idx]))),
        sumSavings: comma(Math.round(Number(sumSavings[idx])))
      }
      )

  }

  return (
    <div className="outputArea">
      <div className="outputHeader">
        {mode === 'savingsGoal'
          ? <p>월별 투자금액</p>
          : mode === 'savingsEstimator'
            ? <p>총 저축액</p>
            : <p>투자 기간</p>}
        <p>{outputValues['main']}</p>
        {headerToggle && <>
          <p>누적 수익</p>
          <p>{outputValues['yield']}</p>
          <p>누적 투자액</p>
          <p>{outputValues['investment']}</p>
        </>}
        <div className="valuesToggle">
          <label onClick={headerToggleChange}>
            {headerToggle
              ? "간단히 ▲"
              : "자세히 ▼"}
          </label>
        </div>
      </div>
      <div className="outputBody">
        {bodyToggle
          ? <Bar options={options} data={outputChartData} />
          : <SortTable columns={columns} data={data} className="assetValueTable"/>}
        <Toggle conn="chart" name="차트"
          change={bodyToggleChange} Toggle={bodyToggle} />
        <Toggle conn="table" name="테이블"
          change={bodyToggleChange} Toggle={!bodyToggle} />
      </div>
    </div>
  )
}

export default OutputArea;