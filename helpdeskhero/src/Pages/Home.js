import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>

<br/>
    <div style={{paddingBottom: '50%', marginTop: 20}}>
      <button className="btn-lg btn btn-dark mt-5" style={{marginRight: '10%', marginLeft: '10%', padding: 20}} onClick={() => navigate('/submit-ticket')}>Submit a Ticket</button>
        <button className="btn-lg btn btn-dark mt-5" style={{ marginRight: '10%', padding: 20}} onClick={() => navigate('/ticket-status')}>Ticket Status</button>
      <br/>
      {/* <button className="btn-lg btn btn-dark mt-5" style={{ padding: 20 }} onClick={() => navigate('/faq')}>FAQs</button> */}


      </div>
      </>
  );
}

export default Home;
