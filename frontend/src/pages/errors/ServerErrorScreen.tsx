import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

const ServerError = () => {
  const {state} = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color='secondary'>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error.detail} || Internal server error
          </Typography>
        </>
      ) : (
        <Container component={Paper} sx={{height: '35vh', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Typography gutterBottom variant="h3" sx={{padding: '60px', fontSize: '40px', textAlign: 'center'}}>
        Server Error
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
    </Container>
      )}
    </Container>
  )
}

export default ServerError