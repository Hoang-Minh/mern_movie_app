import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CardMedia,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getListOfFavMovies1, deleteFavoriteMovie1 } from "../actions";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "./Config";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        backgroundColor: "#eaeaea",
      },
    },
  },
});

const FavoriteMovies = () => {
  const favMovies = useSelector((state) => state.favMovies);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getListOfFavMovies1(dispatch);
  }, []);

  const renderContent = () => {
    console.log(history);
    if (favMovies.length === 0) return <div>No fav movies</div>;
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <TableContainer style={{ marginTop: "2rem" }} component={Paper}>
            <Table aria-label="movie info table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Plot</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {favMovies.map((movie, index) => {
                  const { title, poster, plot, movieId } = movie;
                  return (
                    <Fragment key={index}>
                      <TableRow>
                        <TableCell align="center">{title}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() =>
                              deleteFavoriteMovie1(movieId, dispatch)
                            }
                          >
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <CardMedia
                            component="img"
                            src={`${IMAGE_BASE_URL}/${IMAGE_SIZE}${poster}`}
                          ></CardMedia>
                        </TableCell>
                        <TableCell align="left">{plot}</TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </Fragment>
    );
  };

  return <div>{renderContent()}</div>;
};

export default FavoriteMovies;
