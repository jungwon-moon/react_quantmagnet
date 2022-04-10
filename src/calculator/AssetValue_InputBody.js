import { React } from "react";

// function uncomma(str) {
//   str = String(str)
//   return str.replace(/[^\d]+/g, '');
// }
// function comma(str) {
//   return String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
// }
// function inputRegular(obj) {
//   obj.value = comma(uncomma(obj.value));
// }

// InputBody Component
const InputBody = ({ mode, values, InputValueChange }) => {

  const nameList = [
    'goal', 'current', 'investment', 'yieldRate', 'compounding', 'numOfYear'
  ]
  const koNameList = [
    '목표 저축액', '현재 저축액', '월 투자액', '연 수익률(%)', '복리 계산 단위', '투자 기간(년)'
  ]

  return (

    <div className="inputBody">
      {mode === 'savingsGoal'
        ? <>
          <label>{koNameList[0]}</label>
          <input name={nameList[0]} onChange={InputValueChange} value={values[nameList[0]]} />
          <label>{koNameList[1]}</label>
          <input name={nameList[1]} onChange={InputValueChange} value={values[nameList[1]]} />
          <label>{koNameList[3]}</label>
          <input name={nameList[3]} onChange={InputValueChange} value={values[nameList[3]]} />
          <label>{koNameList[4]}</label>
          <select type="number" name={nameList[4]} onChange={InputValueChange} value={values[nameList[4]]}>
            <option value="1">월간</option>
            <option value="3">분기</option>
            <option value="6">반기</option>
            <option value="12">연간</option>
          </select>
          <label>{koNameList[5]}</label>
          <input name={nameList[5]} onChange={InputValueChange} value={values[nameList[5]]} />
        </>
        : mode === 'savingsEstimator'
          ? <>
            <label>{koNameList[1]}</label>
            <input name={nameList[1]} onChange={InputValueChange} value={values[nameList[1]]} />
            <label>{koNameList[2]}</label>
            <input name={nameList[2]} onChange={InputValueChange} value={values[nameList[2]]} />
            <label>{koNameList[3]}</label>
            <input name={nameList[3]} onChange={InputValueChange} value={values[nameList[3]]} />
            <label>{koNameList[4]}</label>
            <select type="number" name={nameList[4]} onChange={InputValueChange} value={values[nameList[4]]}>
              <option value="1">월간</option>
              <option value="3">분기</option>
              <option value="6">반기</option>
              <option value="12">연간</option>
            </select>
            <label>{koNameList[5]}</label>
            <input name={nameList[5]} onChange={InputValueChange} value={values[nameList[5]]} />
          </>
          : <>
            <label>{koNameList[0]}</label>
            <input name={nameList[0]} onChange={InputValueChange} value={values[nameList[0]]} />
            <label>{koNameList[1]}</label>
            <input name={nameList[1]} onChange={InputValueChange} value={values[nameList[1]]} />
            <label>{koNameList[2]}</label>
            <input name={nameList[2]} onChange={InputValueChange} value={values[nameList[2]]} />
            <label>{koNameList[3]}</label>
            <input name={nameList[3]} onChange={InputValueChange} value={values[nameList[3]]} />
            <label>{koNameList[4]}</label>
            <select type="number" name={nameList[4]} onChange={InputValueChange} value={values[nameList[4]]}>
              <option value="1">월간</option>
              <option value="3">분기</option>
              <option value="6">반기</option>
              <option value="12">연간</option>
            </select>
          </>
      }
    </div>
  )
}

export default InputBody;