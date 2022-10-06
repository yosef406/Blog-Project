import { useState } from "react";
import "./App.css";
import ImageView from "./components/ImageView";
import ListImages from "./components/ListImages";
import LogInForm from "./components/loginForm";
import SignUpForm from "./components/signupForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <LogInForm />
        <SignUpForm /> */}
        {/* <ImageView /> */}
        <ListImages />
      </header>
    </div>
  );
}

export default App;
