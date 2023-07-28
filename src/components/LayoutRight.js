import style from "./LayoutRight.module.scss"
import { Link } from "react-router-dom"

const LayoutRight = ({ recentSearches, setRecentSearches }) => {
  return (
    <div className={style.recentSearches}>
      {
        recentSearches
          ? <div>
            <div className={style.title}>최근 검색 내역</div>
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
          </div>
          : null
      }
    </div>
  )
}


export default LayoutRight