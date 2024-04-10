import React, { useState, useEffect } from 'react';

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    // Simulated fetch function (replace with your actual fetch logic)
    const fetchTickets = async () => {
      // Assuming fetchTickets returns an array of tickets
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data);
      setFilteredTickets(data); // Initially, display all tickets
    };

    fetchTickets();
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

  useEffect(() => {
    filterTickets();
  }, [searchQuery]);

  return (
    <>
      <div>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        {/* Display filtered tickets */}
        <div>
          {filteredTickets.map(ticket => (
            <div key={ticket.id}>
              <h3>{ticket.description}</h3>
              <p>Status: {ticket.status}</p>
              {/* Add other ticket details as needed */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllTickets;
