import { useState, useEffect } from "react";
import { loginUser } from "./API/ServerConnection";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password).then((response) => {
      if (response.status === 200) {
        cookies.set("token", response.data.token, { maxAge: 3600 });
      }
      navigate("/home");
    });
  };

  useEffect(() => {
    setDisabledFlag(false);
    if (username === "" || password === "") setDisabledFlag(true);
  }, [password, username]);

  const theme = createTheme();
  theme.typography.h3 = {
    fontSize: "1.2rem",

    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };

  return (
    <Box
      align="center"
      backgroundColor="primary.main"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={0}
          align="center"
          justify="cente"
          direction="column"
          justifyContent="center"
          backgroundColor="white"
          margin={5}
          style={{ width: 500, maxHeight: "100vh" }}
        >
          <div className="login-header">
            <ThemeProvider theme={theme}>
              <Typography component="h1" variant="h3" color="primary">
                Sign In
              </Typography>
            </ThemeProvider>
          </div>

          <form className="login-form">
            <div>
              <TextField
                margin="normal"
                variant="outlined"
                size="small"
                required
                type="text"
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                onChange={(event) => setusername(event.target.value)}
                autoFocus
              />

              <br />
              <TextField
                margin="normal"
                required
                variant="outlined"
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />

              <br />
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disabledFlag}
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export { Login };
