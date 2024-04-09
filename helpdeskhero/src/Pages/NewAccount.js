import React, { useState, useEffect } from "react";

export default function NewAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Create A New Account</h1>
      <form style={{ display: 'flex', flexDirection: 'column'}}
            // onSubmit={() => handleSubmit()}
            >

        <label>Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>Account-Type:
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="">Select...</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="supervisor">Supervisor</option>
            <option value="project manager">Project Manager</option>
            <option value="auditor">Auditor</option>
            <option value="staff">Staff</option>
            <option value="intern">Intern</option>
            <option value="kendrick">Kendrick</option>
          </select>
        </label>

        <label>Username:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}