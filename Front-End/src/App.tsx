import { useState } from "react";
import "./App.css";
import LogInForm from "./components/loginForm";
import SignUpForm from "./components/signupForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogInForm />
        <SignUpForm />
      </header>
    </div>
  );
}

export default App;
