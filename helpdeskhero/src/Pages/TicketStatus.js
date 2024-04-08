import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function TicketStatus() {
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Ticket Id:', ticketId);
    navigate(`/ticket-info/${ticketId}`);
  };



  return (
    <div style={{paddingBottom: '50%'}}>
      <h1>Welcome to the Ticket Status Page</h1>
      <div className='row mt-5'>
        <div className="col-6">
      <form onSubmit={() => handleSubmit()}>
        <label>
          
          <input type="text" placeholder="Enter Ticket Number" style={{paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center'}} value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        </label>
        <br/>
        <button type="submit" className='btn btn-dark mt-4'>Submit</button>
        </form>
        </div>
      
      <div className='col-6'>
          <div className='status-info' style={{border: '1px solid black', borderRadius: 5, paddingBottom: '60%', marginRight: 15}}>
            <h4 className='mt-3'>Status Info</h4>
        </div>
        </div>
        </div>
    </div>
  );
}

export default TicketStatus;