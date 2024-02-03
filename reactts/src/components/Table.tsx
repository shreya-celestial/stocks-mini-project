import { data } from "../assets/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import React from "react";

const TableData: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <h2 style={{ textDecoration: "underline" }}>NSE STOCKS</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "800" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "800" }}>Id</TableCell>
            <TableCell sx={{ fontWeight: "800" }}>Ticker</TableCell>
            <TableCell sx={{ fontWeight: "800" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company) => (
            <TableRow
              key={company.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {company.name}
              </TableCell>
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.ticker}</TableCell>
              <TableCell align="right">
                <Link to={`/${company.ticker}`}>View More</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
