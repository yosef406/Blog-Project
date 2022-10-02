console.log("Hello from api Front");

fetch("http://localhost:5000/api")
    .then((res) => console.log(res))
    .catch((err) => console.log("error: ", err));