import auth from './modules/auth'

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import ReduxThunk from 'redux-thunk'


// Reducer
const rootReducer = combineReducers({
  auth: auth,
})

// Middleware
const middleware = [
  ReduxThunk,
]

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware
})

export default store;