import { Typography } from "@mui/material"
import Form from "../components/layout/contact-page/Form";

const ContactScreen = () => {
  return (
    <div style={{marginTop: "-100px"}}>
      <Typography variant="h2" sx={{display: "flex", justifyContent: "center", marginTop: "150px"}}>
        Contact Us
      </Typography>
      <Form />
    </div>
  )
}

export default ContactScreen;