import styles from "./ValidationCard.module.scss"
import { Line } from "react-chartjs-2"



const ValidationCard = ({ data }) => {
	const monthlyLabel = data['monthly']['dates']
	const backgroundOption = monthlyLabel.map(
		(_, index) => index % 3 === 0 ? 'rgba(54, 162, 235, 0.6)' : 'rgba(54, 162, 235, 0.2)')
	const returnCumulative = data['monthly']['cumulative'].map((d) => { return (d - 1) * 100 })
	const returnData = {
		labels: monthlyLabel,
		datasets: [{
			label: "누적 수익률",
			data: returnCumulative,
			backgroundColor: backgroundOption,
			fill: true,
			tension: 0.5,
		}]
	}
	const monthlyDrawnDown = data['monthly']['drawndown']
	const monthlyDrawnDownData = {
		labels: monthlyLabel,
		datasets: [
			{
				label: "드로우다운",
				data: monthlyDrawnDown,
				backgroundColor: backgroundOption,
				fill: true,
				tension: 0.5,
			},
		]
	}
	const options = {
		scales: {
			y: {
				ticks: {
					callback: function (value) {
						return value + "%"
					}
				}
			}
		}
	}

	return (
		<>
			<div className={styles.card} >
				<div className={styles.cardHeader}>
					수익률
				</div>
				<div className={styles.cardBody}>
					<div className={styles.bodyItem}>CQGR</div>
					<div className={styles.bodyItem}>
						{(data['summary']['cqgr'] * 100).toFixed(2)} %
					</div>
					<div className={styles.bodyItem}>CAGR</div>
					<div className={styles.bodyItem}>
						{(data['summary']['cagr'] * 100).toFixed(2)} %
					</div>
					<div className={styles.bodyItem}>누적</div>
					<div className={styles.bodyItem}>
						{(data['summary']['last_return'] * 100).toFixed(2)} %
					</div>
				</div>
				<div className={styles.cardHeader}>
					위험지표
				</div>
				<div className={styles.cardBody}>
					<div className={styles.bodyItem}>표준편차</div>
					<div className={styles.bodyItem}>
						{(data['summary']['std']).toFixed(2)}
					</div>
					<div className={styles.bodyItem}>샤프지수</div>
					<div className={styles.bodyItem}>
						{(data['summary']['sharp'] * 100).toFixed(2)}
					</div>
					<div className={styles.bodyItem}>MDD</div>
					<div className={styles.bodyItem}>
						{data['summary']['mdd'].toFixed(2)}%
					</div>
				</div>
			</div>

			<div className={styles.card}>
				누적 수익률 차트
				<Line
					data={returnData}
					options={options} />
			</div>
			<div className={styles.card}>
				MDD 차트
				<Line
					data={monthlyDrawnDownData}
					options={options} />
			</div>
		</>
	)
}

export default ValidationCard