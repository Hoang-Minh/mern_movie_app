import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import Image from "material-ui-image";
import { connect } from "react-redux";
import { getListOfFavMovies, deleteFavoriteMovie } from "../actions";
import { IMAGE_BASE_URL, AVATAR_SIZE } from "./Config";
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

class FavoriteMovies extends React.Component {
  componentDidMount = () => {
    this.props.getListOfFavMovies();
  };

  renderContent = () => {
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
                {this.props.favMovies.map((movie, index) => {
                  const { title, poster, plot, movieId } = movie;
                  return (
                    <Fragment key={index}>
                      <TableRow>
                        <TableCell align="center">{title}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() =>
                              this.props.deleteFavoriteMovie(movieId)
                            }
                          >
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                          </Button>
                        </TableCell>
                        <TableCell
                          style={{ height: 150, width: 150 }}
                          align="center"
                        >
                          <Image
                            src={`${IMAGE_BASE_URL}/${AVATAR_SIZE}${poster}`}
                          ></Image>
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

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    favMovies: state.favMovies,
  };
};

export default connect(mapStateToProps, {
  getListOfFavMovies,
  deleteFavoriteMovie,
})(FavoriteMovies);
