import React from "react";
import Grid from "@mui/material/Grid";
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
import testdata from "../assets/testData";

const Stock: React.FC = () => {
  const { ticker } = useParams();
  // const data = useFetch(ticker);
  const data = {
    response: testdata,
  };

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
          (point: { date: Date | string; price: number }) => {
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
    <Container sx={{ padding: "10px 0 40px", width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={11} sm={12}>
          <Carousel images={IMAGES} />
        </Grid>
      </Grid>
      <h1>{data?.response?.summary?.title}</h1>
      {!data?.response?.graph ? (
        ""
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={graph}
              options={options}
              style={{ marginBottom: "50px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>Stats</h3>
            <Table sx={{ margin: "0 0 40px" }} aria-label="simple table">
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
          </Grid>
        </Grid>
      )}
      {data?.response?.graph ? (
        ""
      ) : (
        <>
          <h3>Stats</h3>
          <Table sx={{ margin: "0 0 40px" }} aria-label="simple table">
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
        </>
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <h3>About</h3>
          <p>
            {data?.response?.knowledge_graph?.about[0]?.description?.snippet}
          </p>
          <Table sx={{ margin: "0 0 40px" }} aria-label="simple table">
            <TableBody>
              {data?.response?.knowledge_graph?.about[0]?.info.map(
                (stat: { label: string; value: string }, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textWrap: "wrap" }}
                    >
                      {stat?.label}
                    </TableCell>
                    <TableCell align="right" sx={{ textWrap: "wrap" }}>
                      {stat?.value}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <h3>
        {data?.response?.financials?.length > 0
          ? data?.response?.financials[0]?.title
          : ""}
      </h3>
      <Table sx={{ margin: "0 0 40px" }} aria-label="simple table">
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
