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
      ticket.ticket_id.toString().includes(query.toString()) ||
      ticket.status.toLowerCase().includes(query.toLowerCase()) ||
      ticket.customer_name.toLowerCase().includes(query.toLowerCase()) ||
      // ticket.username.toLowerCase().includes(query.toLowerCase()) ||
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


  // SORTING FEATURES
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); // default direction is ascending

  // key is the table["key"]
  // direction is either 'ascending' or 'descending'
  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') { // if its already ascending
      direction = 'descending'; // then clicking sort will change it to descending
    }
    setSortConfig({ key, direction }); // set the key and direction into the sortConfig state

    // let sortedTickets = [...filteredTickets]; // sorted tickets is the array of filteredTickets, todo: might need to pull from a state
    if (sortConfig !== null) {
      // sort the sortedTickets array
      filteredTickets.sort((a, b) => { // the sort method mutates this array
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

  };






  return (
    <div style={{paddingBottom: '70%'}}>
      <h1>Welcome to the All Tickets Page</h1>
      <br/>
      <div>
        <input
          type="search"
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
            <th style={{paddingRight: 20, paddingLeft: 25}}><button type="button" onClick={() => onSort('ticket_id')}>ID</button></th>
            <th style={{paddingRight: 5}}><button type="button" onClick={() => onSort('date_created')}>Date</button></th>
            <th style={{ paddingRight: 20 }}><button type="button" onClick={() => onSort('status')}>Status</button></th>
            <th style={{paddingRight: 20}}><button type="button" onClick={() => onSort('customer_name')}>Customer</button></th>
            <th style={{paddingRight: 30}}><button type="button" onClick={() => onSort('username')}>Technician</button></th>
            {/* <th style={{paddingRight: 20}}>E-mail</th> */}
            <th style={{paddingRight: 20}}><button type="button" onClick={() => onSort('type')}>Equipment</button></th>
            <th style={{paddingRight: 20}}><button type="button" onClick={() => onSort('description')}>Description</button></th>
            <th style={{paddingRight: 20}}><button type="button" onClick={() => onSort('severity')}>Severity</button></th>
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