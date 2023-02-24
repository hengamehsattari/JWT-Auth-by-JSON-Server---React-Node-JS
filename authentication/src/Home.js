import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));

  const userNotLogin = () => (
    <div className="text-center">
      <h3>It seem's like you are not login</h3>
      <h4>
        If you have an account, then please <Link to="/login">Login</Link>
      </h4>
      <h4>
        Don't have an account, then please do{" "}
        <Link to="/register">Register</Link>
      </h4>
    </div>
  );
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        {isLoginTrue && isLoginTrue.userLogin ? (
          <h2>Welcome Back User</h2>
        ) : (
          <>{userNotLogin()}</>
        )}
      </div>
    </>
  );
};

export default Home;
