import { useEffect, useState } from "react";

function LogInForm() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [postUser, setPostUser] = useState(false);
  const [loading, setLoading] = useState(false);

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
          if (data.success) {
            //! redux save user
            //! navigate to home page
            console.log(data);
          } else {
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
    </>
  );
}
export default LogInForm;
