import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const request_data = {
    name: name,
    email: email,
    accountType: accountType,
    username: userName,
    password: password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/account_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data),
    }).then((res) => {
      if (res.status === 409) {
        alert("Username is already in use, please try a different username");
      } else {
        window.confirm("Account request submitted!");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h1>Create A New Account</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Account-Type:
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="supervisor">Supervisor</option>
            <option value="project manager">Project Manager</option>
            <option value="auditor">Auditor</option>
          </select>
        </label>

        <label>
          Username:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
