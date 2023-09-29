import style from "./LayoutRight.module.scss"
import { Link } from "react-router-dom"

const LayoutRight = ({ recentSearches }) => {
  return (
    <div className={style.recentSearches}>
      <div className={style.title}>최근 검색 내역</div>
      {
        recentSearches
          ? <>
            {
              Object.keys(recentSearches).map((item, index) => (
                <Link
                  className={style.item}
                  to={`/stockdetails/${recentSearches[item].stcd}`}
                  key={index}
                >
                  <div className={style.itemStcd}>{recentSearches[item].stcd}</div>
                  <div className={style.itemStnm}>{recentSearches[item].stnm}</div>
                </Link>
              ))
            }
          </>
          : <div className={style.noneItem}>검색 내역이 없습니다.</div>
      }
    </div>
  )
}


export default LayoutRight