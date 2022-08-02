import axios from "axios"

// State
const initialState = {
  authenticated: false,
  data: {
    id: null,
    username: '',
    first_name: '',
  }
}

// Types
export const AUTH_USER = "auth/AUTH_USER"
export const AUTH_USER_SUCCESS = "auth/AUTH_USER_SUCCESS"
export const AUTH_USER_ERROR = "auth/AUTH_USER_ERROR"

export const LOGIN_USER = "auth/LOGIN_USER"
export const LOGIN_USER_SUCCESS = "auth/LOGIN_USER_SUCCESS"

export const LOGOUT_USER = "auth/LOGOUT_USER"
export const LOGOUT_USER_SUCCESS = "auth/LOGOUT_USER_SUCCESS"
export const LOGOUT_USER_ERROR = "auth/LOGOUT_USER_ERROR"

export const REGISTER_USER = "auth/REGISTER_USER"
export const CHECK_USERNAME = "auth/CHECK_USERNAME"
export const CHECK_EMAIL = "auth/CHECK_EMAIL"


// Actions
export const authUser = () => async dispatch => {
  try {
    const auth = await axios.get('/auth/profile/')
    dispatch({ type: AUTH_USER_SUCCESS, auth })
  } catch (error) {
    dispatch({ type: AUTH_USER_ERROR, error })
  }
}

export const loginUser = (body) => async dispatch => {
  try {
    await axios({
      method: 'post',
      url: '/auth/login/',
      data: body,
    })
    dispatch(authUser())
  } catch (error) {
    alert('아이디와 비밀번호가 일치하지 않습니다.')
  }
}

export const logoutUser = () => async dispatch => {
  try {
    await axios.get('/auth/logout/')
    dispatch({ type: LOGOUT_USER_SUCCESS })
    dispatch(authUser())
  } catch (error) {
    dispatch({ type: LOGOUT_USER_ERROR, error })
  }
}


// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
      }
    case AUTH_USER_SUCCESS:
      if (action.auth.data.id !== null) {
        return {
          ...state,
          authenticated: true,
          data: action.auth.data,
          error: null
        }
      } else {
        return {
          ...state,
          authenticated: false,
          data: action.auth.data,
          error: null
        }
      }
    case AUTH_USER_ERROR:
      return {
        ...state,
        authenticated: false,
        data: null,
        error: action.error
      }

    case LOGIN_USER:
      return {
        ...state,
        initialState
      }

    case LOGOUT_USER:
      return { ...state }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        initialState
      }
    case LOGOUT_USER_ERROR:
      return {
        ...state,
      }

    default:
      return state
  }
}

