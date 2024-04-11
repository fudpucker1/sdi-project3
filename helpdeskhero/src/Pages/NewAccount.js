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
    <div style={{paddingBottom: '50%'}}>
      <h1 style={{ paddingBottom: '30px' }}>Create A New Account</h1>

      <form
        
        onSubmit={(event) => handleSubmit(event)}
      >
        <label style={{ marginBottom: 25}}>
          
          <input
            type="text"
            placeholder="Enter Name"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>
          
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      <br/>
        <label style={{ marginBottom: 25}}>
          
          <select
            value={accountType}
            style={{paddingLeft: 50, paddingRight: 50,borderRadius: 5, textAlign:'center'}}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select Account Type...</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="supervisor">Supervisor</option>
            <option value="project manager">Project Manager</option>
            <option value="auditor">Auditor</option>
          </select>
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>
          
          <input
            type="text"
            placeholder="Enter Username"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>
          
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button className="btn btn-dark" type="submit">Submit</button>
      </form>
    </div>
  );
}
