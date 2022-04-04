import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Table from "./components/Table/Table";
import Create from "./components/Create/Create";
import Welcome from "./components/WelcomePage/Welcome";
import { filledDefaultValues } from "./DataModels/DataModels";
import { formatToShow } from "./formatters/formatToSend";

const App = () => {
  const navigate = useNavigate();
  const [createData, setCreateData] = useState(filledDefaultValues);
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const editButtonHandler = (id) => {
    const entity = tableData.filter((item) => item.id == id);
    console.log("entity: ", entity);
    setCreateData(formatToShow(entity));
    setEditMode(true);
    console.log(createData);
    navigate("/create");
  };

  const columnsData = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Car name",
      accessor: "carName",
    },
    {
      Header: "Owner name",
      accessor: "carOwnerName",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Car weight",
      accessor: "carWeight",
    },
    {
      Header: "Car color",
      accessor: "carColor",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Exchamge interest",
      accessor: "exchangeName",
    },
    {
      Header: "Price range",
      accessor: "priceRange",
    },
    {
      Header: "Edit",
      Cell: (original) => (
        <button
          onClick={() => {
            console.log(original.row.original.id);
            editButtonHandler(original.row.original.id);
          }}
        >
          ✏️
        </button>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <Table
                className={styles.table}
                createData={createData}
                setCreateData={setCreateData}
                tableData={tableData}
                setTableData={setTableData}
                columnsData={columnsData}
                setEditMode={setEditMode}
              />
            }
          />
          <Route
            path="/create"
            element={
              <Create
                createData={createData}
                setCreateData={setCreateData}
                editMode={editMode}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
