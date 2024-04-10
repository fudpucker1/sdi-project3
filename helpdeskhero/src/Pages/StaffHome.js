import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { loggedInContext } from "./Logged-In-context";

function StaffHome() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const { userType, setUserType } = useContext(loggedInContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: userName,
      password: userPassword,
    };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 200) {
        setLoggedIn(true);
        setUserType(res)
        console.log(userType)
      } else {
        alert("Username/Password not found!");
      }
    });
  };

  const handleNewAccount = () => {
    navigate('/new-account')
  };

  const LogOut = () => {
    setLoggedIn(false)
  }


  return loggedIn ? (
    <>
      <h1>Welcome to the Staff Home Page</h1>
      <div style={{ paddingBottom: "40%" }}>
        <div className="row mt-5">
          <div className="col-7">
            <div
              className="status-info"
              style={{
                border: "1px solid black",
                borderRadius: 5,
                paddingBottom: "80%",
                marginLeft: 15,
              }}
            >
              <h4 className="mt-3">New/Unassigned Tickets</h4>
            </div>
          </div>

          <div className="col-5">
            <div
              className="status-info"
              style={{
                border: "1px solid black",
                borderRadius: 5,
                paddingBottom: "114%",
                marginRight: 15,
              }}
            >
              <h4 className="mt-3">Your Tickets</h4>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div
              className="status-info"
              style={{
                border: "1px solid black",
                borderRadius: 5,
                paddingBottom: "25%",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <h4 className="mt-3">News/Outages</h4>
            </div>
          </div>
        </div>
        <button className="mt-4 btn btn-dark btn-lg" onClick={() => LogOut()}>
          Log Out
        </button>
      </div>
    </>
  ) : (
    <div style={{ marginTop: "5%", paddingBottom: "40%" }}>
      <h2>Log In</h2>
      <br />

      <form>
        <label style={{ marginBottom: 15 }}>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Username"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
        <input
          type="submit"
          className="btn btn-dark "
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      <br></br>
      <button
        type="button"
        className="btn btn-dark "
        onClick={() => handleNewAccount()}
      >
        Create New Account
      </button>
    </div>
  );
}

export default StaffHome;
