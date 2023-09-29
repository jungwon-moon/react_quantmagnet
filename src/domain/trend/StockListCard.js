import style from "./StockListCard.module.scss"
import { comma } from "../../utils/utils"
import { Link } from "react-router-dom"


const StockListCard = ({ title, data }) => {
  return (
    <div className={style.stockListCard}>
      <div className={style.stockListCardTitle}>{title}</div>
      <div className={style.stockListCardHeader}>
        <div className={`${style.stockListCardItem0} ${style.textCenter}`}></div>
        <div className={`${style.stockListCardItem1} ${style.textCenter}`}>종목코드</div>
        <div className={`${style.stockListCardItem2} ${style.textCenter}`}>종목명</div>
        <div className={`${style.stockListCardItem1} ${style.textCenter}`}>변동률</div>
        <div className={`${style.stockListCardItem3} ${style.textCenter}`}>종가</div>
        <div className={`${style.stockListCardItem4} ${style.textCenter}`}>거래대금</div>
      </div>
      {
        data ? <> {
          data.map((item, index) => (
            <Link
              className={style.stockListCardItems}
              to={`/stockdetails/${item.stcd}`}
              key={index}>
              <div className={style.stockListCardItem0}>{index + 1}</div>
              <div className={style.stockListCardItem1}>{item.stcd}</div>
              <div className={style.stockListCardItem2}>{item.stnm}</div>
              <div className={`${style.stockListCardItem1} ${style.textRight}`}>{item.rate} %</div>
              <div className={`${style.stockListCardItem3} ${style.textRight}`}>{comma(item.close)}</div>
              <div className={`${style.stockListCardItem4} ${style.textRight}`}>{comma(item.value)}</div>
            </Link>
          ))}
        </>
          : <>해당 종목이 없습니다.</>
      }
    </div>
  )
}

export default StockListCard