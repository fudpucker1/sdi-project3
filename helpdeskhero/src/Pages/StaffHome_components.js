import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { loggedInContext } from "./Logged-In-context";
import { useNavigate } from "react-router-dom";


export const YourTickets = () => {
  const { refreshToggle, userId } = useContext(loggedInContext);
  const [assignedTickets, setAssignedTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/stafftickets")
      .then((res) => res.json())
      .then((jsoned) => {
        setAssignedTickets(
          jsoned.filter(
            (ticket) =>
              ticket.assigned_to === userId && ticket.status === "Open"
          )
        );
      });
  }, [refreshToggle]);

  const handleOnClick = (key) => {
    navigate(`/ticket-info/${key}`);
  };

  if (assignedTickets.length === 0) {
    return <div>No Assigned Tickets.</div>;
  }
  return (
    <div>
      {assignedTickets.map((ticket) => {
        return (
          <div
            key={ticket.ticket_id}
            onClick={() => handleOnClick(ticket.ticket_id)}
            style={{
              border: "1px solid black",
              borderRadius: 5,
              margin: "5px",
            }}
          >
            <p>
              Status: {ticket.status}
              Priority: {ticket.severity}
              Equipment: {ticket.type}
              Ticket Type: {ticket.request_type}
              Description: {ticket.description}
              Create Date: {ticket.create_date}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const UnassignedTickets = () => {
  const { refreshToggle, setRefreshToggle, userId } = useContext(loggedInContext);
  const [newTickets, setNewTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/stafftickets")
      .then((res) => res.json())
      .then((jsoned) => {
        setNewTickets(jsoned.filter((ticket) => ticket.assigned_to === null));
      });
  }, [refreshToggle]);

  const handleSubmit = (key) => {
    const date = new Date();
    const ticket_update = {
      status: newTickets.status,
      date_created: date,
      body: `Ticket assigned to technician`,
      help_desk_users_id: userId,
      ticket_id: key,
      assigned_to: userId
    };

    Promise.all([
      fetch(`http://localhost:8080/tickets`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(ticket_update)
      })
        .then(response => response.json())
        .then(data => { console.log('Success:', data); })
        .catch((error) => { console.error('Error:', error); }),

      fetch(`http://localhost:8080/ticket_updates`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(ticket_update)
      })
        .then(response => response.json())
        .then(data => { console.log('Success:', data); })
        .catch((error) => { console.error('Error:', error); })
    ])
      .then(() => setRefreshToggle(!refreshToggle))
      .catch(error => console.error('Error refreshing page:', error));
  };

  const handleOnClick = (key) => {
    console.log("Clicked", key);
    navigate(`/ticket-info/${key}`);
  };

  if (newTickets.length === 0) {
    return <div>No New Tickets.</div>;
  }
  return (
    <div>
      {newTickets.map((ticket) => {
        return (
          <>
            <div
              key={ticket.ticket_id}
              onClick={() => handleOnClick(ticket.ticket_id)}
              style={{
                border: "1px solid black",
                borderRadius: 5,
                margin: "5px",
                marginBottom: 0,
              }}
            >
              <p>
                Status: {ticket.status}
                Priority: {ticket.severity}
                Equipment: {ticket.type}
                Ticket Type: {ticket.request_type}
                Description: {ticket.description}
                Create Date: {ticket.create_date}
              </p>
            </div>
            <button variant="primary" onClick={() => handleSubmit(ticket.ticket_id)}>Assign To Me</button>
          </>
        );
      })}
    </div>
  );
};

export const NewsBar = () => {
  return (
    <div id="scroll-container">
      <div id="scroll-text">
        ................................................ This is scrolling
        text.....................................................................................
        ALERT: We will be starting our new schedule of 15hr shifts effective
        17:00 today................................... The finance office is on
        their 24th week of "Training" Vacation days on their Cruise tour around
        European Coastlines................................. The next 15
        snow-days are canceled as per CMSSF
        Orders...............................................................
        Our next Government Shutdown is scheduled to start in "-15"
        days...............................................................
        Welcome aboard Hell
        Diver!..................................................
      </div>
    </div>
  );
};

export const Loginbutton = () => {
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
   setLoggedIn(false)
   navigate('/')
  }

  return loggedIn ? (
    <button type="button" onClick={() => handleOnClick()} class="btn btn-dark">Log Out</button>
  ) : (
    <button type="button" onClick={() => navigate('/staff')} class="btn btn-dark">Log In</button>
  );
};
