import { Alert, Grid, Skeleton } from "@mui/material"
import MovieCard from "./MovieCard"
import { useGetActorMoviesQuery } from "./services/actors"
import type { Actor } from "./services/actors"

export default function ActorsMovies({ actors: { id } }: { actors: Actor }) {
  const { data, isFetching, isError } = useGetActorMoviesQuery(id)

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
