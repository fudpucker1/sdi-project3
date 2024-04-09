import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function TicketSubmission() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentID, setEquipmentID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [serialFound, setSerialFound] = useState(false);
  const [submit, setSubmit] = useState(false);

  // return eqiupment_id based on serial number
  const serialLookup = async (event) => {
    event.preventDefault();

    if (!serialNumber.trim()) {
      alert('Please enter a serial number to search.');
      return;
    }

    // Get the equipmentID from the API server
    try {
      const response = await fetch(`http://localhost:8080/serialnumber/${serialNumber}`);

      // check if the GET was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setEquipmentID(data[0].equipment_id);
      setSerialFound(true);
    } catch (error) {
      console.error('Error finding equipment:', error);
      alert('Error finding equipment. Please try again.');
      setSerialFound(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (serialNumber && !serialFound) {
      alert('Please search for the serial number before submitting the ticket.');
      return;
    }

    // Create ticket object
    const ticket_data = {
      customer_name: username,
      customer_email: email,
      ticket_type_id: ticketType,
      equipment_id: equipmentID,
      description: description,
      priority_level_id: priority
    };

    try {
      const response = await fetch('http://localhost:8080/createticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket_data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubmit(true)
      console.log(equipmentID);
      navigate('/post-submission', { state: { TicketId: data.ticket_id } });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Error submitting ticket. Please try again.');
    }
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
    (!submit ?
      <div style={{paddingBottom: '50%'}}>
      <h1 style={{paddingBottom: '10px'}}>Ticket Submission Page</h1>
      <form onSubmit={handleSubmit}>
        <div className = 'Part1' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

        <label style={{ marginBottom: 25}}>
          <input type="text" placeholder="Enter Name" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br/>

        <label style={{ marginBottom: 25}}>
          <input type="email" placeholder="Enter Offical Email" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br/>

        <label style={{ marginBottom: 25}}>
          <select value={ticketType} style={{ display: 'flex', flexDirection: 'column', paddingLeft: 70, borderRadius: 5, textAlign: 'center' }} onChange={(e) => setTicketType(e.target.value)}>
            <option value="">Ticket Type</option>
            <option value="1">Technical Issue</option>
            <option value="2">User Support</option>
            <option value="3">Software Enhancement</option>
            <option value="4">Hardware Maintenance</option>
            <option value="5">Network Connectivity</option>
          </select>
        </label>
          <br/>
        <label style={{ marginBottom: 25}}>
            <input style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} type="text" placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
          {serialFound && <span style={{ color: 'green' }}>✓</span>} {/* Display green checkmark if serial found */}
        </label>
        </div>
        <button className="btn btn-dark" onClick={serialLookup}>Search</button>
        <br/>
        <div className = 'Part2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <label style={{ marginBottom: 25, marginTop: 25}}>
            <textarea placeholder="Problem Description" style={{ borderRadius: 5, textAlign: 'center', paddingLeft: 60, paddingRight: 60 }} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label style={{ marginBottom: 25, marginRight: 5}}>
            <select style={{ display: 'flex', flexDirection: 'column', paddingLeft: 70, paddingRight: 70, borderRadius: 5, textAlign: 'center' }} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Priority Level</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
            <option value="5">Emergency</option>
          </select>
        </label>
        </div>

        <button className="btn btn-dark" type="submit" onSubmit={() => handleSubmit()}>Submit</button>
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
    )
  );
}

export default TicketSubmission;

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TicketSubmission() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentID, setEquipmentID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submit, setSubmit] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  const handleSubmit = () => {
  // return eqiupment_id based on serial number
  const serialLookup = async (event) => {
    event.preventDefault();

    // create a serial number object
    const serial_number = {
      "serial_number": serialNumber
    }

    // Get the equipmentID from the API server
    try {
      const response = await fetch('http://localhost:8080/serialnumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serial_number),
      });

      // check if the GET was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // grab the GET response data, which will be the equipmentID
      const data = await response.json();
      console.log(data);
      setEquipmentID(data.equipment_id);

    } catch (error) {
      console.error('Error finding eqiupment:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmit(true)
    console.log(submit)
    // create a ticket object
    const ticket_data = {
      "customer_name": username,
      "customer_email": email,
      "ticket_type_id": ticketType,
      "equipment_id": equipmentID,
      "description": description,
      "priority_level_id": priority
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

    try {
      const response = await fetch('http://localhost:8080/createticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket_data),
      });

      // check if the POST was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // grab the POST response data, which will be the TicketId
      const data = await response.json();
      console.log(data);

      // navigate to the ticket post submission page
      navigate('/post-submission', { state: { TicketId: data.ticket_id } });
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Ticket Submission Page</h1>
      <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={() => handleSubmit()}>

        <label>Name:
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Ticket Type:
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Technical Issue</option>
            <option value="2">User Support</option>
            <option value="3">Software Enhancement</option>
            <option value="4">Hardware Maintenance</option>
            <option value="5">Network Connectivity</option>
          </select>
        </label>

        <label>Serial Number:
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </label>
        <button onClick={() => serialLookup}>Search</button>

        <label>Problem Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
            <option value="5">Emergency</option>
          </select>
        </label>

        <button type="submit">Submit</button>

      </form>
    </div>

  ));
}

export default TicketSubmission;
*/