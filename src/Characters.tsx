import MUIDataTable from "mui-datatables"
import { useMemo } from "react"
import SexeIcon from "./SexeIcon"
import { useGetActorsQuery } from "./services/actors"
import type { Actor } from "./services/actors"
import {
  useDeleteCharacterMutation,
  useGetCharactersQuery,
} from "./services/characters"
import type { Gender } from "./services/directors"
import { useGetMoviesQuery } from "./services/movies"
import type { Movie } from "./services/movies"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export default function Characters() {
  const { data: characters } = useGetCharactersQuery()
  const { data: movies } = useGetMoviesQuery()
  const { data: actors } = useGetActorsQuery()
  const [remove] = useDeleteCharacterMutation()

  const datas = useMemo(() => {
    if (!characters || !movies || !actors) return []
    return characters?.map(character => {
      return {
        ...character,
        movie: movies?.find(movie => movie.id === character.movie),
        actor: actors?.find(actor => actor.id === character.actor),
        edit: (
          <Link to={"/character/" + character.id}>
            <Button variant="contained">
              <EditIcon />
            </Button>
          </Link>
        ),
        delete: (
          <Button variant="contained" onClick={() => remove(character.id)}>
            <DeleteIcon />
          </Button>
        ),
      }
    })
  }, [characters, movies, actors])

  const columns = [
    {
      name: "name",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "gender",
      label: "Sexe",
      options: {
        customBodyRender: (value: Gender) => <SexeIcon sexe={value} />,
        filter: true,
        sort: true,
      },
    },
    {
      name: "order",
      label: "Ordre",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "profilePath",
      label: "Photo",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => (
          <img
            src={`https://image.tmdb.org/t/p/w500${value}`}
            alt="profile"
            style={{ width: 100 }}
          />
        ),
      },
    },
    {
      name: "actor",
      label: "Acteur",
      options: {
        customBodyRender: (value: Actor) => value.name,
        filter: false,
        sort: false,
      },
    },
    {
      name: "movie",
      label: "Film",
      options: {
        customBodyRender: (value: Movie) => value.title,
        filter: false,
        sort: true,
      },
    },
    {
      name: "edit",
      label: "Modifier",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "delete",
      label: "Supprimer",
      options: {
        filter: false,
        sort: true,
      },
    },
  ]

  return (
    <MUIDataTable
      title={"Personnages"}
      data={datas || []}
      columns={columns}
      options={{
        selectableRows: "none",
        print: false,
        download: false,
        customToolbar(data) {
          return (
            <Link to="/character">
              <Button variant="contained">Créer un personnage</Button>
            </Link>
          )
        },
      }}
    />
  )
}
