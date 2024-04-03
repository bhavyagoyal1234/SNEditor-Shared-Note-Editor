import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotePad() {
  const [noteTitle, setNoteTitle] = useState('');
  const [userText, setUserText] = useState('');
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notes/get');
        setNotes(response.data.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'noteTitle') {
      setNoteTitle(value);
    } else if (id === 'userText') {
      setUserText(value);
    }  
  };

  const downloadText = () => {
    const combinedText = userText;
    const blob = new Blob([combinedText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const fileName = (noteTitle ? noteTitle.toLowerCase().replace(/ /g, '_') : 'untitled') + '.txt';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const saveNote = async () => {
    const user_id = localStorage.getItem('user_id');
    const note_id = localStorage.getItem('note_id');
    if (!user_id) {
      navigate('/signup');
      return;
    }
     
    try {
      const response = await axios.post('http://localhost:3001/notes/add', { title: noteTitle, data: userText, user_id: user_id, note_id: note_id });
      alert('Note added successfully');
      localStorage.setItem('note_id', response.data.note_id);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setUserText(note.data);
    setNoteTitle(note.title);
    localStorage.setItem('note_id', note._id);
  };

  const handleNewNote = () => {
    setNoteTitle('');
    setUserText('');
    setSelectedNote(null);
    localStorage.setItem('note_id',"not");
  };
  const logout=()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='mb-5'>
        <h2 className="text-lg font-bold m-5 mb-2">Notes List:</h2>
        <ul className="space-y-2">
          {notes.map((note) => (
            userEmail && (note.main === userEmail || (note.emails && note.emails.includes(userEmail))) && (
              <li 
                key={note.note_id} 
                onClick={() => handleNoteClick(note)}
                className="cursor-pointer w-[800px] bg-gray-100 hover:bg-gray-200 rounded p-2 transition duration-300 ease-in-out"
              >
                {note.title}
              </li>
            )
          ))}
        </ul>
      </div>
      <h2>Edit Note</h2>
      <input
        type="text"
        id="noteTitle"
        value={noteTitle}
        onChange={handleInputChange}
        placeholder="Enter A Title For Your Note"
        className="w-80 p-2 mb-4 border border-gray-300 rounded-lg h-[40px]"
      />

      <textarea
        id="userText"
        value={userText}
        onChange={handleInputChange}
        placeholder="Start Writing Your Notes"
        className="w-[1000px] p-5 font-lg border border-gray-300 rounded-lg min-h-[500px] mx-[100px]"
      ></textarea>

      <div className="flex flex-row mt-4">
        <button onClick={downloadText} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          <i className="fa fa-download"></i> Download
        </button>
        <button onClick={saveNote} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Save
        </button>
        <button onClick={handleNewNote} className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
          New Note
        </button>
        <button onClick={logout} className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
          Logout
        </button>
      </div>

      <ShareButton />
    </div>
  );
}

export default NotePad;
