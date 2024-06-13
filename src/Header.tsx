import {
  AppBar,
  Autocomplete,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { useLazySearchMoviesQuery } from "./services/movies"

export default function Header() {
  const [search, data] = useLazySearchMoviesQuery()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movies
        </Typography>
        <Button color="inherit">Login</Button>
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
