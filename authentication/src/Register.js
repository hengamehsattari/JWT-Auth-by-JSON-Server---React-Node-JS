import axiox from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    axiox
      .post("http://localhost:5000/api/auth/register", { email, password })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({ userLogin: true, token: response.data.access_token })
        );
        setEmail("");
        setError("");
        setPassword("");
        setLogoutUser(false);
        navigate("/");
      })
      .catch((error) => 
        setError(error.response.data.message)
    );
  };

  return (
    <div className="text-center mt-5">
      
      <main className="form-signin w-50 m-auto">
      {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={register}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating my-3 mx-auto w-50">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating my-3 mx-auto w-50">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button className="w-50 btn btn-lg btn-success" type="submit">
            Register
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
