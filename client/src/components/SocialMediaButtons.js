import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

const SocialMediaButtons = ({ path }) => {
  const url = `${process.env.REACT_APP_REDIRECT_ENDPOINT}${path}`;
  console.log(url);
  return (
    <FacebookShareButton url={url}>
      <FacebookIcon round={true}></FacebookIcon>
    </FacebookShareButton>
  );
};

export default SocialMediaButtons;
