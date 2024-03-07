import { Grid } from "@mui/material"
import LinksCard from "./LinksCard"

const LinksList = () => {
  return (
    <>
      <Grid item sx={{ margin: "auto", display: "flex", justifyContent: "center", flexDirection: { xs: "column", md: "column", lg: "column", xl: "row" } }}>
        <LinksCard name="Home" backgroundImage="../../../../images/home.png" href="/" />
        <LinksCard name="Catalog" backgroundImage="../../../../images/bar.webp" href="/catalog" />
        <LinksCard name="Contact" backgroundImage="../../../../images/contact-us.webp" href="/contact" />
      </Grid>
    </>
  )
}

export default LinksList
