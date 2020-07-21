import React, { Fragment } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const MovieInfo = ({ movie }) => {
  console.log(movie);

  const {
    title,
    genres,
    status,
    runtime,
    release_date,
    revenue,
    budget,
    original_language,
    overview,
  } = movie;

  const renderGenres = () => {
    return genres.map((genre) => genre.name).join(", ");
  };

  const currencyFormatter = (value) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(value);
  };

  const renderTableInfo = () => {
    return (
      <Fragment>
        <Typography
          align="left"
          display="block"
          variant="button"
          style={{ marginTop: "1rem" }}
          gutterBottom
        >
          Movie Info
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="movie info table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Language</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Run time</TableCell>
                <TableCell align="center">Release Date</TableCell>
                <TableCell align="center">Budget</TableCell>
                <TableCell align="center">Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{title}</TableCell>
                <TableCell align="center">{original_language}</TableCell>
                <TableCell align="center">{status}</TableCell>
                <TableCell align="center">{runtime} mins</TableCell>
                <TableCell align="center">{release_date}</TableCell>
                <TableCell align="center">
                  {currencyFormatter(parseFloat(budget))}
                </TableCell>
                <TableCell align="center">
                  {currencyFormatter(parseFloat(revenue))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell variant="head" colSpan={1}>
                  Genres
                </TableCell>
                <TableCell colSpan={2}>{renderGenres()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell variant="head" colSpan={1}>
                  Plot
                </TableCell>
                <TableCell align="left" colSpan={4}>
                  {overview}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  };

  return <div>{renderTableInfo()}</div>;
};

export default MovieInfo;
