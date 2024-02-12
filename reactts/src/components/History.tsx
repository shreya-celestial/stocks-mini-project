import styles from "./modules/filters.module.css";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import moment from "moment";

const History = () => {
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState<any[] | null>(null);
  const [end, setEnd] = useState(new Date().toISOString().split("T")[0]);
  const [start, setStart] = useState("");

  const getData = async (startDate?: Date, endDate?: Date) => {
    try {
      let url = `http://localhost:8080/prices?email=${user?.email}`;
      if (startDate && endDate) {
        url = `http://localhost:8080/prices?email=${user?.email}&start=${startDate}&end=${endDate}`;
      } else if (startDate) {
        url = `http://localhost:8080/prices?email=${user?.email}&start=${startDate}`;
      } else if (endDate) {
        url = `http://localhost:8080/prices?email=${user?.email}&end=${endDate}`;
      }
      const response = await fetch(url);
      const filteredData = await response.json();

      if (filteredData?.status === "success") {
        setData(filteredData?.data);
        setLoader(false);
        return;
      }
      alert(filteredData?.msg);
      return;
    } catch (err) {
      alert("Something went wrong.. Please try again!");
    }
    return;
  };

  useEffect(() => {
    if (user) {
      getData();
      return;
    }
    alert("Please login first.");
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user) {
      const startDate = e.target.elements.start.value;
      const endDate = e.target.elements.end.value;
      setData(null);
      setLoader(true);
      getData(startDate, endDate);
      return;
    }
    alert("Please login first.");
  };

  return (
    <Container>
      <h1>History</h1>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Start Date"
          name="start"
          max={end}
          onChange={(e) => setStart(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <input
          type="text"
          placeholder="End Date"
          name="end"
          min={start ? start : undefined}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setEnd(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
        <Button variant="contained" type="submit" sx={{ marginLeft: "5px" }}>
          Filter
        </Button>
      </form>
      {loader && (
        <h2 className="status" style={{ marginTop: "150px" }}>
          Loading...
        </h2>
      )}
      {data && (
        <TableContainer>
          <Table
            sx={{ width: "90%", margin: "10px auto 0" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "800" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "800" }}>Ticker</TableCell>
                <TableCell sx={{ fontWeight: "800" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "800" }} align="right">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((record: any) => (
                  <TableRow
                    key={record?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{record?.stock?.name}</TableCell>
                    <TableCell>{record?.stock?.ticker}</TableCell>
                    <TableCell>{record?.price}</TableCell>
                    <TableCell align="right">
                      {moment(record?.created).format("MMMM Do YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default History;
