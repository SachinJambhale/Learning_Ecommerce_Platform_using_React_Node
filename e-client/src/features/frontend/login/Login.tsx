import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { addLoggedUser } from "../../../app/slices/authSlice";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
interface ILogin {
  userType: string;
}

const Login = ({ userType }: ILogin) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (userType == "admin") {
      AuthService.adminLogin(user)
        .then((response) => {
          console.log(response);
          // navigate to control panel
          const token = response?.headers["x-token"];
          const rToken = response?.headers["x-refresh"];

          if (token) sessionStorage.setItem("token", token);
          if (rToken) sessionStorage.setItem("rToken", rToken);
          // save the user into the redux store
          dispatch(addLoggedUser(response.data.data));
          navigate("/secured");
        })
        .catch((err) => {
          console.log(err);
          let message = err?.response?.data?.message || "Could not Login";
          alert(message);
        });
    }
    if (userType == "customer") {
      AuthService.custLogin(user)
        .then((response) => {
          console.log(response);
          // navigate to control panel
          const token = response?.headers["x-token"];
          const rToken = response?.headers["x-refresh"];

          if (token) sessionStorage.setItem("token", token);
          if (rToken) sessionStorage.setItem("rToken", rToken);
          // save the user into the redux store
          dispatch(addLoggedUser(response.data.data));
          navigate("/customerProfile");
        })
        .catch((err) => {
          console.log(err);
          let message = err?.response?.data?.message || "Could not Login";
          alert(message);
        });
    }
    setUser({ email: "", password: "" });
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {userType == "admin" ? "Admin" : "Customer"} Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/admin">Admin Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
