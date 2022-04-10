import React from "react";
import { Link } from 'react-router-dom';

const Calculator = () => {
    return (
        <>
        <div>
            <div className="main-page">
                <h1>계산기</h1>
                <Link to="./assetvalue">
                    자산가치 계산기
                </Link>
            </div>
        </div>
        </>
    )
}

export default Calculator;