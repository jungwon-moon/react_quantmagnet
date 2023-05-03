import style from "./LoginPage.module.scss"
import { React, useState } from "react"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginUser } from '../store/modules/auth'


const LoginPage = () => {
  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate("/")
  }
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
    <div className={style.content}>
      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack}/>
        로그인
      </div>

      <div className={style.loginBox}>
        <label className={style.label}>아이디</label>
        <input className={style.input}
          type="text" value={username}
          placeholder="영문 소문자, 숫자"
          onChange={onChangeUsername}
          onKeyPress={onKeyPressLogin} />
        <label className={style.label}>비밀번호</label>
        <input className={style.input}
          type="password" value={password}
          placeholder="특수문자+영문+숫자"
          onChange={onChangePassword}
          onKeyPress={onKeyPressLogin} />
        <button
          className={style.loginButton}
          onClick={onClickLogin}>로그인</button>
        <div className={style.footer} >
          {/* <>ID/PW 찾기</> */}
          <Link className={style.footerButton} to="/register">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage