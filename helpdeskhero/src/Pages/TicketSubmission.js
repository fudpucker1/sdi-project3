import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketSubmission() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentID, setEquipmentID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [serialFound, setSerialFound] = useState(false);

  // return eqiupment_id based on serial number
  const serialLookup = async (event) => {
    event.preventDefault();

    if (!serialNumber.trim()) {
      alert('Please enter a serial number to search.');
      return;
    }

    // Get the equipmentID from the API server
    try {
      const response = await fetch(`http://localhost:8080/serialnumber/${serialNumber}`);

      // check if the GET was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setEquipmentID(data[0].equipment_id);
      setSerialFound(true);
    } catch (error) {
      console.error('Error finding equipment:', error);
      alert('Error finding equipment. Please try again.');
      setSerialFound(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (serialNumber && !serialFound) {
      alert('Please search for the serial number before submitting the ticket.');
      return;
    }

    // Create ticket object
    const ticket_data = {
      customer_name: username,
      customer_email: email,
      ticket_type_id: ticketType,
      equipment_id: equipmentID,
      description: description,
      priority_level_id: priority
    };

    try {
      const response = await fetch('http://localhost:8080/createticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket_data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(equipmentID);
      navigate('/post-submission', { state: { TicketId: data.ticket_id } });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Error submitting ticket. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome to the Ticket Submission Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Ticket Type:
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Technical Issue</option>
            <option value="2">User Support</option>
            <option value="3">Software Enhancement</option>
            <option value="4">Hardware Maintenance</option>
            <option value="5">Network Connectivity</option>
          </select>
        </label>

        <label>Serial Number:
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
          {serialFound && <span style={{ color: 'green' }}>✓</span>} {/* Display green checkmark if serial found */}
        </label>
        <button onClick={serialLookup}>Search</button>

        <label>Problem Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
            <option value="5">Emergency</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketSubmission;

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TicketSubmission() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentID, setEquipmentID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  // return eqiupment_id based on serial number
  const serialLookup = async (event) => {
    event.preventDefault();

    // create a serial number object
    const serial_number = {
      "serial_number": serialNumber
    }

    // Get the equipmentID from the API server
    try {
      const response = await fetch('http://localhost:8080/serialnumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serial_number),
      });

      // check if the GET was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // grab the GET response data, which will be the equipmentID
      const data = await response.json();
      console.log(data);
      setEquipmentID(data.equipment_id);

    } catch (error) {
      console.error('Error finding eqiupment:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create a ticket object
    const ticket_data = {
      "customer_name": username,
      "customer_email": email,
      "ticket_type_id": ticketType,
      "equipment_id": equipmentID,
      "description": description,
      "priority_level_id": priority
    };

    // POST the ticket object to the API server
    try {
      const response = await fetch('http://localhost:8080/createticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket_data),
      });

      // check if the POST was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // grab the POST response data, which will be the TicketId
      const data = await response.json();
      console.log(data);

      // navigate to the ticket post submission page
      navigate('/post-submission', { state: { TicketId: data.ticket_id } });
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Ticket Submission Page</h1>
      <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={() => handleSubmit()}>

        <label>Name:
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Ticket Type:
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Technical Issue</option>
            <option value="2">User Support</option>
            <option value="3">Software Enhancement</option>
            <option value="4">Hardware Maintenance</option>
            <option value="5">Network Connectivity</option>
          </select>
        </label>

        <label>Serial Number:
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </label>
        <button onClick={() => serialLookup}>Search</button>

        <label>Problem Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
            <option value="5">Emergency</option>
          </select>
        </label>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default TicketSubmission;
*/