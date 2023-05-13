import style from "./MultiSlider.module.scss"
import { React, useRef } from "react"
import { comma, uncomma } from "../utils/utils"


const MultiSlider = ({ name, min, max, left, right, onChange }) => {

  const range = useRef(null)

  return (
    <div className={style.multiSlider}>
      <div className={style.thumbBox}>
        <input type="range"
          className={`${style.thumb} ${style.thumbLeft}`}
          min={min}
          max={max}
          value={left}
          onChange={(e) => {
            const value = Math.min(e.target.value, right - 1, max)
            onChange(name + "_left", value)
          }}
        />
        <input type="range"
          className={`${style.thumb} ${style.thumbRight}`}
          min={min}
          max={max}
          value={right}
          onChange={(e) => {
            const value = Math.max(e.target.value, left + 1, min)
            onChange(name + "_right", value)
          }}
        />
      </div>

      <div className={style.sliderBox}>
        <div className={style.sliderTrack} />
        <div className={style.sliderRange} ref={range} />
      </div>

      <div className={style.inputBox}>
        <input type="text"
          className={style.sliderInput}
          value={comma(left)}
          onChange={(e) => {
            const value = Math.max(Math.min(Number(uncomma(e.target.value)), right, max), min)
            onChange(name + "_left", value)
          }}
        />
        <input type="text"
          className={style.sliderInput}
          value={comma(right)}
          onChange={(e) => {
            const value = Math.min(Math.max(Number(uncomma(e.target.value)), left, min), max)
            onChange(name + "_right", value)
          }}
        />
      </div>

    </div>
  )
}

export default MultiSlider