import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addUser, getUserSignInState } from "../data/slices/userSlice";

function LogInForm() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [postUser, setPostUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userIsIn = useSelector(getUserSignInState);
  const navigate = useNavigate();

  useEffect(() => {
    if (postUser)
      fetch("https://localhost:5000/api/users/login", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setPostUser(false);
          setLoading(false);
          return res.json();
        })
        .then((data) => {
          if (data.success === true) {
            dispatch(addUser(data.user));
            navigate("/");
          } else {
            // ! Display error
          }
        })
        .catch((err) => console.log(err));
  });

  const logBtn = () => {
    let email = (document.getElementById("logEmail") as HTMLInputElement).value;
    let password = (document.getElementById("logPass") as HTMLInputElement)
      .value;

    setUserInfo({ email, password });

    setLoading(true);
    setPostUser(true);
  };
  console.log(userIsIn);

  if (userIsIn) return <Navigate to="/" />;
  return (
    <>
      <div>
        <div>
          <label>email</label>
          <input disabled={loading} type="email" id="logEmail" />
        </div>
        <div>
          <label>password</label>
          <input disabled={loading} type="password" id="logPass" />
        </div>
        {loading ? (
          <h4>loading...</h4>
        ) : (
          <button onClick={logBtn}>Log In</button>
        )}
      </div>
      <Link to="/signup">sign up </Link>
    </>
  );
}
export default LogInForm;
