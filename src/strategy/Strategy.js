import React from "react";
import { Link, Outlet } from 'react-router-dom';


const Strategy = () => {
  return (
    <>
      <div>
        <div className="main-page">
          <Link to="./screener">
            <div className="card" style={{ width: "28rem" }}>
              <div className="card-header">
                종목 스크리너
              </div>
              <ul className="list-group">
                <li className="list-group-item">특정일의 밸류에이션을 조회할 수 있습니다.</li>
                <li className="list-group-item">특정값의 밸류에이션을 조회할 수 있습니다.</li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Strategy;