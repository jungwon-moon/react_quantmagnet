import style from "./SoaringValue.module.scss"
import StockListCard from "../StockListCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"



// Main Components
function SoaringValue() {
  // State
  const navigate = useNavigate()
  const [values, setValues] = useState('')

  // Event
  const onClickGoBack = () => {
    navigate(-1)
  }

  // useEffect
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/kr/soaringvalue"
    }).then(
      res => {
        const results = res.data
        setValues(results)
      }
    )
  }, [])

  return (
    <>
      <div className={style.content}>

        <div className={style.title}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={style.titleButton}
            onClick={onClickGoBack}
          />
          거래대금 급등주
        </div>

        <div className={style.container}>
          <StockListCard title="상승률" data={values} />
        </div>

      </div>
    </>
  )
}

export default SoaringValue