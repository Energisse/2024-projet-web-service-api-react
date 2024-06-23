import { Gender } from "./services/directors"
import TransgenderIcon from "@mui/icons-material/Transgender"
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"

export default function SexeIcon({ sexe }: { sexe: Gender }) {
  switch (sexe) {
    case Gender.Autre:
      return <TransgenderIcon />
    case Gender.Femme:
      return <FemaleIcon />
    case Gender.Homme:
      return <MaleIcon />
    case Gender.JSP:
      return <TransgenderIcon />
  }
}
