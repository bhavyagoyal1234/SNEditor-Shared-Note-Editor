import React, { useState } from 'react';
import axios from 'axios';

const ShareButton = () => {
  const [email, setEmail] = useState('');
 

  const handleClick = async () => {
    const noteId = localStorage.getItem('note_id');
    if (!noteId) {
      alert('Please save the note first.');
    }
     
    try {
      const response = await axios.post('http://localhost:3001/notes/update', { email:email,note_id:noteId});
      console.log('Note updated successfully:', response.data);
      alert("Email Added");
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <>
      {/* Display input field for email address */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="ml-2 p-2 mt-5 mb-2 border border-gray-300 rounded-lg focus:outline-none"
      />
    <button onClick={handleClick} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
      Share via Email
      </button>
  </>
  );
};

export default ShareButton;
