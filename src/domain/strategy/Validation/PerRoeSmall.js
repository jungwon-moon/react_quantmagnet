// import { useState, useEffect } from "react";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './PerRoeSmall.module.scss'

import jsonData from "../../../store/json/strategy_per_roe_small.json"
import ValidationCard from './ValidationCard'


const PerRoeSmall = () => {
  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={styles.titleButton}
            onClick={onClickGoBack}
          />
          멀티팩터 PER-PBR-소형주
        </div>
        <div className={styles.text1}>
          저PER, 저PBR, 소형주 종목을 3개월 마다 리밸런싱을 실시한다.
        </div>
        <div className={styles.comt1}>
          <p>수수료(0.015%)+거래세(0.02%)+슬리피지(1%)</p>
          <p>상장폐지 및 거래정지 종목은 100% 손실로 계산</p>
        </div>
        {/* 공용 컴포넌트로 전환 */}
        <ValidationCard data={jsonData} />
      </div>
    </>
  )
}

export default PerRoeSmall