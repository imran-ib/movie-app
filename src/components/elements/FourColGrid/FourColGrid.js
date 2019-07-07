import React from "react";
import uuid from "uuid/v4";
import "./FourColGrid.css";
import MovieThumb from "../MovieThumb/MovieThumb";

const FourColGrid = props => {
  const { movies, loading, searchItems, clickAble } = props;

  const MovieContent = movies.map(movie => (
    <div key={uuid()} className="col-3">
      <MovieThumb movie={movie} clickAble={clickAble} />
    </div>
  ));

  return (
    <div className="custom-container">
      <div>
        {searchItems && !loading && (
          <h1>
            {searchItems ? "Sarch Movies" : "Popular Movies"} Popular Movies
          </h1>
        )}
        <div className=" row custom-class">
          <div className="">{MovieContent}</div>
        </div>
      </div>
    </div>
  );
};

export default FourColGrid;
