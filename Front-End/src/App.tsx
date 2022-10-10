import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import LogInForm from "./components/loginForm";
import SignUpForm from "./components/signupForm";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeUser, getUserSignInState } from "./data/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const userIsIn = useSelector(getUserSignInState);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>This is a header</h3>

          {userIsIn ? (
            <button
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              Log Out
            </button>
          ) : (
            ""
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LogInForm />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
