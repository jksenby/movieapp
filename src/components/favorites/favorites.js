import { Card, Button } from "react-bootstrap";
import { useGetFavoriteMovieQuery } from "../../api/api";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

import "./favorites.css";
const Favorites = () => {
  const { data: movies } = useGetFavoriteMovieQuery();
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      if (i === 0) {
        return null;
      }
      return (
        <li tabIndex={0} key={item.id} className="favorite_list">
          <Card style={{ width: "12rem" }}>
            <Card.Img
              variant="top"
              alt={item.name}
              src={`http://image.tmdb.org/t/p/w500${item.thumb}`}
            />
          </Card>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.overview}</Card.Text>
            <Link to={`/${item.id}/videos`}>
              <Button variant="outline-primary">Watch</Button>
            </Link>{" "}
            | {item.rating}
            /10
          </Card.Body>
        </li>
      );
    });
    return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  }
  let items = <Spinner />;
  if (movies && movies.length > 0) {
    items = renderItems(movies);
  }
  return <>{items}</>;
};

export default Favorites;
