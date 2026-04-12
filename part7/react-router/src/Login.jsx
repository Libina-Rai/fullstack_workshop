import { useNavigate } from "react-router-dom";
// import { TextField, Button } from "@mui/material";
import { Button, Input } from "./components/Button";

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
          <Input label="username" name="username" />
        </div>
        <div>
          <Button type="submit">submit</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
