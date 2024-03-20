import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";

const Login = () => {
  const { setIsLoggedIn } = useContext(UserAuthContext);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
