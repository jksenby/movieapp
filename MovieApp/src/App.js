import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import Spinner from "./components/Spinner/Spinner";

import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const MovieListPage = lazy(() => import("./components/pages/MovieListPage")),
  VideoPlayerPage = lazy(() => import("./components/pages/VideoPlayerPage")),
  SearchBar = lazy(() => import("./components/SearchBar/SearchBar"));
function App() {
  const [videoId, setVideoId] = useState(null);
  const handleVideo = (value) => {
    setVideoId(value);
  };
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className="App">
      <Router>
        <div className="app">
          <AppHeader handleSearch={handleSearch} />
          <main>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MovieListPage handleVideo={handleVideo} search={search} />
                  }
                ></Route>
                <Route
                  path={`/:${videoId}/videos`}
                  element={<VideoPlayerPage />}
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
