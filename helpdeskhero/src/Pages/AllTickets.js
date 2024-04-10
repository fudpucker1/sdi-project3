import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tickets/')
      .then(response => response.json())
      .then(data => {
        setTickets(data);
        setFilteredTickets(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterTickets(query);
  };

  useEffect(() => {
    console.log('Filtered tickets:', filteredTickets);
  }, [filteredTickets]);

  const filterTickets = (query) => {
    const filtered = tickets.filter(ticket =>
      ticket.description.toLowerCase().includes(query.toLowerCase()) ||
      ticket.customer_name.toLowerCase().includes(query.toLowerCase()) ||
      ticket.customer_email.toLowerCase().includes(query.toLowerCase()) ||
      ticket.equipment_id.toLowerCase().includes(query.toLowerCase()) ||
      ticket.severity.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTickets(filtered);
  };

  const handleCheckboxChange = (ticketId) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Assigned to:</th>
            <th>E-mail</th>
            <th>Equipment</th>
            <th>Description</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map(ticket => (
            <tr key={ticket.ticket_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTickets.includes(ticket.ticket_id)}
                  onChange={() => handleCheckboxChange(ticket.ticket_id)}
                />
              </td>
              <td>
                <Link to={`/ticket-info/${ticket.ticket_id}`}>
                  {ticket.ticket_id}
                </Link>
              </td>
              <td>{ticket.create_date}</td>
              <td>{ticket.status}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.username}</td>
              <td>{ticket.customer_email}</td>
              <td>{ticket.model}, {ticket.serial_number}</td>
              <td>{ticket.description}</td>
              <td>{ticket.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AllTickets;
