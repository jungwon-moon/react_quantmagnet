import './Home.css'
import React from "react";
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Outlet />
            <div className="main-page">
                <h1>홈</h1>
            </div>
        </>
    )
}

export default Home;