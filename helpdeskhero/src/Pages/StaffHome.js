import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { loggedInContext } from "./Logged-In-context";
import { YourTickets, NewsBar, UnassignedTickets } from "./StaffHome_components";

function StaffHome() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRequestData, setUserRequestData] = useState([]);
  const [accountTypeData, setAccountTypeData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const { loggedIn, setLoggedIn, setUserType, setUserId, userType } = useContext(loggedInContext);

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
        let jsonres = await res.json();
        setLoggedIn(true);
        setUserType(jsonres[0].user_type_id);
        setUserId(jsonres[0].user_id);
      } else {
        alert("Username/Password not found!");
      }
    });
  };

  // Fetch pending user account request
  useEffect(() => {
    fetch(`http://localhost:8080/pendingaccountrequest`)
      .then(response => response.json())
      .then(data => {
        setUserRequestData(data);
      })
      .catch(error => console.error('Error:', error));
  }, [isDeleted]); // Add isDeleted to dependency array to refetch data when an account request is deleted

  // Fetch account_type data
  useEffect(() => {
    fetch(`http://localhost:8080/accounttype`)
      .then(response => response.json())
      .then(data => {
        setAccountTypeData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleNewAccount = () => {
    navigate("/new-account");
  };

  const LogOut = () => {
    setLoggedIn(false);
  };

  const handleApproveNewAccount = async () => {
    /*

    const approvedAccountDataRaw = userRequestData.find(request => request.id === selectedRequestId);
    //const accountTypeID = accountTypeData.find(type => type.name === approvedAccountDataRaw.accountType);

    console.log(userRequestData)
    console.log(approvedAccountDataRaw)
    console.log(selectedRequestId)
    //console.log(accountTypeID)
    //console.log(accountTypeData)

    const approvedAccountData = {
      username: approvedAccountDataRaw.name,
      password: approvedAccountDataRaw.email,
      user_type_id: accountTypeID.user_type_id
    };

    try {
      const response = await fetch(`http://localhost:8080/createtnewuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvedAccountData),
      });
      //deleteAccountAfterCreation();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsDeleted(true); // Trigger refetch of pending account requests
    } catch (error) {
      console.error('Error approving account request:', error);
      alert('Error approving account request. Please try again.');
    }
    */
  };

  const deleteAccountAfterCreation = async () => {

    console.log(selectedRequestId)
    try {
      const response = await fetch(`http://localhost:8080/pendingaccountrequest/${selectedRequestId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsDeleted(true); // Trigger refetch of pending account requests
    } catch (error) {
      console.error('Error denying account request:', error);
      alert('Error denying account request. Please try again.');
    }
  };

  const handleDenyNewAccount = async () => {
    /*
    if (window.confirm('Are you sure you want to deny this account request?')) {
      try {
        const response = await fetch(`http://localhost:8080/pendingaccountrequest/${selectedRequestId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setIsDeleted(true); // Trigger refetch of pending account requests
      } catch (error) {
        console.error('Error denying account request:', error);
        alert('Error denying account request. Please try again.');
      }
    }
    */
  };

  return loggedIn ? (
    <>
      <h1>Welcome to the Staff Home Page</h1>
      <NewsBar />
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
            {userType === 1 && (
              <>
                <h4 className="mt-3">Pending Account Request</h4>
                <ul style={{
                border: "1px solid black",
                borderRadius: 5,
                paddingBottom: 15,
                marginLeft: 15,
                marginRight: 15
              }}>
                  {userRequestData.map(request => (
                    <ul key={request.id}>
                      <p>Name: {request.name}</p>
                      <p>Email: {request.email}</p>
                      <p>Type: {request.accountType}</p>
                      <p>Password: {request.password}</p>
                      <button onClick={() => {
                        setSelectedRequestId(request.id);
                        handleApproveNewAccount();
                      }}>Approve</button>
                      <button onClick={() => {
                        setSelectedRequestId(request.id);
                        handleDenyNewAccount();
                      }}>Deny</button>
                    </ul>
                  ))}
                </ul>
              </>
            )}
              <h4 className="mt-3">Unassigned Tickets</h4>
              <UnassignedTickets />
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
              <h4 className="mt-3">Your Open Tickets</h4>
              <YourTickets />
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
