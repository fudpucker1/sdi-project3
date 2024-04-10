import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import TicketStatus from "./Pages/TicketStatus";
import StaffHome from "./Pages/StaffHome";
import AllTickets from "./Pages/AllTickets";
import TicketSubmission from "./Pages/TicketSubmission";
import PostSubmission from "./Pages/PostSubmission";
import TicketInfo from "./Pages/TicketInfo";
import FAQ from "./Pages/FAQ";
import NewAccount from "./Pages/NewAccount";
import 'bootstrap/dist/css/bootstrap.css';


export default function App() {
  return (
    <div className="App">
      <h1 className='text-center'>HelpDeskHero</h1>

      <nav>
        <div className = 'navbar'>
          <ul style={{ listStyleType: "none" }} className="list-group list-group-horizontal">
            <li style={{display: 'flex', marginRight: '10px'}} className="list-group-item"><Link to="/">Home</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/submit-ticket">Submit Ticket</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/ticket-status">Ticket Status</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/all-tickets">All Tickets</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/post-submission">Post Submission</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/faq">FAQs</Link></li>
            <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/staff">Staff Home</Link></li>
        </ul>
        </div>
        <br></br>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ticket-status" element={<TicketStatus/>} />
        <Route path="/staff" element={<StaffHome/>} />
        <Route path="/all-tickets" element={<AllTickets/>} />
        <Route path="/submit-ticket" element={<TicketSubmission/>} />
        <Route path="/post-submission" element={<PostSubmission/> } />
        <Route path="/ticket-info/:id" element={<TicketInfo/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/new-account" element={<NewAccount/>} />
      </Routes>
    </div>
  );
}
