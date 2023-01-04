import styles from './Valuation.module.scss'

function ValuationTableBody(data) {
  return (
    <tbody >
      <tr>
        <td>PER</td>
        <td>3mr</td>
        <td>6mr</td>
        <td>1yr</td>
        <td>aHPR</td>
        <td>cumr</td>
        <td>cagr</td>
        <td>mdd</td>
      </tr>
    </tbody>
  )
}

function Valuation() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>
          가치평가
        </div>

        <table>
          <thead>
            <tr>
              <th rowSpan={2}>가치평가명</th>
              <th colSpan={6}>수익률</th>
              <th>위험지표</th>
            </tr>
            <tr>
              <th className={styles.bodyItem}>3개월</th>
              <th>6개월</th>
              <th>1년</th>
              <th>연환산수익률</th>
              <th>누적수익률</th>
              <th>CAGR</th>
              <th>MDD</th>
            </tr>
          </thead>
          <ValuationTableBody />
        </table>
      </div>
    </>
  )
}

export default Valuation