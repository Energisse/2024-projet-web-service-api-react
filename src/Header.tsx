import {
  AppBar,
  Autocomplete,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { useLazySearchMoviesQuery } from "./services/movies"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const [search, data] = useLazySearchMoviesQuery()

  const navigate = useNavigate()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justifyContent={"space-between"} p={1}>
          <Grid item>
            <Grid container flexDirection={"row"} columnGap={2}>
              <Typography variant="h6">
                <Link to={"/"}>Movies</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/actors"}>Acteurs</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/directors"}>Directeurs</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/characters"}>Personnages</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/movies/aventure"}>Films d'aventure</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/movies/comedie"}>Films de comédie</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/movies/action"}>Films d'action</Link>
              </Typography>
              <Typography variant="h6">
                <Link to={"/movies/thriller"}>Films de thriller</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Link to={"/login"}>Login</Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
        <Autocomplete
          disablePortal
          options={data.data || []}
          getOptionLabel={option => option.title}
          onChange={(_, value) => {
            if (!value) return
            navigate("/" + value.id)
          }}
          sx={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Rechercher un film"
              onChange={e => search(e.target.value)}
              variant="filled"
            />
          )}
        />
      </Toolbar>
    </AppBar>
  )
}
