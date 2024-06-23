import {
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  Typography,
  Grid,
  Button,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Gender } from "./services/directors"
import { useGetMoviesQuery } from "./services/movies"
import type { Movie } from "./services/movies"
import { useGetActorsQuery } from "./services/actors"
import type { Actor } from "./services/actors"
import {
  useCreateCharacterMutation,
  useLazyGetCharacterQuery,
  useUpdateCharacterMutation,
  type Characters,
} from "./services/characters"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

export default function FormCharacters() {
  const [getCharacter, character] = useLazyGetCharacterQuery()
  const navigate = useNavigate()

  const { data: movies } = useGetMoviesQuery()
  const { data: actors } = useGetActorsQuery()

  const { id } = useParams<{ id: string }>()

  const [create] = useCreateCharacterMutation()
  const [update] = useUpdateCharacterMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<
    Omit<Characters, "id" | "movie" | "actor"> & {
      movie: Movie | null
      actor: Actor | null
    }
  >({
    defaultValues: {
      movie: null,
      actor: null,
      gender: 1,
      name: "",
      order: 0,
      profilePath: "",
    },
  })

  useEffect(() => {
    getCharacter(Number(id))
      .unwrap()
      .then(data => {
        reset({
          ...data,
          movie: movies?.find(movie => movie.id === data.movie) || null,
          actor: actors?.find(actor => actor.id === data.actor) || null,
        })
      })
  }, [id, getCharacter, reset, movies, actors])

  if (!movies || !actors) return null

  const onSubmit = (
    data: Omit<Characters, "id" | "movie" | "actor"> & {
      movie: Movie
      actor: Actor
    },
  ) => {
    if (id) {
      update({
        id: Number(id),
        ...data,
        movie: data.movie.id,
        actor: data.actor.id,
      })
        .unwrap()
        .then(() => navigate("/characters"))
    } else {
      create({
        ...data,
        movie: data.movie.id,
        actor: data.actor.id,
      })
        .unwrap()
        .then(() => navigate("/characters"))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">
        {id ? "Modifier un personnage" : "Créer un personnage"}
      </Typography>
      <Grid container spacing={2} p={1}>
        <Grid item xs={6}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField {...field} label="Nom" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select {...field} label="Sexe" fullWidth>
                <MenuItem value={Gender.Homme}>Homme</MenuItem>
                <MenuItem value={Gender.Femme}>Femme</MenuItem>
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="order"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField {...field} label="Ordre" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="profilePath"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField {...field} label="Image" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="movie"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(_, value) => field.onChange(value)}
                disablePortal
                options={movies || []}
                defaultValue={null}
                getOptionLabel={option => option.title || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField {...params} label="Movies" fullWidth />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="actor"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(_, value) => field.onChange(value)}
                disablePortal
                options={actors || []}
                defaultValue={null}
                getOptionLabel={option => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField {...params} label="Acteurs" fullWidth />
                )}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained">
        {id ? "Modifier" : "Créer"}{" "}
      </Button>
    </form>
  )
}
