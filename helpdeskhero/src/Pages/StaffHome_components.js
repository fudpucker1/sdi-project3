import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { loggedInContext } from "./Logged-In-context";
import { useNavigate } from "react-router-dom";

export const YourTickets = () => {
  const { loggedIn, userType, userId } = useContext(loggedInContext);
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
  }, []);

  const handleOnClick = (key) => {
    console.log("Clicked", key)
    navigate(`/ticket-info/${key}`)
  };

  if (assignedTickets.length === 0) {
    return <div>No Assigned Tickets.</div>;
  }
  return (
    <div>
      {assignedTickets.map((ticket) => {
        console.log(ticket.ticket_id)
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
  const [newTickets, setNewTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/stafftickets")
      .then((res) => res.json())
      .then((jsoned) => {
        setNewTickets(jsoned.filter((ticket) => ticket.assigned_to === null));
      });
  }, []);

  const handleOnClick = (key) => {
    console.log("Clicked", key)
    navigate(`/ticket-info/${key}`)
  };

  if (newTickets.length === 0) {
    return <div>No New Tickets.</div>;
  }
  return (
    <div>
      {newTickets.map((ticket) => {
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

export const NewsBar = () => {
  return <p>NEWS GOES HERE!!</p>;
};
