import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Movies from "./Movies"
import Movie from "./Movie"
import LoginForm from "./LoginForm"
import Header from "./Header"
import Directors from "./Directors"
import { Box } from "@mui/material"
import Actors from "./Actors"
import FormCharacters from "./FormCharacters"
import Characters from "./Characters"

const container = document.getElementById("root")

const Layout = () => (
  <>
    <Header />
    <Box p={1}>
      <Outlet />
    </Box>
  </>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/movies/:genre",
        element: <Movies />,
      },
      {
        path: "/directors",
        element: <Directors />,
      },
      {
        path: "/character",
        element: <FormCharacters />,
      },
      {
        path: "/character/:id",
        element: <FormCharacters />,
      },
      {
        path: "/actors",
        element: <Actors />,
      },
      {
        path: "/:id",
        element: <Movie />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/characters",
        element: <Characters />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
