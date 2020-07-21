import React, { Fragment, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box, Typography } from "@material-ui/core";
import { API_KEY, API_URL } from "./Config";

function Trailer({ pathname }) {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetchTrailer();
  }, []);

  const fetchTrailer = async () => {
    const endpoint = `${API_URL}${pathname}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get(endpoint);
    const { data } = response;
    setTrailer(data.results[0]);
  };

  const renderTrailer = () => {
    if (!trailer) return null;
    const { key } = trailer;

    return (
      <Fragment>
        <Typography
          align="left"
          display="block"
          variant="button"
          style={{ margin: "2rem auto" }}
          gutterBottom
        >
          Trailer
        </Typography>
        <Box display="flex">
          <Box m="auto">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${key}`}
              controls
            />
          </Box>
        </Box>
      </Fragment>
    );
  };

  return <div>{renderTrailer()}</div>;
}

export default Trailer;
