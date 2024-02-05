import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Chart } from "react-google-charts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Carousel from "./Carousel";

const Stock: React.FC = () => {
  const { ticker } = useParams();
  const data = useFetch(ticker);

  if (typeof data === "string") {
    return (
      <Container component={Paper} sx={{ padding: "10px 0 40px" }}>
        <h1 className="status">{data}</h1>
      </Container>
    );
  }

  const graph = data?.response?.graph
    ? [
        ["", ""],
        ...data?.response?.graph?.map(
          (point: { date: Date; price: number }) => {
            return [
              new Date(point?.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              }),
              point?.price,
            ];
          }
        ),
      ]
    : [];

  const title = `${data?.response?.search_parameters?.q} for ${data?.response?.summary?.price}`;

  const options = {
    chart: {
      title: title,
      subtitle: data?.response?.summary?.extensions[0],
    },
    colors: ["green"],
  };

  const IMAGES = data?.response?.news_results?.filter((img: any) =>
    img?.title ? false : true
  );

  return (
    <Container component={Paper} sx={{ padding: "10px 0 40px" }}>
      <Carousel images={IMAGES} />
      <h1>{data?.response?.summary?.title}</h1>
      {!data?.response?.graph ? (
        ""
      ) : (
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={graph}
          options={options}
          style={{ marginBottom: "50px" }}
        />
      )}
      <h3>Stats</h3>
      <Table
        sx={{ minWidth: 650, margin: "0 0 40px" }}
        aria-label="simple table"
      >
        <TableBody>
          {data?.response?.knowledge_graph?.key_stats?.stats?.map(
            (stat: { label: string; value: string }, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {stat?.label}
                </TableCell>
                <TableCell align="right">{stat?.value}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <h3>About</h3>
      <p>{data?.response?.knowledge_graph?.about[0]?.description?.snippet}</p>
      <Table
        sx={{ minWidth: 650, margin: "0 0 40px" }}
        aria-label="simple table"
      >
        <TableBody>
          {data?.response?.knowledge_graph?.about[0]?.info.map(
            (stat: { label: string; value: string }, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {stat?.label}
                </TableCell>
                <TableCell align="right">{stat?.value}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <h3>
        {data?.response?.financials?.length > 0
          ? data?.response?.financials[0]?.title
          : ""}
      </h3>
      <Table
        sx={{ minWidth: 650, margin: "0 0 40px" }}
        aria-label="simple table"
      >
        <TableBody>
          {data?.response?.financials?.length > 0
            ? data?.response?.financials[0]?.results[0]?.table?.map(
                (stat: { title: string; value: string }, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {stat?.title}
                    </TableCell>
                    <TableCell align="right">{stat?.value}</TableCell>
                  </TableRow>
                )
              )
            : ""}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Stock;
