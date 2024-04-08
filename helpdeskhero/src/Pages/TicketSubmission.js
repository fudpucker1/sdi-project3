import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TicketSubmission() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    try {
      const response = await fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });
  
      // check if the POST was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // grab the POST response data, which will be the TicketId
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }

    // navigate to the ticket post submission page
    navigate('/post-submission', { state: { TicketId: data.TicketId } });
  };

  return (
    <div>
      <h1>Welcome to the Ticket Submission Page</h1>
      <form style={{ display: 'flex', flexDirection: 'column'}} 
            onSubmit={() => handleSubmit()}>

        <label>Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Equipment:
          <select value={equipment} onChange={(e) => setEquipment(e.target.value)}>
            <option value="">Select...</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="phone">Phone</option>
            <option value="tablet">Tablet</option>
          </select>
        </label>

        <label>Serial Number:
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </label>

        <label>Problem Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select...</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default TicketSubmission;
