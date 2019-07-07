import React from "react";
import "./MovieThumb.css";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../../config";

// const image =`{element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}`

const MovieThumb = props => {
  const { movie, clickAble } = props;
  return (
    <div className="rmdb-moviethumb">
      <p>{movie.title}</p>;
      {clickAble ? (
        <img
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
          alt={movie.title}
        />
      ) : null}
    </div>
  );
};

export default MovieThumb;
