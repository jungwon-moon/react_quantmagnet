import style from "./SortTable.module.scss"
import React from "react";
import {
  faAngleLeft, faAngleDoubleLeft,
  faAngleRight, faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTable, useSortBy, usePagination } from "react-table";


const SortTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1, pageSize: 20 },
    },
    useSortBy,
    usePagination
  )
  return (
    <div className={style.area}>
      <select
        className={style.select}
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

      <div className={style.tableOver}>
        <table
          className={style.table}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    className={`${style.header} ${style[column.class]}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      className={`${style[cell.column.class + "Td"]}`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={style.pagination}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} className={style.button}
          onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        <FontAwesomeIcon icon={faAngleLeft} className={style.button}
          onClick={() => previousPage()} disabled={!canPreviousPage} />

        <span className={style.span}>
          Page
          <input
            className={style.input}
            type="text"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
          of {pageOptions.length}
        </span>

        <FontAwesomeIcon icon={faAngleRight} className={style.button}
          onClick={() => nextPage()} disabled={!canNextPage} />
        <FontAwesomeIcon icon={faAngleDoubleRight} className={style.button}
          onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />

      </div>

    </div>

  )
}

export default SortTable