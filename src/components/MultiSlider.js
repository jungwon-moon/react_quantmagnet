import style from "./MultiSlider.module.scss"
import { React, useCallback, useEffect, useRef } from "react"
import { comma, uncomma } from "../utils/utils"


const MultiSlider = ({ name, min, max, left, right, onChange }) => {

  const range = useRef(null)

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    if (range.current) {
      const leftPercent = getPercent(left)
      const rightPercent = getPercent(right)
      range.current.style.left = `${leftPercent}%`
      range.current.style.width = `${rightPercent - leftPercent}%`
    }
  }, [left])

  useEffect(() => {
    if (range.current) {
      const leftPercent = getPercent(left)
      const rightPercent = getPercent(right)
      range.current.style.width = `${rightPercent - leftPercent}%`
    }
  })

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
            const value = Math.max(Math.min(Number(uncomma(e.target.value)), right - 1, max), min)
            onChange(name + "_left", value)
          }}
        />
        <input type="text"
          className={style.sliderInput}
          value={comma(right)}
          onChange={(e) => {
            const value = Math.min(Math.max(Number(uncomma(e.target.value)), left + 1, min), max)
            onChange(name + "_right", value)
          }}
        />
      </div>

    </div>
  )
}

export default MultiSlider