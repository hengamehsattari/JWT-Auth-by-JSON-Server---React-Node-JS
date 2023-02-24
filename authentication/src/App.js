import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import Register from "./Register";
import SharedLayout from "./SharedLayout";
import Error from "./Error";

function App() {
  const [logoutUser, setLogoutUser] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SharedLayout />}>
          <Route index element={<Header logoutUser={logoutUser} setLogoutUser={setLogoutUser}/>} />
          <Route index element={<Home logoutUser={logoutUser} setLogoutUser={setLogoutUser} />} />
        </Route> */}
        <Route
          path="/"
          element={
            <Home logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
          }
        />
        <Route
          path="register"
          element={
            <Register logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
          }
        />
        <Route
          path="login"
          element={
            <Login logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
