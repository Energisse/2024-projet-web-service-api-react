import { useParams } from "react-router-dom"
import MovieImage from "./MovieImage"
import { useGetMovieByIdQuery } from "./services/movies"

export default function Movie() {
  const { id } = useParams()

  const { data } = useGetMovieByIdQuery(+id!)

  return (
    <div>
      {data && (
        <>
          <MovieImage movie={data} width={150} height={150} />
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <strong>{key}</strong>: {value}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
