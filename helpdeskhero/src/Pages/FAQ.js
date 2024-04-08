import React from 'react';

function FAQ() {
  return (
    <div>
      <h1>Welcome to the FAQ Page</h1>
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>
          <h3>How do I submit a new IT ticket?</h3>
          <p>You can submit a new IT ticket by going to the "Submit Ticket" page and filling out the form with details about your issue.</p>
        </li>
        <li>
          <h3>How do I check the status of my ticket?</h3>
          <p>You can check the status of your ticket by going to the "Ticket Status" page and entering your ticket ID.</p>
        </li>
        <li>
          <h3>What is the average response time for tickets?</h3>
          <p>The average response time for tickets is typically within 24 hours, but it may vary depending on the nature of the issue and the current volume of tickets.</p>
        </li>
        <li>
          <h3>Who can I contact for urgent issues?</h3>
          <p>For urgent issues, please call our IT support hotline. The number can be found on the "Staff Home" page.</p>
        </li>
        <li>
          <h3>What information should I include in my ticket?</h3>
          <p>When submitting a ticket, please include as much detail as possible about the issue you're experiencing, including the steps to reproduce the issue, any error messages you've received, and the impact of the issue on your work.</p>
        </li>
      </ul>
    </div>
  );
}

export default FAQ;
