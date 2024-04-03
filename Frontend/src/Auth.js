import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Note from '../../Backend/models/notes';
function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true); // To toggle between sign-in and sign-up forms
  const navigate= useNavigate();
  useEffect(()=>{
    localStorage.setItem("note_id","not");
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        // Sign-in logic
        const response = await axios.post('http://localhost:3001/auth/login', { email, password });
        console.log('Sign-in successful!', response.data);
        localStorage.setItem("user_id",response.data.user_id);
        localStorage.setItem("email",response.data.email);
         localStorage.setItem("note_id","not");
        navigate('/note');

        // Handle sign-in success
      } else {
        // Sign-up logic
        const response = await axios.post('http://localhost:3001/auth/register', { email, password });
        console.log('Sign-up successful!', response.data);
    localStorage.setItem("note_id","not");
    localStorage.setItem("email",response.data.email);
   
        localStorage.setItem("user_id",response.data.user_id);
         navigate('/note');
        // Handle sign-up success]
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication error');
      // Handle error, such as displaying error message to the user
    }
    // Clear the form fields
    setEmail('');
    setPassword('');
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-semibold mb-8">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-8 py-10 bg-white shadow-lg rounded-lg">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none text-lg" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none text-lg" required />
        <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg hover:bg-opacity-75 text-white focus:outline-none text-lg">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-lg">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsSignIn(!isSignIn)} className="text-blue-500 underline focus:outline-none text-lg ">{isSignIn ? 'Sign Up' : 'Sign In'}</button>
      </p>
    </div>
  );
}

export default AuthPage;
