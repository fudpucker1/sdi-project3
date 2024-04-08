import React from 'react';
import { useLocation } from 'react-router-dom';

function PostSubmission() {
  // this contains the routing URL location
  const location = useLocation(); 
  // this contains the state passed from <TicketSubmission/> for the TicketId
  const TicketId = location.state.TicketId;

  return (
    <div>
      <h1>Welcome to the Post Submission Page</h1>
      <p>Your Ticket Id is {TicketId}. Use your Ticket Id to make any updates to your ticket.</p>
      <p>You will receive an automated email from helpdeskhero@spacemail.gov. You may now close this window.</p>
    </div>
  );
}

export default PostSubmission;
