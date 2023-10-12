import { useState } from "react";
import MovieList from "../MovieList/MovieList";
import MovieInfo from "../movieInfo/MovieInfo";

const MovieListPage = ({ handleVideo, search }) => {
  const [movieId, setMovieId] = useState(565770);
  const handleChange = (movieId) => {
    setMovieId(movieId);
  };
  const sideWindow = movieId ? <MovieInfo movieId={movieId} /> : null;
  return (
    <div>
      <MovieList
        handleChange={handleChange}
        handleVideo={handleVideo}
        search={search}
      />
      {sideWindow}
    </div>
  );
};

export default MovieListPage;
