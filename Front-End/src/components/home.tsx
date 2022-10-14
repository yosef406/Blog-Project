// import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserSignInState } from "../data/slices/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userIsIn = useSelector(getUserSignInState);

  if (!userIsIn) return <Navigate to="/login" />;
  return (
    <>
      <h1>This is the home Page</h1>
      <button onClick={() => navigate("/login")}>Press</button>
    </>
  );
}

export default Home;
