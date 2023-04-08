import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "./components/Navbar";

// import Home from './domain/home/Home'
import Home from './domain/home/Home2'
import NotFound from './components/NotFound'

import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'

import Strategy from './domain/strategy/Strategy'
import Screener from './domain/strategy/Screener/Screener'
import Valuation from './domain/strategy/Valuation/Valuation'
import TechnicalIndicator from './domain/strategy/TechnicalIndicator/TechnicalIndicator'

import Calculator from './domain/calculator/index'
import AssetValue from './domain/calculator/AssetValue/index'

import StockDetails from './components/StockDetails'


function AppRoutes() {
  const authenticated = useSelector(state => state.auth.authenticated)

  return (
    <Routes>
      <Route path="" element={<Navbar />} >

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
        <Route path="strategy/technicalindicator" element={<TechnicalIndicator />} />
        <Route path="strategy/valuation" element={<Valuation />} />

        <Route path="calculator" element={<Calculator />} />
        <Route path="calculator/assetvalue" element={<AssetValue />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes