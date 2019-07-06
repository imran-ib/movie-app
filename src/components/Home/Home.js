import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import { API_KEY, API_URL } from "../../config";
import Header from "../elements/Header/Header";

const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [searchITerm, setSearchTerm] = useState("");

  const fetchData = endpoint => {
    Axios.get(endpoint).then(res => {
      setMovies([...movies, ...res.data.results]);
      setHeroImage(heroImage || res.data.results[0]);
      setLoading(false);
      setCurrentPage(res.data.page);
      settotalPages(res.data.total_pages);
    });
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    if (searchITerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
        1}`;
    } else {
      endpoint = `${API_URL}search/movie/popular?api_key=${API_KEY}&language=en-US&query=${searchITerm}&page=${currentPage +
        1}`;
    }
    fetchData(endpoint);
  };

  useEffect(() => {
    fetchData(endpoint);
    //  FirstTenMovies(endpoint);
    setLoading(true);
  }, []);
  if (loading) return <Spinner />;

  return (
    <div className="rmdb-home">
      {!loading && heroImage && (
        <>
          <Header />
          <HeroImage />
          <SearchBar />
          <FourColGrid />
          <MovieThumb />
          <LoadMoreBtn />
          <button onClick={loadMoreItems}>LoadMore</button>
        </>
      )}
    </div>
  );
};

export default Home;
