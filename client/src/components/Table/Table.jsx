import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import { useTable, useSortBy } from "react-table";
import { api, API_URL } from "../../http/serverAPI";
import { emptyDefaultValues } from "../../DataModels/DataModels";

const Table = ({
  createData,
  setCreateData,
  tableData,
  setTableData,
  columnsData,
  setEditMode,
}) => {
  useEffect(() => {
    api
      .get(`${API_URL}/getcars`)
      .then((responce) => setTableData(responce.data))
      .catch((errors) => console.log(errors));
  }, []);

  const navigate = useNavigate();

  const data = React.useMemo(() => tableData);
  const columns = columnsData;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const createButtonHandler = () => {
    setCreateData(emptyDefaultValues);
    setEditMode(false);
    navigate("/create");
  };

  return (
    <>
      <button className={styles.link} onClick={createButtonHandler}>
        ➕ Creaty new entry
      </button>
      <div className={styles.tablewrapper}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restHeaderProps } = column.getHeaderProps(
                      column.getSortByToggleProps()
                    );
                    return (
                      <th
                        key={key}
                        {...restHeaderProps}
                        style={{
                          background: "rgb(255, 255, 240)",
                          borderRadius: "10px",
                          padding: "10px",
                          color: "black",
                          fontWeight: "bold",
                          columnGap: "20px",
                        }}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔼"
                              : " 🔽"
                            : ""}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        style={{
                          padding: "10px",
                          background: "aliceblue",
                          borderRadius: "20px",
                          textAlign: "center",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
