import App from './App'
import ReactGA from 'react-ga'
import './index.css'
import './components/Common.css'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import store from './store'

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID
ReactGA.initialize(TRACKING_ID)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
