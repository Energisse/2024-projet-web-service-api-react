import { Alert, Grid, Skeleton } from "@mui/material"
import "./App.css"
import MovieCard from "./MovieCard"
import { useGetMoviesQuery } from "./services/movies"

const App = () => {
  const { data, isFetching, isError } = useGetMoviesQuery()

  if (isFetching) {
    return <Skeleton variant="rectangular" width={210} height={118} />
  }

  if (isError || !data) {
    return <Alert severity="error">An error occurred</Alert>
  }

  return (
    <div className="App">
      <Grid container spacing={2} p={1}>
        {data.map(movie => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default App
