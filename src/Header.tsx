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
import { Link } from "react-router-dom"

export default function Header() {
  const [search, data] = useLazySearchMoviesQuery()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container columnGap={2}>
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
            <Link to={"/login"}>Login</Link>
          </Typography>
        </Grid>
        <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data.data || []}
          getOptionLabel={option => option.title}
          sx={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Movie"
              onChange={e => search(e.target.value)}
            />
          )}
        />
      </Toolbar>
    </AppBar>
  )
}
