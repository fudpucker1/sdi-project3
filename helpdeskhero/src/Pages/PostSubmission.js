import React from 'react';

function PostSubmission({ TicketId }) {
  return (
    <div>
      <h1>Welcome to the Post Submission Page</h1>
      <p>{`Your Ticket Id is ${TicketId}. You will receive an automated email from helpdeskhero@spacemail.gov. Use your Ticket Id to make any updates to your ticket.`}</p>
      <p>You may now close this window.</p>
    </div>
  );
}

export default PostSubmission;
