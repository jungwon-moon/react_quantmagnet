import style from "./Strategy.module.scss"
import React from "react"
import { useNavigate } from 'react-router-dom'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../components/DomainCard"

import strategyListJson from "../../store/json/strategyList.json"


const Strategy = () => {
  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate("/")
  }

  return (
    <>
      <div className={style.content}>
        <div className={style.title}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={style.titleButton}
            onClick={onClickGoBack}
          />
          투자 전략
        </div>
        {
          strategyListJson.map((item, index) => (
            <Card key={index}
              title={item.title}
              link={item.link}
              description={item.description}
            />
          ))
        }

        {/* <Link to="./technicalindicator">
          <div className="card" style={{ width: "28rem" }}>
          <div className="card-header">
          기술적 지표
          </div>
          <ul className="list-group">
          <li className="list-group-item">보조 지표를 활용할 수 있습니다.</li>
          </ul>
          </div>
        </Link> */}
        {/* <Link to="./valuation">
          <div className="card" style={{ width: "28rem" }}>
          <div className="card-header">
          가치 평가
          </div>
          <ul className="list-group">
          <li className="list-group-item">기업의 가치평가</li>
          </ul>
          </div>
        </Link> */}
      </div>
    </>
  )
}

export default Strategy;