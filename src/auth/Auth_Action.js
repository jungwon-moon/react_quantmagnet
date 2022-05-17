import axios from 'axios'
import {
  LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER,
  CHECK_USERNAME, CHECK_EMAIL,
} from './types';


const loginUser = (submitData, navigate) => {
  const request = axios.post('/auth/login/', submitData)
    .then(res => {
      if (res.status === 202) {
        alert('로그인 완료')
        navigate('/')
      }
    })
  return {
    type: LOGIN_USER,
    payload: request,
  }
}

const logoutUser = (navigate) => {
  const request = axios.post('/auth/logout/')
  .then(res => {
    if (res.status === 204) {
      alert('로그아웃')
      navigate('/')
    }
  })
  return {
    type: LOGOUT_USER,
    payload: request,
  }
}

const registerUser = (submitData, navigate) => {
  const request = axios.post('/auth/register/', submitData)
    .then(res => {
      if (res.status === 201) {
        alert('회원가입이 완료되었습니다.')
        navigate('/login')
      }
    })
  return {
    type: REGISTER_USER,
    payload: request,
  }
}

const auth=() => {
  const request = axios.get('/auth/profile/')
    .then(res => console.log(res.data))
}

const usrenameUniqueCheck = (submitData, setCheckUsername) => {
  const request = axios.post('/auth/check/username/', submitData)
    .then(res => {
      if (res.status === 200) {
        if (window.confirm("사용 가능한 아이디입니다.\n해당 아이디를 사용하시겠습니까?")) {
          setCheckUsername(true)
        } else {
          setCheckUsername(false)
        }
      }
    })
    .catch(err => {
      alert('사용할 수 없는 아이디입니다.')
    })
  return {
    type: CHECK_USERNAME,
    payload: request,
  }
}

const emailUniqueCheck = (submitData, setCheckEmail) => {
  const request = axios.post('/auth/check/email/', submitData)
    .then(res => {
      if (res.status === 200) {
        if (window.confirm("사용 가능한 이메일입니다.\n해당 이메일을 사용하시겠습니까?")) {
          setCheckEmail(true)
        } else {
          setCheckEmail(false)
        }
      }
    }).catch(err => {
      alert('이메일 형식에 맞지 않습니다.')
    })

  return {
    type: CHECK_EMAIL,
    payload: request,
  }
}

export {
  loginUser, logoutUser, registerUser, auth,
  usrenameUniqueCheck, emailUniqueCheck
}