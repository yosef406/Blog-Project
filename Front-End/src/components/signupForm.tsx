import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function SignUpForm() {
  const [postUser, setPostUser] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const navigate = useNavigate();

  const signUpBtn = () => {
    let name = (document.getElementById("userName") as HTMLInputElement).value;
    let email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    let password = (document.getElementById("userPass") as HTMLInputElement)
      .value;
    let gender = (document.getElementById("userGender") as HTMLInputElement)
      .value;

    //!!!!!!
    if (gender === "") {
      console.log("not valid");
    } else {
      console.log(" valid");
    }
    // !!!!!

    setUserInfo({ name, email, password, gender });
    setPostUser(true);
  };

  useEffect(() => {
    if (postUser) {
      fetch("https://localhost:5000/api/users/signup", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => {
          setPostUser(false);
          return result.json();
        })
        .then((data) => {
          console.log(data);

          navigate("/login");
        })
        .catch((err) => console.log("Error: ", err));
    }
  });
  return (
    <>
      <div>
        <div>
          <label>full name: </label>
          <input type="text" id="userName" />
        </div>
        <div>
          <label>email: </label>
          <input type="text" id="userEmail" />
        </div>
        <div>
          <label>password: </label>
          <input type="password" id="userPass" />
        </div>
        <div>
          <label>gender: </label>
          <select id="userGender">
            <option value="" hidden selected={true} disabled={true}>
              select gender
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <button type="submit" onClick={signUpBtn}>
          Sign Up
        </button>
        <div></div>
      </div>
      <Link to="/login">Log in</Link>
    </>
  );
}
export default SignUpForm;
