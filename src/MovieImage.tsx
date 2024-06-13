import type { Movie } from "./services/movies"

export default function MovieImage({
  movie,
  type,
  ...props
}: {
  movie: Movie
  type?: "backdrop" | "poster"
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={`https://image.tmdb.org/t/p/original${(type || "poster") === "poster" ? movie.posterPath : movie.backdropPath}`}
      alt={movie.title}
      {...props}
    />
  )
}
