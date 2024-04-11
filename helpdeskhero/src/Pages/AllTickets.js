import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tickets')
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
    <div style={{paddingBottom: '70%'}}>
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
      <br />
      <div style={{margin: 10}}>
      <table className="table table-light table-striped" style={{border: '1px solid black', textAlign: 'start'}}>
        <thead>
          <tr>
            <th></th>
            <th style={{paddingRight: 20, paddingLeft: 25}}>ID</th>
            <th style={{paddingRight: 5}}>Date</th>
            <th style={{paddingRight: 20}}>Status</th>
            <th style={{paddingRight: 20}}>Customer</th>
            <th style={{paddingRight: 30}}>Technician</th>
            {/* <th style={{paddingRight: 20}}>E-mail</th> */}
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
                  style={{marginLeft: 20}}
                  checked={selectedTickets.includes(ticket.ticket_id)}
                  onChange={() => handleCheckboxChange(ticket.ticket_id)}
                />
              </td>
              <td style={{textAlign: 'center'}}>
                <Link to={`/ticket-info/${ticket.ticket_id}`}>
                  {ticket.ticket_id}
                </Link>
              </td>
              <td>{ticket.create_date}</td>
              <td>{ticket.status}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.username}</td>
              {/* <td>{ticket.customer_email}</td> */}
              <td>{ticket.model}, {ticket.serial_number}</td>
              <td>{ticket.description}</td>
              <td>{ticket.severity}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
      {/* <div style={{marginTop: 30}} >
      <button className="btn btn-dark" style={{marginRight: 10}} onClick={handleDeleteSelected}>Delete Selected</button>
        <button className="btn btn-dark" onClick={handleChangeAssignedTo}>Change Assigned To</button>
        </div> */}
    </div>
  );
}

export default AllTickets;