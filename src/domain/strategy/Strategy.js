import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';


const Strategy = () => {

  return (
    <>
      <div>
        <Link to="./screener">
          <div className="card" style={{ width: "28rem" }}>
            <div className="card-header">
              종목 스크리너
            </div>
            <ul className="list-group">
              <li className="list-group-item">특정일의 밸류에이션을 조회할 수 있습니다.</li>
            </ul>
          </div>
        </Link>
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
      <Outlet />
    </>
  )
}

export default Strategy;