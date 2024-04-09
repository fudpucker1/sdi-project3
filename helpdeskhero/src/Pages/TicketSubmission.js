import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function TicketSubmission() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submit, setSubmit] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  const handleSubmit = () => {

    setSubmit(true)
    console.log(submit)
    // create a ticket object
    const ticket = {
      name,
      email,
      equipment,
      serialNumber,
      description,
      priority,
    };

    // POST the ticket object to the API server
  //   try {
  //     const response = await fetch('http://localhost:8080/api/tickets', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(ticket),
  //     });

  //     // check if the POST was successful
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     // grab the POST response data, which will be the TicketId
  //     const data = await response.json();
  //     console.log(data);
  //     setSubmit(true)
  //   } catch (error) {
  //     console.error('Error submitting ticket:', error);
  //   }

  //   // navigate to the ticket post submission page
  //   // navigate('/post-submission', { state: { TicketId: data.TicketId } });
  // };
  };

    // this contains the routing URL location
    const location = useLocation();
    // this contains the state passed from <TicketSubmission/> for the TicketId
    // const TicketId = location.state.TicketId;
    const TicketId = 100;

    const GoHome = () => {
      setSubmit(false)
      navigate('/home')
    }

    const NewTicket = () => {
      setSubmit(false)
      console.log(submit)
    }


  return (
    (
      !submit ?
        <div style={{paddingBottom: '50%'}}>
          <h1>Ticket Submission Page</h1>
          <form>
            <div className = 'Info' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <br></br>

            <label style={{ marginBottom: 25}}>
            <input style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} type="text" value={name} placeholder = 'First Name, Last Name' onChange={(e) => setName(e.target.value)} />
            </label>
            <br/>

            <label style={{ marginBottom: 25 }}>
                <input style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} type="email" value={email} placeholder = "Official Email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br/>

            <label style={{ marginBottom: 25, marginRight: 5}}>
                <select style={{ paddingLeft: 80, paddingRight: 80, borderRadius: 5, textAlign: 'center' }}  value={equipment} onChange={(e) => setEquipment(e.target.value)}>
                <option value="">Equipment Type</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
              </select>
            </label>
            <br/>

            <label style={{ marginBottom: 25 }}>
                <input style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} type="text" value={serialNumber} placeholder = 'Serial Number' onChange={(e) => setSerialNumber(e.target.value)} />
            </label>
            <br/>

            <label style={{ marginBottom: 20 }}>
                <textarea style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={description} placeholder = 'Problem Description' onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br/>

            <label style={{ marginBottom: 25 }}>
                <select style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <br/>

            </div>

            <button type="button" className="btn btn-dark btn-lg" onClick={() => handleSubmit()}>Submit</button>
            <br/>
          </form>
      </div>
   :
    <div style={{paddingBottom: '50%'}}>
      <h1>Welcome to the Post Submission Page</h1>
      <br></br>
      <h4>Your Ticket Id is {TicketId}. Use your Ticket Id to make any updates to your ticket.</h4>
      <h4>You will receive an automated email from helpdeskhero@spacemail.gov.</h4>
      <h4>You may now close this window.</h4>
      <br></br>
      <br></br>

      <div className = 'Buttons' style={{display: 'flex', justifyContent: 'center', columnGap: '50px'}}>
      <button type="button" className="btn btn-dark btn-lg" onClick = {() => GoHome()}>Go Home</button>
      <button type="button" className="btn btn-dark btn-lg" onClick = {() => NewTicket()}>Submit New Ticket</button>
      </div>
    </div>

  ));
}

export default TicketSubmission;
