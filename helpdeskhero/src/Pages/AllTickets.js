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
        console.log('tickets: ', data);
        setTickets(data);
        setFilteredTickets(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const handleDeleteSelected = () => {
    // Implement delete logic here using selectedTickets array
    console.log('Deleting selected tickets:', selectedTickets);
  };

  const handleChangeAssignedTo = () => {
    // Implement change assigned_to logic here using selectedTickets array
    console.log('Changing assigned_to for selected tickets:', selectedTickets);
  };

  return (
    <div style={{paddingBottom: '60%'}}>
      <h1>Welcome to the All Tickets Page</h1>
      <br/>
      <div>
        <input
          type="text"
          style={{paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center'}}
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <br/>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{paddingRight: 20, paddingLeft: 150}}>ID</th>
            <th style={{paddingRight: 20}}>Date</th>
            <th style={{paddingRight: 20}}>Status</th>
            <th style={{paddingRight: 20}}>Customer</th>
            <th style={{paddingRight: 20}}>Assigned to:</th>
            <th style={{paddingRight: 20}}>E-mail</th>
            <th style={{paddingRight: 20}}>Equipment</th>
            <th style={{paddingRight: 20}}>Description</th>
            <th style={{paddingRight: 20}}>Severity</th>
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
              <td>{ticket.assigned_to}</td>
              <td>{ticket.customer_email}</td>
              <td>{ticket.equipment_id}</td>
              <td>{ticket.description}</td>
              <td>{ticket.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop: 30}} >
      <button className="btn btn-dark" style={{marginRight: 10}} onClick={handleDeleteSelected}>Delete Selected</button>
        <button className="btn btn-dark" onClick={handleChangeAssignedTo}>Change Assigned To</button>
        </div>
    </div>
  );
}

export default AllTickets;
