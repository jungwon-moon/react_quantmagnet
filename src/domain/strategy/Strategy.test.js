import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'
// import store from '../../store'

import Strategy from './Strategy';


const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      {/* <Provider store={store}> */}
        {children}
      {/* </Provider> */}
    </BrowserRouter>
  )
}

describe('<Strategy />', () => {

  test('카드 타이틀', () => {
    const { getByText } = render(<Strategy />, { wrapper: Providers })
    getByText('종목 스크리너')
    // getByText('기술적 지표')
  })

  test('투자전략 항목', () => {
    const { getByText } = render(<Strategy />, { wrapper: Providers })
    getByText('종목 스크리너')
    // getByText('기술적 지표')
  })
})