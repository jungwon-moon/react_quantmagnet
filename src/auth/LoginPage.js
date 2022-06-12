import { React, useState } from "react";
import { Link } from 'react-router-dom';
import {
  useDispatch
} from "react-redux";
import "./LoginPage.css";
import { loginUser } from '../store/modules/auth';


const LoginPage = () => {
  const dispatch = useDispatch()
  // const auth = useSelector(state => state.auth)
    
  // state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isUsername, setIsUsername] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
    
  const onChangeUsername = (e) => {
    setUsername(e.currentTarget.value)
    if (e.currentTarget.value.length >= 4) {
      setIsUsername(true)
    } else {
      setIsUsername(false)
    }
  }
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value)
    if (e.currentTarget.value.length > 8) {
      setIsPassword(true)
    } else {
      setIsPassword(false)
    }
  }
  const onKeyPressLogin = (e) => {
    if (e.key === 'Enter') {
      onClickLogin(e)
    }
  }
  const onClickLogin = (e) => {
    e.preventDefault()
    if (isUsername && isPassword) {
      let body = {
        username: username,
        password: password,
      }
      dispatch(loginUser(body))
    } else {
      alert('아이디 및 비밀번호를 확인해주세요')
    }
  }

  return (
    <>
      <div className="loginBox">
      <h2>로그인</h2>
        <label>아이디</label>
        <input type="text" value={username}
          onChange={onChangeUsername}
          onKeyPress={onKeyPressLogin}/>
        <label>비밀번호</label>
        <input type="password" value={password}
          onChange={onChangePassword}
          onKeyPress={onKeyPressLogin}/>
        <br />
        <button onClick={onClickLogin}>로그인</button>
        <br />
        {<Link to="/register">
          회원가입 페이지로 이동
        </Link>}
      </div>
    </>
  )
}

export default LoginPage