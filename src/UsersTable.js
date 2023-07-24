import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";

const UsersTable = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "name", headerName: "User Name", width: 200 },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
      sortable: false,
    },
    { field: "address", headerName: "Address", width: 200, sortable: false },
  ];

  const fetchAndShapeData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      const users = response.data;
      const tableRows = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address.street,
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

  const navigateToUser = () => {
    console.log("navigate!");
  };

  const getRowClassName = (params) => {
    return "table-row"; // CSS class name for rows with pointer cursor on hover
  };

  return (
    <Paper elevation={2} sx={{ m: 5, width: "fit-content" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick={true} // Disable row selection
        checkboxSelection={false} // Disable checkbox selection
        onRowClick={navigateToUser} // Handle row click event
        disableColumnMenu // Disable column menu
        disableColumnSelector // Disable column selector
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4]}
        size="large"
      />
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "lightblue" }}>
              {headerNames.map((name, index) => (
                <TableCell
                  width={"50px"}
                  sx={{
                    borderRight: "1px solid whitesmoke",
                    fontWeight: 700,
                  }}
                  key={index}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigateToUser(user.id);
                }}
              >
                <TableCell className="table-cell">{user.name}</TableCell>
                <TableCell className="table-cell">{user.email}</TableCell>
                <TableCell className="table-cell">
                  {user.address.street}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Paper>
  );
};

export default UsersTable;
