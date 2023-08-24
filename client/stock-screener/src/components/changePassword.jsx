import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      // Perform password change logic here
      console.log('Password changed successfully');
      setPasswordMatch(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <center>
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <br></br>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
                    

        </div>
        <div>
        <br></br>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
        <br></br>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!passwordMatch && <p>Passwords do not match.</p>}
        </div>
        
     <Link to="/register">Cancel</Link> 
        <button type="submit">Change Password</button>

      </form>
    </div>
    </center> );
};

export default ChangePasswordPage;
