import React, { useState, useEffect } from 'react';

function AllTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets?limit=100')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the All Tickets Page</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            {ticket.name} - {ticket.email} - {ticket.equipment} - {ticket.description} - {ticket.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTickets;
