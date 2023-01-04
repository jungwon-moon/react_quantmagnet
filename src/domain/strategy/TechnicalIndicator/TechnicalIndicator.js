// import { useState, useEffect } from "react";
// import axios from 'axios';
import styles from './TechnicalIndicator.module.scss'


function TechnicalIndicator() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>
          기술적 지표(보조지표)
        </div>
        <div className={styles.card} >
          <div className={styles.cardHeader}>
            이격도
          </div>
          <div className={styles.cardBody}>
            <div className={styles.bodyItem}>CAGR</div>
            <div className={styles.bodyItem}>CAGR값</div>
            <div className={styles.bodyItem}>MDD</div>
            <div className={styles.bodyItem}>CAGR값</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TechnicalIndicator