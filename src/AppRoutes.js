import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './components/Home'
import NotFound from './components/NotFound'

import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'

import Strategy from './strategy/Strategy'
import Screener from './strategy/Screener'

import Calculator from './calculator/Calculator'
import AssetValue from './calculator/AssetValue'


function AppRoutes() {
  const authenticated = useSelector(state => state.auth.authenticated)

  return (
    <Routes>
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

      <Route path="strategy" element={<Strategy />} />
      <Route path="strategy/screener" element={<Screener />} />
      <Route path="calculator" element={<Calculator />} />
      <Route path="calculator/assetvalue" element={<AssetValue />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes