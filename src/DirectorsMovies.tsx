import { Grid, Skeleton } from "@mui/material"
import { useGetDirectorMoviesQuery } from "./services/directors"
import type { Director } from "./services/directors"
import MovieCard from "./MovieCard"
import { Alert } from "@mui/material"

export default function DirectorsMovies({
  director: { id },
}: {
  director: Director
}) {
  const { data, isFetching, isError } = useGetDirectorMoviesQuery(id)

  if (isFetching) {
    return <Skeleton variant="rectangular" width={210} height={118} />
  }

  if (isError || !data) {
    return <Alert severity="error">An error occurred</Alert>
  }

  return (
    <Grid container spacing={2} p={1} width={"100%"}>
      {data.map(movie => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}
