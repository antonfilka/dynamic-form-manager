import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import { useTable, useSortBy } from "react-table";
import { api, API_URL } from "../../http/serverAPI";
import { emptyDefaultValues } from "../../DataModels/DataModels";

const Table = (props) => {
  useEffect(() => {
    api
      .get(`${API_URL}/getcars`)
      .then((responce) => props.setTableData(responce.data))
      .catch((errors) => console.log(errors));
  }, []);

  const navigate = useNavigate();

  const data = React.useMemo(() => props.tableData);
  const columns = props.columnsData;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const createButtonHandler = () => {
    props.setCreateData(emptyDefaultValues);
    props.setEditMode(false);
    navigate("/create");
  };

  return (
    <>
      <button className={styles.link} onClick={() => createButtonHandler()}>
        ➕ Creaty new entry
      </button>
      <div className={styles.tablewrapper}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
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
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
