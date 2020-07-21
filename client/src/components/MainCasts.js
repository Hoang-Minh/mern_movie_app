import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "./Config";

function MainCasts({ pathname }) {
  const [casts, setCasts] = useState(null);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    const endpoint = `${API_URL}${pathname}/credits?api_key=${API_KEY}&language=en-US`;
    console.log("endpoint", endpoint);
    const response = await axios.get(endpoint);
    const { data } = response;
    console.log("Credit", data.cast);
    setCasts(data.cast);
  };

  const renderCastImage = () => {
    return casts.slice(0, 6).map((cast, index) => {
      const imageUrl = `${IMAGE_BASE_URL}/w500${cast.profile_path}`;

      return (
        <Grid key={index} md={2} xs={3} item>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                title={cast.name}
              ></CardMedia>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  };

  const renderCast = () => {
    return (
      casts && (
        <Fragment>
          <Typography
            align="left"
            display="block"
            variant="button"
            style={{ margin: "2rem 0 auto" }}
            gutterBottom
          >
            Main Cast:
          </Typography>
          <Grid
            container
            diretion="row"
            spacing={1}
            style={{ marginBottom: "3rem" }}
          >
            {renderCastImage()}
          </Grid>
        </Fragment>
      )
    );
  };

  return <div>{renderCast()}</div>;
}

export default MainCasts;
