import './Home.css'
import './Card.css'
import React from "react";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Outlet />
      <h1>홈</h1>
    </>
  )
}

export default Home;