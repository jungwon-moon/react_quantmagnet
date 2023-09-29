import style from "./Trend.module.scss"
import React from "react"
import { useNavigate } from "react-router-dom"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../components/DomainCard"

import TrendListJson from "../../store/json/TrendList.json"



const Trend = () => {
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
				증시 동향
			</div>
			{
				TrendListJson.map((item, index) => (
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

export default Trend