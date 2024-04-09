import './App.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import TicketStatus from './Pages/TicketStatus';
import StaffHome from './Pages/StaffHome';
import AllTickets from './Pages/AllTickets';
import TicketSubmission from './Pages/TicketSubmission';
import PostSubmission from './Pages/PostSubmission';
import TicketInfo from './Pages/TicketInfo';
import FAQ from './Pages/FAQ';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <h1 className='text-center '>HelpDeskHero</h1>
    
    
      <nav>
        <ul style= {{ listStyleType: "none" }} >
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/ticket-status">Ticket Status</Link></li>
            <li><Link to="/staff-home">Staff Home</Link></li>
            <li><Link to="/all-tickets">All Tickets</Link></li>
            <li><Link to="/submit-ticket">Submit Ticket</Link></li>
            <li><Link to="/post-submission">Post Submission</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/login">LOGIN</Link></li>

        </ul>
      </nav>

      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/ticket-status" element={<TicketStatus/>} />
        <Route path="/staff-home" element={<StaffHome/>} />
        <Route path="/all-tickets" element={<AllTickets/>} />
        <Route path="/submit-ticket" element={<TicketSubmission/>} />
        <Route path="/post-submission" element={<PostSubmission/> } />
        <Route path="/ticket-info/:id" element={<TicketInfo/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}