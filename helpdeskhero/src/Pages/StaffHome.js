import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function StaffHome() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = () => {
    const data = {
      username: userName,
      password: userPassword
    }
    setSubmitStatus(true);
    setLoggedIn(true);
    // fetch('http://localhost:8080/login', {
    //   method: "POST",
    //   body: JSON.stringify(data)
    // })
    // .then(res => {
    //   if (res.status === 200) {
    //     console.log('it worked!')
    //   } else{
    //     alert(res)
    //   }
    // })
  };

  const LogOut = () =>{
    setLoggedIn(false)
  }

  const handleNewAccount = () => {

  }

return (
    (
      loggedIn ?
      <>
        <h1>Welcome to the Staff Home Page</h1>
        <div style={{ paddingBottom: '40%' }}>

        <div className='row mt-5'>
          <div className='col-7'>
            <div className='status-info' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '80%', marginLeft: 15 }}>
              <h4 className='mt-3'>New/Unassigned Tickets</h4>
            </div>
          </div>

          <div className='col-5'>
            <div className='status-info' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '114%', marginRight: 15 }}>
              <h4 className='mt-3'>Your Tickets</h4>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12'>
                <div className='status-info' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '25%', marginLeft: 15, marginRight: 15 }}>
              <h4 className='mt-3'>News/Outages</h4>
            </div>
          </div>
          </div>
          <button className="mt-4 btn btn-dark btn-lg" onClick={() => LogOut()}>Log Out</button>
        </div>

      </>
    :
      <div style={{ marginTop: '5%', paddingBottom: '40%' }}>
        <h2>Log In</h2>
<br/>

          <form>
            <label style={{marginBottom: 15}}>

              <input
                type="text"
              name="name"
              placeholder="Enter Username"
              style={{ padding: 15, borderRadius: 5, textAlign: 'center' }}
                onInput={(e) => setUserName(e.target.value)}
              />
          </label>
          <br/>
            <label>

              <input
                type="text"
              name="password"
              placeholder="Enter Password"
              style={{ padding: 15, borderRadius: 5, textAlign: 'center' }}
                onInput={(e) => setUserPassword(e.target.value)}
              />
            </label>
          <br></br>
          <br></br>
            <input type="button" className="btn btn-dark " value="Submit" onClick={() => handleSubmit()} />

          </form>
          <br></br>
        <button type='button' className="btn btn-dark " onClick={() => handleNewAccount()}>Create New Account</button>

      </div>
    )

)}





export default StaffHome;

