import React from "react";
import { Link, Outlet } from 'react-router-dom';


const Strategy = () => {
    return (
        <>
            <div>
                <div className="main-page">
                    <h1>투자 전략</h1>
                    <Link to="./screener">
                        종목 스크리너
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Strategy;