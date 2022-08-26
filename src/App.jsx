import MovieSearching from "./pages/MovieSearching";
import "./config/axios";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function App() {
  return (
    <>
      <MovieSearching />
    </>
  );
}

export default App;
