import { Grid } from "@mui/material"
import LinksCard from "./LinksCard"

interface Props{
  darkMode: boolean,
  handleThemeChange: () => void;
}

const LinksList = ({darkMode, handleThemeChange}: Props) => {
  return (
    <>
      <Grid item sx={{margin: "auto", display: "flex", justifyContent: "center"}}>
        <LinksCard name="Home" backgroundImage="../../../../images/home.png" href="/"/>
        <LinksCard name="Catalog" backgroundImage="../../../../images/bar.webp" href="/catalog"/>
        <LinksCard name="Contact" backgroundImage="../../../../images/contact-us.webp" href="/contact"/>
      </Grid>
    </>
  )
}

export default LinksList