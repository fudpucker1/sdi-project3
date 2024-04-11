import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function TicketStatus() {
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState('');
  const [ticketFound, setTicketFound] = useState(false);
  const [ticketData, setTicketData] = useState();
  const [ticketUpdates, setTicketUpdates] = useState();
  const [ticketHasUpdates, setTicketHasUpdates] = useState(false);

  useEffect(() => {
    console.log('Updated ticketData:', ticketData);
    console.log('Updated ticketUpdaets:', ticketUpdates)
  }, [ticketData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Ticket Id:', ticketId);

    try {
      const response = await fetch(`http://localhost:8080/statustickets/${ticketId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTicketData(data);
      setTicketFound(true);
      setTicketHasUpdates(false);
      setTicketUpdates(null);
      getTicketUpdates();
    } catch (error) {
      console.error('Error finding ticketID:', error);
      alert('Error finding your Ticket ID. Please try again.');
    }
  };

  const getTicketUpdates = async () => {
    try {
      const response = await fetch(`http://localhost:8080/ticketupdates/${ticketId}`);
      const data = await response.json();
      setTicketUpdates(data);
      setTicketHasUpdates(true);
    } catch (error) {
      console.error('Error finding updates for ticketID:', error);
      alert('No updates were found for your Ticket ID.');
      setTicketHasUpdates(false);
    }
  };

  return (
    <div style={{ paddingBottom: '50%' }}>
      <h1>Welcome to the Ticket Status Page</h1>
      <div className='row mt-5'>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Enter Ticket Number" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }} value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
            </label>
            <br />
            <button type="submit" className='btn btn-dark mt-3' style={{ marginLeft: '45%' }}>Submit</button>
          </form>
          {ticketFound ? (
            <div className='col-6'>
              <h3 className='mt-3' style={{ marginRight: 80 }}>Ticket Info</h3>
              <div className='status-info' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '90%', marginRight: 80 }}>
                <div>
                  <p>Name: {ticketData[0].customer_name}</p>
                  <p>Email: {ticketData[0].customer_email}</p>
                  <p>Equipment Type: {ticketData[0].type ? ticketData[0].type : "No Assoicated Equipment"}</p>
                  <p>Status: {ticketData[0].status}</p>
                  <p>Priority: {ticketData[0].severity}</p>
                  <p>Currently assigned to: {ticketData[0].username ? ticketData[0].username : "Unassigned"}</p>
                </div>
                <div className='ticket-updates' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '90%', marginRight: 80 }}>
                  <p>Ticket Updates</p>
                  {ticketHasUpdates && ticketUpdates && ticketUpdates.length > 0 ? (
                    ticketUpdates.map(update => (
                      <div key={update.id}>
                        <p>{update.body}</p>
                        <p>{update.date_created}</p>
                      </div>
                    ))
                  ) : (
                    <p>There are no updates for your ticket.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='col-6'></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketStatus;