import React from 'react';
import { useLocation } from 'react-router-dom';

function PostSubmission() {
  // this contains the routing URL location
  const location = useLocation();
  // this contains the state passed from <TicketSubmission/> for the TicketId
  const TicketId = location.state.TicketId;;

  return (
    <div style={{paddingBottom: '50%'}}>
      <h1>Welcome to the Post Submission Page</h1>
      <br></br>
      <h4>Your Ticket Id is {TicketId}. Use your Ticket Id to make any updates to your ticket.</h4>
      <h4>You will receive an automated email from helpdeskhero@spacemail.gov.</h4>
      <h4>You may now close this window.</h4>
      <br></br>
      <br></br>

      <div className = 'Buttons' style={{display: 'flex', justifyContent: 'center', columnGap: '50px'}}>
      <button type="button" className="btn btn-dark btn-lg">Go Home</button>
      <button type="button" className="btn btn-dark btn-lg">Submit New Ticket</button>
      </div>
    </div>
  );
}

export default PostSubmission;
