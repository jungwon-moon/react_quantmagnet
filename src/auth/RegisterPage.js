import style from "./RegisterPage.module.scss"
import { React, useState } from "react"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import {
  // loginUser,
  registerUser,
  usrenameUniqueCheck,
  emailUniqueCheck
} from "./Auth_Action"


const RegisterPage = () => {
  const navigate = useNavigate(-1)

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
  const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  // State
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  // 오류 메시지 상태
  const [usernameMsg, setUsernameMsg] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [nameMsg, setNameMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [confirmMsg, setConfirmMsg] = useState('')

  // 유효성 검사
  const [isUsername, setIsUsername] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isName, setIsName] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  // Check
  const [checkUsername, setCheckUsername] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)


  // Event
  const onClickGoBack = () => {
    navigate(-1)
  }

  const onChangeUsername = (e) => {
    setUsername(e.currentTarget.value)
    if (e.currentTarget.value.length < 4 || e.currentTarget.value.length > 16) {
      setUsernameMsg('4자 이상 16자 이하로 입력해주세요.')
      setIsUsername(false)
    } else {
      setUsernameMsg('')
      setIsUsername(true)
    }
  }

  const onChangeEmail = (e) => {
    const currentEmail = e.currentTarget.value
    setEmail(currentEmail)
    if (!emailRegex.test(currentEmail)) {
      setEmailMsg('이메일 형식에 맞지 않습니다.')
      setIsEmail(false)
    } else {
      setEmailMsg('')
      setIsEmail(true)
    }
  }

  const onChangeName = (e) => {
    setName(e.currentTarget.value)
    if (e.currentTarget.value.length < 2 || e.currentTarget.value.length > 5) {
      setNameMsg('2자 이상 5자 이하로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMsg('')
      setIsName(true)
    }
  }

  const onChangePassword = (e) => {
    const currentPassword = e.currentTarget.value
    setPassword(currentPassword)
    if (!passwordRegex.test(currentPassword)) {
      setPasswordMsg('숫자+영문자+특수문자 조합 8자리 이상 입력해주세요.')
      setIsPassword(false)
    } else {
      setPasswordMsg('')
      setIsPassword(true)
    }
  }

  const onChangeConfirm = (e) => {
    const currentConfirm = e.currentTarget.value
    setConfirm(currentConfirm)
    if (password === currentConfirm) {
      setConfirmMsg('')
      setIsConfirm(true)
    } else {
      setConfirmMsg('비밀번호가 일치하지 않습니다.')
      setIsConfirm(false)
    }
  }

  const onClickCheckUsername = (e) => {
    let body = { username: username }
    usrenameUniqueCheck(body, setCheckUsername)
  }

  const onClickCheckEmail = (e) => {
    let body = { email: email }
    emailUniqueCheck(body, setCheckEmail)
  }

  const onClickRegister = (e) => {
    let body = {
      username: username,
      email: email,
      first_name: name,
      password: password,
      password2: confirm,
    }
    if (window.confirm("회원가입 하시겠습니까?")) {
      registerUser(body, navigate)
    }
  }

  return (
    <div className={style.content}>
      <div className={style.title}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={style.titleButton}
          onClick={onClickGoBack} />
        회원가입
      </div>

      <div className={style.registerBox}>

        <label className={style.label}>아이디</label>
        <div className={style.containCheck}>
          <input
            className={style.input}
            type="text" value={username}
            disabled={checkUsername}
            placeholder="아이디"
            onChange={onChangeUsername} />
          <button
            className={style.checkButton}
            disabled={checkUsername}
            onClick={onClickCheckUsername}>
            중복확인
          </button>
        </div>
        <div className={style.validMsg}>{usernameMsg}</div>

        <label className={style.label}>이메일</label>
        <div className={style.containCheck}>
          <input
            className={style.input}
            type="text" value={email}
            disabled={checkEmail}
            placeholder="이메일"
            onChange={onChangeEmail} />
          <button
            className={style.checkButton}
            disabled={checkEmail}
            onClick={onClickCheckEmail}>
            중복확인
          </button>
        </div>
        <div className={style.validMsg}>{emailMsg}</div>

        <label className={style.label}>이름</label>
        <input
          className={style.input}
          type="text" value={name}
          placeholder="이름"
          onChange={onChangeName} />
        <div className={style.validMsg}>{nameMsg}</div>

        <label className={style.label}>비밀번호</label>
        <input
          className={style.input}
          type="password" value={password}
          placeholder="비밀번호"
          onChange={onChangePassword} />
        <div className={style.validMsg}>{passwordMsg}</div>

        <label className={style.label}>비밀번호 확인</label>
        <input
          className={style.input}
          type="password" value={confirm}
          placeholder="비밀번호 확인"
          onChange={onChangeConfirm} />
        <div className={style.validMsg}>{confirmMsg}</div>

        <button
          className={style.registerButton}
          disabled={!(isUsername && isName && isEmail && isPassword && isConfirm && checkUsername && checkEmail)}
          onClick={onClickRegister}>
          회원가입</button>
        <div className={style.footer}>
          {/* <Link className={style.footerButton}>ID/PW 찾기</Link> */}
          <Link
            className={style.footerButton}
            to="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage