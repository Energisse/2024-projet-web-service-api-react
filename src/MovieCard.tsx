import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import type { Movie } from "./services/movies"
import { Link } from "react-router-dom"

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={movie.id.toString()}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  )
}
