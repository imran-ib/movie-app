import React, { useState, useEffect, useReducer } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

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
    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
        1}`;
    } else {
      endpoint = `${API_URL}search/movie/popular?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage +
        1}`;
    }
    fetchData(endpoint);
  };

  useEffect(() => {
    fetchData(endpoint);
    //  FirstTenMovies(endpoint);
    searchItems();
    setLoading(true);
  }, []);

  const searchItems = searchTerm => {
    //1. create empty endpoint
    let endpoint = "";
    // 2. Clear the component State
    setMovies([]);
    // setLoading(true);
    setSearchTerm("");
    //3. see if there is search term then fetch the movies
    if (searchTerm === "") {
      // if there is no search term fetch popular movies
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      // otherwise fetch movies with seatch term queries
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    // call fetchData with endpoint
    fetchData(endpoint);
  };

  if (loading) return <Spinner />;

  return (
    <div className="rmdb-home">
      {!loading && heroImage && (
        <>
          <Header />
          <HeroImage />
          <SearchBar callBackFunc={searchItems} />
          <FourColGrid
            movies={movies}
            loading={loading}
            searchItems={searchTerm}
            clickAble={true}
          />
          <LoadMoreBtn />
          <button onClick={fetchData}>LoadMore</button>
        </>
      )}
    </div>
  );
};

export default Home;
