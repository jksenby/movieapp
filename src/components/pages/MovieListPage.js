import { useState } from "react";
import MovieList from "../MovieList/MovieList";
import SidePanel from "../SidePanel/SidePanel";

const MovieListPage = ({ handleVideo, search }) => {
  const [sidePanel, setSidePanel] = useState(565770);
  const handleChange = (sidePanelId) => {
    setSidePanel(sidePanelId);
  };
  const sideWindow = sidePanel ? <SidePanel movieId={sidePanel} /> : null;
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
