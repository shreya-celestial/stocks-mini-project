import { data } from "../assets/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

const FIRSTPAGEDATA = data.filter((data) => data.id <= 10);

const TableData: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pagedData, setPagedData] = useState(FIRSTPAGEDATA);
  const count = Math.round(data.length / 10);
  const handleChange = (event: any, value: number) => {
    const dataForPage = data.filter(
      (data) => data.id > 10 * (value - 1) && data.id <= 10 * value
    );
    setPagedData(dataForPage);
    setPage(value);
  };

  return (
    <TableContainer component={Paper}>
      <h2 style={{ textDecoration: "underline" }}>NSE STOCKS</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "800" }}>Id</TableCell>
            <TableCell sx={{ fontWeight: "800" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "800" }}>Ticker</TableCell>
            <TableCell sx={{ fontWeight: "800" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pagedData.map((company) => (
            <TableRow
              key={company.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.ticker}</TableCell>
              <TableCell align="right">
                <Link to={`/${company.ticker}`}>View More</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        spacing={2}
        sx={{
          margin: "20px auto",
          width: "30%",
        }}
      >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
    </TableContainer>
  );
};

export default TableData;
