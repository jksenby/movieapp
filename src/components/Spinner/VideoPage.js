import "./videoPage.scss";

import MovieService from "../../services/MovieService";
import { useEffect, useState } from "react";

const VideoPage = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const { getMovie } = MovieService();
  const id = +window.location.href.slice(22, 28);
  useEffect(() => {
    getMovie(id).then((res) => setVideoInfo(res));
  }, [id]);
  return (
    <div className="page">
      <div style={{ display: "inline-block" }}>
        <img
          src={`http://image.tmdb.org/t/p/w500${videoInfo.thumb}`}
          alt={videoInfo.name}
        />
      </div>
      <div style={{ display: "inline-block", width: "30%" }}>
        <h1>{videoInfo.title}</h1>
        <h2 style={{ color: "yellow" }}>{videoInfo.rating}/10</h2>
        <p>{videoInfo.overview}</p>
      </div>
    </div>
  );
};

export default VideoPage;
