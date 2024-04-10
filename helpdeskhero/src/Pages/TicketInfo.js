import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TicketInfo() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [assignedTo, setAssignedTo] = useState('');
  const [updates, setUpdates] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:8080/tickets/${id}`)
      .then(response => response.json())
      .then(data => setTicket(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/updates`)
      .then(response => response.json())
      .then(data => setUpdates(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/help_desk_users`)
      .then(response => response.json())
      .then(data => setAllUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

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
      <p>Name: {ticket.customer_name}</p>
      <p>Email: {ticket.customer_email}</p>
      <p>Equipment Type: {ticket.type}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.severity}</p>

      <h2>Assign Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assigned To:
          < select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} >
            <option key='' value=''> Select User </option>
            {allUsers.map((user, index) => (
              <option key={index} value={user.user_id}> {user.username} </option>
            ))}
          </select>
          {/* <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} /> */}
        </label>

        <div className="update-list">
          <h2>Ticket Updates</h2>
          <ul>
            {updates.map(update => {
              if (update.ticket_id === id) {
              <li>
                <p>Date: {update.date_created} </p>
                <p>Technician: {update.username}</p>
                <p>Update: {update.body}</p>
              </li>
              }
            })}
          </ul>
        </div>
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
