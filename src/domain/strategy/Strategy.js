import style from "./Strategy.module.scss"
import React from "react"
import { useNavigate, Link } from 'react-router-dom'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../components/DomainCard"

import strategyListJson from "../../store/json/strategyList.json"
// import strategyPerPbrSmallJson from "../../store/json/strategy_per_pbr_small.json"
// import strategyPerRoeSmallJson from "../../store/json/strategy_per_roe_small.json"


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
        <Link to="./validation/per_pbr_small">

          <div className={style.card}>
            <div className={style.cardTitle}>멀티팩터 PER-PBR-소형주</div>
            <div className={style.cardItem}>

              <div>PER, PBR, 소형주</div>
              {/* <div>2018-01 ~ 2022-01</div>
              <div>수익률</div>
              <div>누적수익률: {(strategyPerPbrSmallJson['summary']['last_return'] * 100).toFixed(2)} %</div>
              <div>연환산 수익률: {(strategyPerPbrSmallJson['summary']['cagr'] * 100).toFixed(2)} %</div>
              <div>위험지표</div>
              <div>표준편차: {strategyPerPbrSmallJson['summary']['std'].toFixed(2)}</div>
              <div>최대손실률: {strategyPerPbrSmallJson['summary']['mdd'].toFixed(2)} %</div> */}

            </div>
          </div>
        </Link>

        <Link to="./validation/per_roe_small">
          <div className={style.card}>
            <div className={style.cardTitle}>멀티팩터 PER-ROE-소형주</div>
            <div className={style.cardItem}>

              <div>PER, ROE, 소형주</div>
              {/* <div>2018-01 ~ 2022-01</div>
              <div>수익률</div>
              <div>누적수익률: {(strategyPerRoeSmallJson['summary']['last_return'] * 100).toFixed(2)} %</div>
              <div>연환산 수익률: {(strategyPerRoeSmallJson['summary']['cagr'] * 100).toFixed(2)} %</div>
              <div>위험지표</div>
              <div>표준편차: {strategyPerRoeSmallJson['summary']['std'].toFixed(2)}</div>
              <div>최대손실률: {strategyPerRoeSmallJson['summary']['mdd'].toFixed(2)} %</div> */}

            </div>
          </div>
        </Link>

      </div>
    </>
  )
}

export default Strategy;