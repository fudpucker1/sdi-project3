import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TicketInfo() {
  let { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [assignedTo, setAssignedTo] = useState('');
  const [updates, setUpdates] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/tickets/${id}`)
      .then(response => response.json())
      .then(data => setTicket(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Assigned To:', assignedTo);
    console.log('Updates:', updates);
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Ticket Info Page. Your ticket ID is: {id}</h1>
      
      <h2>Ticket Details</h2>
      <p>Name: {ticket.name}</p>
      <p>Email: {ticket.email}</p>
      <p>Equipment Type: {ticket.equipment}</p>
      <p>Description: {ticket.description}</p>
      <p>Priority: {ticket.severity}</p>

      <h2>Assign Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assigned To:
          <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        </label>
        <label>
          Updates:
          <textarea value={updates} onChange={(e) => setUpdates(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketInfo;
