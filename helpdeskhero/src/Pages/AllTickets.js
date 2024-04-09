import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tickets/')
      .then(response => response.json())
      .then(data => {
        console.log('tickets: ', data);
        setTickets(data);
        setFilteredTickets(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterTickets = () => {
    const filtered = tickets.filter(ticket =>
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTickets(filtered);
  };

  return (
    <div>
      <h1>Welcome to the All Tickets Page</h1>
      <div>
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <ul>
        {filteredTickets.map(ticket => (
          <li key={ticket.ticket_id}>
            <Link to={`/ticket-info/${ticket.ticket_id}`}>
              ID: {ticket.ticket_id} - Date: {ticket.create_date} - Status: {ticket.status} - Name: {ticket.customer_name} - E-mail: {ticket.customer_email} - Equipment: {ticket.equipment_id} - Description: {ticket.description} - Severity: {ticket.severity}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTickets;
