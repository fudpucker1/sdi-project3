import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/submit-ticket')}>Submit a Ticket</button>
      <button onClick={() => navigate('/ticket-status')}>Ticket Status</button>
      <button onClick={() => navigate('/faq')}>FAQs</button>
      <button onClick={() => navigate('/login')}>LOGIN</button>
    </div>
  );
}

export default Home;
