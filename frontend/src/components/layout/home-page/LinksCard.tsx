import { Card, CardHeader, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  backgroundImage: string;
  href: string;
}

const LinksCard = ({ name, backgroundImage, href }: Props) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
        paddingTop: { xs: "100px", sm: "150px", md: "200px" },
        paddingBottom: { xs: "100px", sm: "150px", md: "200px" },
        paddingRight: { xs: "50px", sm: "100px", md: "250px" },
        paddingLeft: { xs: "50px", sm: "100px", md: "250px" },
        margin: "50px",
        display: "flex",
        justifyContent: "center",
        color: "inherit",
        backgroundSize: "contain",
      }}
    >
      <CardHeader
        title={
          <Box
            sx={{
              backgroundColor: "#1976d2",
              padding: { xs: "10px", sm: "20px", md: "30px" },
              borderRadius: "10px",
            }}
          >
            <MuiLink
              component={Link}
              to={href}
              sx={{
                fontWeight: "bold",
                fontFamily: "'Questrial', sans-serif",
                textDecoration: "none",
                color: "#fff",
                fontSize: { xs: "20px", sm: "24px", md: "30px" },
              }}
            >
              {name}
            </MuiLink>
          </Box>
        }
      />
    </Card>
  );
};

export default LinksCard;
