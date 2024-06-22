import { Alert, Grid, Skeleton } from "@mui/material"
import MovieCard from "./MovieCard"
import { useGetMoviesQuery } from "./services/movies"

const Movies = () => {
  const { data, isFetching, isError } = useGetMoviesQuery()

  if (isFetching) {
    return (
      <Grid container spacing={2} p={1} justifyContent={"space-evenly"}>
        {Array.from({ length: 25 }).map((_, index) => (
          <Grid item key={index}>
            <Skeleton variant="rectangular" width={210} height={118} />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (isError || !data) {
    return <Alert severity="error">Une erreur est survenue</Alert>
  }

  return (
    <div className="App">
      <Grid container spacing={2} p={1} justifyContent={"space-evenly"}>
        {data.map(movie => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Movies
