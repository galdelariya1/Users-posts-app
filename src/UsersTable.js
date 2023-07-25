import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";

const UsersTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { field: "name", headerName: "User Name", width: 250 },
    {
      field: "email",
      headerName: "Email Address",
      width: 250,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
      sortable: false,
    },
  ];

  const fetchAndShapeData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      const users = response.data;
      const tableRows = users.map((user) => {
        const address = user.address;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          address: `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`,
        };
      });
      setRows(tableRows);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAndShapeData();
  }, []);

  const navigateToUser = (params) => {
    const userId = params.row.id;
    navigate(`/posts/${userId}`);
  };

  const getRowClassName = (params) => {
    return "table-row";
  };

  return (
    <Paper elevation={2} sx={{ m: 5, width: "fit-content" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick={true}
        checkboxSelection={false}
        onRowClick={navigateToUser}
        disableColumnMenu
        disableColumnSelector
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4]}
        sx={{ fontSize: "16px" }}
      />
    </Paper>
  );
};

export default UsersTable;
