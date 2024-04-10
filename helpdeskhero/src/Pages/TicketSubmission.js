import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function TicketSubmission() {
  const navigate = useNavigate();
  const falseString = "false";

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentID, setEquipmentID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [serialFound, setSerialFound] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState('');

  // useEffect for making API call when ticketData state changes
  useEffect(() => {
    const sendTicketData = async () => {
      try {
        const response = await fetch('http://localhost:8080/createticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSubmit(true);
        console.log(equipmentID);
        setTicketId(data.ticket_id);
        //navigate('/post-submission', { state: { TicketId: data.ticket_id } });
      } catch (error) {
        console.error('Error submitting ticket:', error);
        alert('Error submitting ticket. Please try again.');
      }
    };

    if (ticketData) { // Only make the API call if ticketData is not null or undefined
      sendTicketData();
    }
  }, [ticketData]);

  // return equipment_id based on serial number
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

    let ticketDataToSend;

    if(serialFound) {
      // Create ticket object with empty equipment_id
      ticketDataToSend = {
        customer_name: username,
        customer_email: email,
        ticket_type_id: ticketType,
        equipment_id: equipmentID,
        description: description,
        priority_level_id: priority
      };
    } else {
      // Create ticket object with equipment_id
      ticketDataToSend = {
        customer_name: username,
        customer_email: email,
        ticket_type_id: ticketType,
        equipment_id: falseString,
        description: description,
        priority_level_id: priority
      };
    }

    setTicketData(ticketDataToSend);
  };

  // this contains the routing URL location
  const location = useLocation();

  const GoHome = () => {
    setSubmit(false)
    navigate('/')
  }

  const NewTicket = () => {
    setUserName('');
    setEmail('');
    setTicketType('');
    setSerialNumber('');
    setEquipmentID('');
    setDescription('');
    setPriority('');
    setSerialFound(false);
    setSubmit(false);
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
          <input type="email" placeholder="Enter Official Email" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={email} onChange={(e) => setEmail(e.target.value)} />
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

        <button className="btn btn-dark" type="submit">Submit</button>
      </form>
    </div>

      :
    <div style={{paddingBottom: '50%'}}>
      <h1>Welcome to the Post Submission Page</h1>
      <br></br>
      <h4>Your Ticket Id is {ticketId}. Use your Ticket Id to make any updates to your ticket.</h4>
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
