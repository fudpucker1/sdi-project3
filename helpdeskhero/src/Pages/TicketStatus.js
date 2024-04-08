import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketStatus() {
  const navigate = useNavigate();
  
  const [ticketId, setTicketId] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Ticket Id:', ticketId);
    navigate(`/ticket-info/${ticketId}`);
  };



  return (
    <div>
      <h1>Welcome to the Ticket Status Page</h1>
      <form onSubmit={() => handleSubmit()}>
        <label>
          Ticket Id:
          <input type="text" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketStatus;