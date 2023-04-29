import { React } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons"
import inputListJson from "../../../store/json/assetValueInputList.json"

import style from "./InputArea.module.scss"



const InputGroup = ({ title, variable, values, onChange }) => {
  return (
    <div className={style.inputGroup}>
      <label className={style.inputLabel}>{title}</label>
      {
        variable === "frequency"
          ? <select
            className={style.input}
            defaultValue={values[variable]}
            type="number" >
            <option value="1">월간</option>
            <option value="3">분기</option>
            <option value="6">반기</option>
            <option value="12">연간</option>
          </select>
          : <input
            className={style.input}
            name={variable}
            value={values[variable]}
            onChange={(e) => onChange(e)}
          />
      }
    </div>
  )
}

const InputArea = ({ selected, values, title, description, onChange }) => {
  const usedInput = inputListJson.filter(item =>
    !item.variable.includes(notUsedInput[selected]))
  return (
    <>
      <div className={style.inputTitle}>
        {title} 계산기
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className={style.questionIcon}
        />
        <div className={style.tooltip}>{description}</div>
      </div>
      <div className={style.inputArea}>
        <div>
          {
            usedInput.map((item, index) => (
              <InputGroup key={index}
                title={item.title}
                values={values}
                variable={item.variable}
                onChange={onChange} />
            ))
          }
        </div>
      </div>
    </>
  )
}

// global variable
const notUsedInput = [
  "investment",
  "goal",
  "numOfYear"
]

export default InputArea