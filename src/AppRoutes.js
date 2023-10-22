import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Layout from "./components/Layout"

import Home from './domain/home/Home'
import NotFound from './components/NotFound'

import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'

import Strategy from './domain/strategy/Strategy'
import Screener from './domain/strategy/Screener/Screener'
// import Valuation from './domain/strategy/Valuation/Valuation'
import PerPbrSmall from './domain/strategy/Validation/PerPbrSmall'
import PerRoeSmall from './domain/strategy/Validation/PerRoeSmall'
// import TechnicalIndicator from './domain/strategy/TechnicalIndicator/TechnicalIndicator'

import Trend from "./domain/trend/Trend"
import GainersLosers from './domain/trend/GainersLosers/GainersLosers'
import SoaringValue from './domain/trend/SoaringValue/SoaringValue'

import Calculator from './domain/calculator/Calculator'
import AssetValue from './domain/calculator/AssetValue/AssetValue'

import StockDetails from './components/StockDetails'


function AppRoutes() {
  const authenticated = useSelector(state => state.auth.authenticated)

  return (
    <Routes>
      <Route path="" element={<Layout />} >
        <Route path="/" element={<Home />} />

        {authenticated === false
          ? <>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </>
          : <>
            <Route path="login" element={<Navigate replace to="/" />} />
            <Route path="register" element={<Navigate replace to="/" />} />
          </>
        }

        <Route path="stockdetails/:stcd" element={<StockDetails />} />

        <Route path="strategy" element={<Strategy />} />
        <Route path="strategy/screener" element={<Screener />} />
        {/* <Route path="strategy/technicalindicator" element={<TechnicalIndicator />} /> */}
        {/* <Route path="strategy/valuation" element={<Valuation />} /> */}
        <Route path="strategy/validation/per_pbr_small" element={<PerPbrSmall />} />
        <Route path="strategy/validation/per_roe_small" element={<PerRoeSmall />} />

        <Route path="trend" element={<Trend />} />
        <Route path="trend/gainers-losers" element={<GainersLosers />} />
        <Route path="trend/soaringvalue" element={<SoaringValue />} />

        <Route path="calculator" element={<Calculator />} />
        <Route path="calculator/assetvalue" element={<AssetValue />} />

      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default React.memo(AppRoutes)