import "./sidePanel.scss";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Spinner from "../Spinner/Spinner";

import MovieService from "../../services/MovieService";
import { useState, useEffect } from "react";

const SidePanel = ({ movieId = 968051 }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const { getMovie } = MovieService();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMovie(movieId).then((res) => {
      setMovieInfo(res);
      setLoading(false);
    });
    setLoading(true);
    // eslint-disable-next-line
  }, [movieId]);
  function getGenres(genre) {
    if (typeof genre.genres === "object") {
      const items = genre.genres.map((item, i) => {
        return (
          <li tabIndex={0} key={item.id} className="genres">
            <Button variant="danger">{item.name} </Button>{" "}
          </li>
        );
      });

      return <ul style={{ display: "-ms-grid", margin: 0 }}>{items}</ul>;
    }
  }
  const spinner = loading ? <Spinner /> : null;
  const view = loading ? null : (
    <View movieInfo={movieInfo} getGenres={getGenres} />
  );
  return (
    <>
      {spinner} {view}
    </>
  );
};

const View = ({ movieInfo, getGenres }) => {
  return (
    <div className="body">
      <Card style={{ width: "100%", margin: 0 }}>
        <Card.Img
          variant="top"
          src={`http://image.tmdb.org/t/p/w500${movieInfo.thumb}`}
        />
        <Card.Body>
          <Card.Title>{movieInfo.title}</Card.Title>
          <Card.Text>{movieInfo.overview}</Card.Text>
        </Card.Body>
        <ListGroup
          className="list-group-flush"
          style={{ marginTop: "auto", marginBottom: "auto", paddingLeft: 0 }}
        >
          {getGenres(movieInfo)}
        </ListGroup>
        <Card.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              Watch the Movie
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SidePanel;
