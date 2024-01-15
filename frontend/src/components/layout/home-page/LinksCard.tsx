import { Card, CardHeader, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  backgroundImage: string;
  href: string;
}

const LinksCard = ({ name, backgroundImage, href }: Props) => {
  return (
    <>
      <Card
        style={{
          textAlign: "center",
          backgroundImage: `url(${backgroundImage})`,
          paddingTop: "200px",
          paddingBottom: "200px",
          paddingRight: "250px",
          paddingLeft: "250px",
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
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Link
                to={href}
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Questrial', sans-serif",
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "30px",
                }}
              >
                {name}
              </Link>
            </Box>
          }
        />
      </Card>
    </>
  );
};

export default LinksCard;
