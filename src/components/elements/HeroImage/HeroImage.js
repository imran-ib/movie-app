import React, { useState, useEffect } from "react";
import Axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroImage.css";
import {
  API_KEY,
  API_URL,
  BACKDROP_SIZE,
  IMAGE_BASE_URL
} from "../../../config";

const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
// For Slider
const settings = {
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  adaptiveHeight: true,
  touchMove: true
  // afterChange: index => alert("change")
};

const HeroImage = () => {
  const [firstTenMovies, setfirstTenMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const FirstTenMovies = async endpoint => {
    const result = await Axios.get(endpoint);
    const firstTenMovies = result.data.results.slice(0, 10);
    setfirstTenMovies(firstTenMovies);
    setLoading(false);
  };

  useEffect(() => {
    FirstTenMovies(endpoint);
    setLoading(true);
  }, []);
  return (
    <Slider {...settings}>
      {!loading &&
        firstTenMovies &&
        firstTenMovies.map(movie => (
          <div key={movie.id}>
            <div
              className="rmdb-heroimage"
              style={{
                background: `linear-gradient(15deg, #000 10%,rgba(255, 255, 255, 0.3) 80%), 
                url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`,
                posistion: "fixed"
              }}
            >
              {/* <img
                src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`}
                alt="Hero Image"
              /> */}
            </div>
            <div className="rmdb-heroimage-content">
              <div className="rmdb-heroimage-text">
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default HeroImage;
