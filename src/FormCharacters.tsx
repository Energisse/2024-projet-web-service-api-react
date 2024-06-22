import { MenuItem, Select, TextField, Autocomplete } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Gender } from "./services/directors"
import { useGetMoviesQuery } from "./services/movies"
import type { Movie } from "./services/movies"
import { useGetActorsQuery } from "./services/actors"
import type { Actor } from "./services/actors"
import {
  useCreateCharacterMutation,
  type Characters,
} from "./services/characters"

export default function FormCharacters() {
  const { data: movies } = useGetMoviesQuery()
  const { data: actors } = useGetActorsQuery()

  const [create] = useCreateCharacterMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  if (!movies || !actors) return null

  const onSubmit = (
    data: Omit<Characters, "id" | "movie" | "actor"> & {
      movie: Movie
      actor: Actor
    },
  ) => {
    create({
      ...data,
      movie: data.movie.id,
      actor: data.actor.id,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "This field is required" }}
        render={({ field }) => <TextField {...field} label="Nom" />}
      />

      <Controller
        name="gender"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <Select {...field} label="Sexe">
            <MenuItem value={Gender.Homme}>Homme</MenuItem>
            <MenuItem value={Gender.Femme}>Femme</MenuItem>
          </Select>
        )}
      />

      <Controller
        name="order"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <TextField {...field} label="Ordre" type="number" />
        )}
      />

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
            renderInput={params => <TextField {...params} label="Movies" />}
          />
        )}
      />

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
            renderInput={params => <TextField {...params} label="Acteurs" />}
          />
        )}
      />

      <input type="submit" />
    </form>
  )
}
