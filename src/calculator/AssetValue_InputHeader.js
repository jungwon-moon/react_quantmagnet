import { React } from "react";

const InputHeader = ({ toggleChange, mode }) => {
  
  const Input = ({ title, conn, change, mode }) => {
    return (
      <>{mode === conn
        ? <input name='headerToggle' id={conn} onChange={change} type="radio" checked={true} />
        : <input name='headerToggle' id={conn} onChange={change} type="radio" checked={false} />}
        <label htmlFor={conn}>{title}</label>
      </>
    )
  }

  return (
    <div className="inputHeader">
      <Input title="목표 투자 금액" conn="savingsGoal"
        change={toggleChange} mode={mode} />
      <Input title="예상 저축 금액" conn="savingsEstimator"
        change={toggleChange} mode={mode} />
      <Input title="목표 달성 시간" conn="achieveGoal"
        change={toggleChange} mode={mode} />
    </div>
  )
}

export default InputHeader;