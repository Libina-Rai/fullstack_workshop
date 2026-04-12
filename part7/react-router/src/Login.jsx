import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Login = ({ setUser }) => {
  const navigate = useNavigate(); // get the navigate function from the useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(event.target.username.value);
    navigate("/"); // navigate to the home page after login
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" name="username" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
