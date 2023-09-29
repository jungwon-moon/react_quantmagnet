import style from "./GainersLosers.module.scss"
import StockListCard from "../StockListCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"


// Main Components
function GainersLosers() {
  // State
  const navigate = useNavigate()
  const [cnt] = useState(20)
  const [gains, setGains] = useState('')
  const [losers, setLosers] = useState('')

  // Event
  const onClickGoBack = () => {
    navigate(-1)
  }

  // useEffect
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/kr/gainers-losers"
    }).then(
      res => {
        const results = res.data
        setGains(results.slice(0, cnt))
        setLosers(results.slice(-cnt).reverse())
      }
    )
  }, [cnt])

  return (
    <>
      <div className={style.content}>

        <div className={style.title}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={style.titleButton}
            onClick={onClickGoBack}
          />
          상승률 및 하락률
        </div>

        <div className={style.container}>
          <StockListCard title="상승률" data={gains} />
          <StockListCard title="하락률" data={losers} />
        </div>

      </div>
    </>
  )
}

export default GainersLosers