import { TextField, Button } from "@mui/material";

const Form = () => {
  return (
    <form
      style={{ width: "50%", margin: "auto", marginBottom: "150px" }}
      action="mailto:info@studio6maidstone.co.uk"
      method="post"
    >
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Your Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
