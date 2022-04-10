import React from "react";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from './components/Home'
import Strategy from './strategy/Strategy';
import Screener from './strategy/Screener';
import Calculator from './calculator/Calculator';
import AssetValue from './calculator/AssetValue';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="strategy" element={<Strategy />} />
        <Route path="strategy/screener" element={<Screener />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="calculator/assetvalue" element={<AssetValue />} />
      </Routes>
    </>
  )
}

export default App