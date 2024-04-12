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
      <div className='row mt-5' style={{display: 'flex', flexDirection: 'row'}}>
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Enter Ticket Number" style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center', marginRight: 10 }} value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
            </label>
            
            <button type="submit" className='btn btn-dark ' >Submit</button>
          
          </form>
        </div>
      </div>
      {ticketFound ? (

      <div style={{margin: 15}}>
      <table className="table table-light table-striped" style={{border: '1px solid black', textAlign: 'start'}}>
        <thead>
          <tr>
            <th style={{paddingRight: 20}}>Name</th>
            <th style={{paddingRight: 5}}>Email</th>
            <th style={{paddingRight: 20}}>Equipment Type</th>
            <th style={{paddingRight: 20}}>Status</th>
            <th style={{paddingRight: 20}}>Priority</th>
            <th style={{paddingRight: 20}}>Currently Assigned to</th>
          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td>
              {ticketData[0].customer_name}
              </td>
              <td> {ticketData[0].customer_email}</td>
              <td>{ticketData[0].type ? ticketData[0].type : "No Assoicated Equipment"}</td>
              <td>{ticketData[0].status}</td>
              <td>{ticketData[0].severity}</td>
              <td>{ticketData[0].username ? ticketData[0].username : "Unassigned"}</td>
            </tr>
        </tbody>
          </table>
          <div>
            <h4>Ticket Updates</h4>
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
        
        
        
        
        // <div className="row">
        //     <div className='col-12'>
        //       <h3 className='mt-3' style={{ marginRight: 40 }}>Ticket Info</h3>
        //       <div className='status-info' style={{ border: '1px solid black', borderRadius: 5, paddingBottom: '90%', margin: 30 }}>
        //         <div className='mt-4'>
        //           <p> <strong>Name:</strong> {ticketData[0].customer_name}</p>
        //           <p><strong>Email:</strong> {ticketData[0].customer_email}</p>
        //           <p><strong>Equipment Type:</strong> {ticketData[0].type ? ticketData[0].type : "No Assoicated Equipment"}</p>
        //           <p><strong>Status: </strong>{ticketData[0].status}</p>
        //           <p><strong>Priority: </strong>{ticketData[0].severity}</p>
        //           <p><strong>Currently assigned to:</strong> {ticketData[0].username ? ticketData[0].username : "Unassigned"}</p>
        //           <p><strong>Ticket Updates</strong></p>
        //           {ticketHasUpdates && ticketUpdates && ticketUpdates.length > 0 ? (
        //             ticketUpdates.map(update => (
        //               <div key={update.id}>
        //                 <p>{update.body}</p>
        //                 <p>{update.date_created}</p>
        //               </div>
        //             ))
        //           ) : (
        //             <p>There are no updates for your ticket.</p>
        //           )}  
              
        //         </div>
                
                
        //       </div>
        //   </div>
        //   </div>
          ) : (
            <div className='col-6'></div>
          )}
        </div>

  );
}

export default TicketStatus;