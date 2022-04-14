import React from "react";
import { Link } from 'react-router-dom';

const Calculator = () => {
  return (
    <>
      <div>
        <div className="main-page">
          <Link to="./assetvalue">
            <div className="card" style={{ width: "28rem" }}>
              <div className="card-header">
                자산가치
              </div>
              <ul className="list-group">
                <li className="list-group-item">목표 금액을 달성하기 위한 투자 금액을 알 수 있습니다. </li>
                <li className="list-group-item">매월 일정 금액을 투자할때 모을 수 있는 저축 금액을 계산할 수 있습니다.</li>
                <li className="list-group-item">목표 금액을 달성하기 위해 걸리는 시간을 알 수 있습니다.</li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Calculator;