import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();// get the navigate function from the useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(event.target.username.value);
    navigate("/"); // navigate to the home page after login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <button>submit</button>
    </form>
  );
};

export default Login;
