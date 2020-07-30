import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid } from "@material-ui/core";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "../Config";
// import MovieRating from "../MovieRating";
import styles from "./MovieBanner.module.css";

const MovieBanner = ({ showContent, movie }) => {
  console.log("show content from movie banner", showContent);
  const image = `${IMAGE_BASE_URL}/${IMAGE_SIZE}${movie.backdrop_path}`;
  const { title, overview } = movie;

  const renderContent = () => {
    console.log("reload render Content");
    if (showContent) {
      return (
        <div className={styles.container}>
          <Paper
            className={styles.mainFeaturedPost}
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: "none" }}
                src={image}
                alt="main movie poster"
              ></img>
            }
            <div className={styles.overlay} />
            <Grid container>
              <Grid item md={6} xs={12}>
                <div className={styles.mainFeaturedPostContent}>
                  <Typography component="h2" color="inherit" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {overview}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    } else {
      return (
        <Paper
          className={styles.mainFeaturedPost}
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src={image}
              alt="main movie poster"
            ></img>
          }
          <div className={styles.overlay} />
          <Grid container>
            <Grid item md={6} xs={12}>
              <div className={styles.mainFeaturedPostContent}></div>
            </Grid>
          </Grid>
        </Paper>
      );
    }
  };

  return <div className={styles.container}>{renderContent()}</div>;
};

export default MovieBanner;

MovieBanner.propTypes = {
  post: PropTypes.object,
};
