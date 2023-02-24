import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = ({ logoutUser, setLogoutUser }) => {
  const [login, setLogin] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    hydrateStateWithLocalStorage();
  }, [logoutUser]);

  const logout = () => {
    navigate("/login")
  };

  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (e) {
        setLogin("");
      }
    }
  };

  return (
    <div>
      <header className="bg-info text-center p-2" >
        {!logoutUser && login && login.userLogin ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </header>
    </div>
  );
};

export default Header;
