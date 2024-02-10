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
import React, { useContext, useState } from "react";
import UserContext from "../store/UserContext";

const FIRSTPAGEDATA = data.filter((data) => data.id <= 10);

const TableData: React.FC = () => {
  const { user } = useContext(UserContext);
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
      <Table
        sx={{ width: "90%", margin: "10px auto 0" }}
        aria-label="simple table"
      >
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
                {user && <Link to={`/${company.ticker}`}>View More</Link>}
                {!user && (
                  <span
                    onClick={() => alert("Login to view more!")}
                    style={{ color: "#d3d3d3", cursor: "pointer" }}
                  >
                    View More
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        spacing={2}
        sx={{
          margin: "20px auto 40px",
          width: "fit-content",
        }}
      >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
    </TableContainer>
  );
};

export default TableData;
