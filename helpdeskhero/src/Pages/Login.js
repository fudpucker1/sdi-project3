import React, { useState, useEffect } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleSubmit = () => {
    const data = {
      username: userName,
      password: userPassword,
    };
    console.log(JSON.stringify(data));
    setSubmitStatus(true);
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        document.cookie = res.cookies
        // window.location.href = "http://localhost:3000/staff-home";
      } else {
        alert(JSON.stringify(res));
      }
    });
    console.log(document.cookie)
  };

  const handleNewAccount = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <p>The login page is up and running.</p>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="name"
              onInput={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              onInput={(e) => setUserPassword(e.target.value)}
            />
          </label>
          <input type="button" value="Submit" onClick={() => handleSubmit()} />
        </form>
        <button type="button" onClick={() => handleNewAccount()}>
          Create New Account
        </button>
      </header>
    </div>
  );
}
