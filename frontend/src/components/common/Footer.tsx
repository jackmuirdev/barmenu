import { BottomNavigation, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
}

const Footer = ({ darkMode }: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BottomNavigation sx={{ mt: '80vh', backgroundColor: darkMode ? "#333" : "#f5f5f5", width: "100%" }}>
        <Typography sx={{ mt: 2 }}>
          &copy; {currentYear} Studio 6. All Rights Reserved.
        </Typography>
      </BottomNavigation>
    </>
  );
};

export default Footer;
