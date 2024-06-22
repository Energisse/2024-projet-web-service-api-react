import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import { TableCell, TableRow } from "@mui/material"
import { format } from "date-fns"
import MUIDataTable from "mui-datatables"
import ActorsMovies from "./ActorsMovies"
import { useGetActorsQuery } from "./services/actors"
import { Gender } from "./services/directors"

export default function Actors() {
  const { data } = useGetActorsQuery()

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
        customBodyRender: (value: Gender) =>
          value === Gender.Femme ? <FemaleIcon /> : <MaleIcon />,
        filter: true,
        sort: true,
      },
    },
    {
      name: "birthday",
      label: "Date de naissance",

      options: {
        customBodyRender: (value: string) =>
          format(new Date(value), "dd/MM/yyyy"),
        filter: false,
        sort: true,
      },
    },
    {
      name: "placeOfBirth",
      label: "Lieu de naissance",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "popularity",
      label: "Popularité",
      options: {
        filter: false,
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
      name: "biography",
      label: "Biographie",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "deathday",
      label: "Date de décès",
      options: {
        customBodyRender: (value: string) =>
          value ? format(new Date(value), "dd/MM/yyyy") : "",
        filter: false,
        sort: true,
      },
    },
  ]

  return (
    <MUIDataTable
      title={"Actors"}
      data={data || []}
      columns={columns}
      options={{
        selectableRows: "none",
        print: false,
        download: false,
        expandableRowsOnClick: true,
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
          const colSpan = rowData.length + 1
          return (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <ActorsMovies actors={data![rowMeta.dataIndex]} />
              </TableCell>
            </TableRow>
          )
        },
      }}
    />
  )
}
