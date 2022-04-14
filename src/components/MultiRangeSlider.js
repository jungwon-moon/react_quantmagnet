import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import './MultiRangeSlider.css'


function MultilRangeSlider({ name, min, max, left, right, change }) {

  const [leftVal, setLeftVal] = useState(left)
  const [rightVal, setRightVal] = useState(right)
  const leftValRef = useRef(null)
  const rightValRef = useRef(null)
  const range = useRef(null)

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    if (leftValRef.current) {
      const leftPercent = getPercent(leftVal)
      const rightPercent = getPercent(+rightValRef.current.value)
      if (range.current) {
        range.current.style.left = `${leftPercent}%`
        range.current.style.width = `${rightPercent - leftPercent}%`
      }
    }
  }, [leftVal, getPercent])

  useEffect(() => {
    if (rightValRef.current) {
      const leftPercent = getPercent(+leftValRef.current.value)
      const rightPercent = getPercent(rightVal)
      if (range.current) {
        range.current.style.width = `${rightPercent - leftPercent}%`
      }
    }
  }, [rightVal, getPercent])


  return (
    <>
      <input className="thumb thumb--zindex-3"
        name={name + '__gte'}
        type="range" min={min} max={max}
        value={leftVal} ref={leftValRef}
        onChange={(e) => {
          const value = Math.min(+e.target.value, rightVal - 1) // 필터링 필요
          setLeftVal(value)
          change(e)
          e.target.value = value.toString()
        }} />


      <input className="thumb thumb--zindex-4"
        name={name + '__lte'}
        type="range" min={min} max={max}
        value={rightVal} ref={rightValRef}
        onChange={(e) => {
          const value = Math.max(+e.target.value, leftVal + 1) // 필터링 필요
          setRightVal(value)
          change(e)
          e.target.value = value.toString()
        }} />

      <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" ref={range} />
        <div className="slider-box">
          <input className="slider__left-value" value={leftVal}
            type="text" onChange={(e) => {
              const value = e.target.value // 필터링 필요
              setLeftVal(value)
              change(e)
            }} />
          <input className="slider__right-value" value={rightVal}
            type="text" onChange={(e) => {
              const value = e.target.value // 필터링 필요
              setRightVal(value)
              change(e)
            }} />
        </div>
      </div>
    </>
  )
}
MultilRangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
}

export default MultilRangeSlider