import React, { useState, useEffect } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleSubmit = () => {
    const data = {
      username: userName,
      password: userPassword
    }
    setSubmitStatus(true);
    fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 200) {
        console.log('it worked!')
      } else{
        alert(res)
      }
    })
  };

  const handleNewAccount = () => {

  }

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
        <button type='button' onClick={() => handleNewAccount()}>Create New Account</button>
      </header>
    </div>
  );
}
