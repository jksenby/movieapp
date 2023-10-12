import "./videoPage.scss";

import MovieService from "../../services/MovieService";
import { useEffect, useState } from "react";
import Heart from "react-animated-heart";

import {
  useAddFavoriteMovieMutation,
  useGetFavoriteMovieQuery,
  useDeleteFavoriteMovieMutation,
} from "../../api/api";

const VideoPage = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const { getMovie } = MovieService();
  const id =
    window.location.href[28] === "/"
      ? +window.location.href.slice(22, 28)
      : +window.location.href.slice(22, 29);
  const [createAction] = useAddFavoriteMovieMutation();
  const { data: movies } = useGetFavoriteMovieQuery();
  const [deletePost] = useDeleteFavoriteMovieMutation();
  useEffect(() => {
    getMovie(id).then((res) => setVideoInfo(res));
    // eslint-disable-next-line
  }, [id]);

  let favor = "btn";

  const onClickHandler = (e) => {
    if (favor === "btn") {
      e.preventDefault();
      const movie = {
        id: id,
        name: videoInfo.title,
        overview: videoInfo.overview,
        thumb: videoInfo.thumb,
        rating: videoInfo.rating,
        genres: videoInfo.genres,
      };
      createAction(movie)
        .unwrap()
        .then(() => {})
        .then((error) => console.log(error));
    }
  };

  if (movies && movies.length > 0) {
    movies.forEach((item) => {
      if (item.id === id) {
        favor = "btn__clicked";
      }
    });
  }

  return (
    <div className="page">
      <div style={{ display: "inline-block" }}>
        <img
          src={`http://image.tmdb.org/t/p/w500${videoInfo.thumb}`}
          alt={videoInfo.title}
        />
      </div>
      <div style={{ display: "inline-block", width: "30%" }}>
        <h1>{videoInfo.title}</h1>
        <h2 style={{ color: "yellow" }}>
          {videoInfo.rating
            ? videoInfo.rating.toFixed(1)
            : "There is no information about rating"}
          /10
        </h2>
        <p>{videoInfo.overview}</p>
        <button
          className={favor}
          onClick={(e) => {
            if (favor === "btn__clicked") {
              return deletePost(videoInfo.id);
            } else {
              return onClickHandler(e);
            }
          }}
        >
          Favorite
          {/* <Heart /> */}
        </button>
      </div>
    </div>
  );
};
export default VideoPage;
