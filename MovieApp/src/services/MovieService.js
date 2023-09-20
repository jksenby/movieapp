const MovieService = () => {
  const _apiBase = "https://api.themoviedb.org/3/movie/",
    _api_Key = "api_key=85569a59f98486c20457b4d061f63224";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getResource = async (property, i) => {
    try {
      const url = `${_apiBase}${property}?${_api_Key}${i}`;
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const getAllMovies = async (i = "&page=1") => {
    const movies = await getResource("popular", i);
    return movies.results.map(_transformMovies);
  };
  const getMovie = async (id) => {
    const movie = await getResource(id, "");
    return _transformMovies(movie);
  };
  const _transformMovies = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      rating: movie.vote_average,
      language: movie.original_language,
      thumb: movie.poster_path,
      genres: movie.genres,
    };
  };
  return { getAllMovies, getMovie };
};

export default MovieService;
