import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HomeIcon from './images/helpdeskicon.gif';

function Home() {
  const navigate = useNavigate();

  return (
    <>

<br/>
      <div style={{marginTop: 20 }} className="row">
      <div className='col-6'>
          <img src={HomeIcon} alt="homepageicon" style={{width: 230, height: 230}} />
        </div>
        <div className='col-6' style={{ textAlign: 'start' }}>
          <br/>
          <h4 className='mt-4'>Welcome to HelpDeskHero! 
            <br /><br/>
            We are here to help you with all IT questions and/or problems you are may have. Please submit a ticket to get started.
          </h4>
        </div>

      </div>
      <div className='row' style={{paddingBottom: '40%' }}>
        <div className='col-12'>
          <button className="btn-lg btn btn-dark mt-5" style={{marginRight: '10%', marginLeft: '10%', padding: 20}} onClick={() => navigate('/submit-ticket')}>Submit a Ticket</button>
        <button className="btn-lg btn btn-dark mt-5" style={{padding: 20}} onClick={() => navigate('/ticket-status')}>Ticket Status</button>

        </div>
      </div>
      </>
  );
}

export default Home;
