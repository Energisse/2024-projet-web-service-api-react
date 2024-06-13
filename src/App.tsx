import { Grid } from "@mui/material"
import "./App.css"
import MovieCard from "./MovieCard"
import { useGetMoviesQuery } from "./services/movies"

const App = () => {
  const { data, isFetching, isLoading, isSuccess } = useGetMoviesQuery()

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Fetching...</p>}
      {isSuccess && data && (
        <Grid container spacing={2} p={1}>
          {data.map(movie => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default App
