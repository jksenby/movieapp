import "./movieList.css";
import MovieService from "../../services/MovieService";
import Spinner from "../Spinner/Spinner";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const MovieList = ({ handleChange, handleVideo, search }) => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { getAllMovies } = MovieService();
  useEffect(() => {
    getAllMovies().then((res) => {
      setMovieList(res);
      setLoading(false);
    });
    setLoading(true);
  }, []);

  const onMovieLoaded = (newMovieList) => {
    setPage((page) => page + 1);
    setMovieList((movieList) => [...movieList, ...newMovieList]);
    setLoading(false);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li
          tabIndex={0}
          key={item.id}
          onClick={() => {
            handleChange(item.id);
          }}
        >
          <Card style={{ width: "12rem", margin: "50px" }}>
            <Card.Img
              variant="top"
              alt={item.name}
              src={`http://image.tmdb.org/t/p/w500${item.thumb}`}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.overview.slice(0, 100)}
                {item.overview.length > 30 ? "..." : null}
              </Card.Text>
              <Link to={`/${item.id}/videos`}>
                <Button
                  variant="outline-primary"
                  onClick={() => handleVideo(item.id)}
                >
                  Watch
                </Button>
              </Link>{" "}
              | {item.rating}
              /10
            </Card.Body>
          </Card>
        </li>
      );
    });

    return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  }
  const items = renderItems(
    movieList.filter((item, i) => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) return item;
    })
  );
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="list">
      {items}
      {spinner}
      <Button
        variant="dark"
        style={{ display: "block" }}
        onClick={() => {
          getAllMovies(`&page=${page}`).then(onMovieLoaded);
          setLoading(true);
        }}
      >
        Load more...{" "}
      </Button>
    </div>
  );
};

export default MovieList;
