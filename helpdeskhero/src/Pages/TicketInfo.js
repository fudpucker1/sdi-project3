import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TicketInfo() {
  const { id } = useParams();

  const [ticket, setTicket] = useState();
  const [assignedTo, setAssignedTo] = useState();
  const [updates, setUpdates] = useState([]);
  const [userUpdates, setUserUpdates] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [status, setStatus] = useState();
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tickets/${id}`);
        const data = await response.json();
        setTicket(data);
        setAssignedTo(data[0].assigned_to);
        setStatus(data[0].status);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchData();
  }, [submitted]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(`http://localhost:8080/updates`);
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };
    fetchUpdates();
  }, [submitted]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/help_desk_users`);
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Assigned To:', assignedTo); // todo: POST to tickets if new assignment
    console.log('Updates:', userUpdates); // todo: POST to ticket_updates

    const date = new Date();

    const ticket_update = {
      ticket_id: id,
      status: status,
      date_created: date,
      body: userUpdates,
      help_desk_users_id: assignedTo,
      ticket_id: id,
      assigned_to: assignedTo
    };

    Promise.all([
      fetch(`http://localhost:8080/tickets`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(ticket_update)
      })
        .then(response => response.json())
        .then(data => { console.log('Success:', data); })
        .catch((error) => { console.error('Error:', error); }),

      fetch(`http://localhost:8080/ticket_updates`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(ticket_update)
      })
        .then(response => response.json())
        .then(data => { console.log('Success:', data); })
        .catch((error) => { console.error('Error:', error); })
    ])
      //.then(() => window.location.reload(true))
      .catch(error => console.error('Error refreshing page:', error));

      setSubmitted(!submitted);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch(`http://localhost:8080/tickets/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => setIsDeleted(true))
        .catch(error => { console.error('Error deleting ticket:', error); });
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <h1>Your ticket ID is: {id}</h1>
    <div style={{ paddingBottom: '50%' }}>
      <h1>Your ticket ID is: {id}</h1>
      <h3>Ticket Details</h3>
      <div style={{margin: 15}}>
      <table className="table table-light table-striped" style={{border: '1px solid black', textAlign: 'start'}}>
      <thead>
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Equipment Type</th>
      <th>Status</th>
      <th>Priority</th>
      <th>Assigned To</th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{ticket[0].customer_name}</td>
      <td>{ticket[0].customer_email}</td>
      <td>{ticket[0].type}</td>
      <td>{ticket[0].status}</td>
      <td>{ticket[0].severity}</td>
      <td>{ticket[0].username}</td>
      <td style={{textAlign: 'center'}}>

      {
        isDeleted ? <p>Ticket deleted.</p> : <button class="btn btn-danger btn-sm" onClick={() => handleDelete()}>Delete Ticket</button>
      }
      </td>
      </tr>
      </tbody>
      </table>
      </div>

      <div className="row" style={{ marginTop: 55 }}>
        <div className='col-12'>
      
      <form className="justify-content-around" style={{display: 'flex', flexDirection: 'row'}} onSubmit={handleSubmit}>

            <label>
              <h2>Assign Ticket</h2>
          <p>Assign a tech to the ticket</p>
          Assign To:
          <select style={{marginLeft: 15, textAlign:'center'}} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option key='' value=''> Select User... </option>
            {allUsers.map((user, index) => (
              <option key={index} value={user.user_id}> {user.username} </option>
            ))}
          </select>
        </label>

        
            <label>
                <h2>Status Update</h2>
            <p>Update the status of the ticket</p>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option key='0' value={ticket[0].status}> Select Updated Status... </option>
            <option key='1' value='Open'> Open </option>
            <option key='2' value='In Progress'> In Progress </option>
            <option key='3' value='Closed'> Closed </option>
          </select>
        </label>

        <div className="update-list">
          <h2>Ticket Updates</h2>
          <ul>
            {updates.map((update, index) => {
              if (update.ticket_id == id) {
                return (
                  <li key={index}>
                    <p>Date: {update.date_created} </p>
                    <p>Technician: {update.username} </p>
                    <p>Update: {update.body} </p>
                    <p></p>
                  </li>
                )
              } else {
                return null;
              }
            })}
              </ul>
              <br/>
                  <label>Updates:
          <input type="text" style={{marginLeft: 10}} value={userUpdates} onChange={(e) => setUserUpdates(e.target.value)} placeholder="Your text here..." />
        </label>

        <button className="btn btn-dark btn-sm" style={{marginLeft: 10}} type="submit">Submit</button>
        </div>

        </form>
        </div>
        </div>
    </div>
  );
}

export default TicketInfo;