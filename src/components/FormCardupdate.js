import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormCard.css';

const FormCard = () => {
  const location = useLocation(); // Get location state (note data passed from the previous component)
  const [title, setTitle] = useState(location.state.title); // Pre-fill form with existing note title
  const [content, setContent] = useState(location.state.content); // Pre-fill form with existing note content
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const isConfirmed = window.confirm("Are you sure you want to update this note?");
    // Create an updated note object, including the current time as the updated date
    const updatedNote = {
      title: title,
      content: content,
      date: new Date().toISOString(), // Include the current date
    };
    if(isConfirmed){
        try {
            // Send a PUT request to the backend to update the note
            const response = await fetch(`https://notes-backend-plkz.onrender.com/notes/${location.state.id}`, {
              method: 'PATCH',
              body: JSON.stringify(updatedNote),
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            const json = await response.json();
            
            if (response.ok) {
              console.log('Note updated successfully', json);
              // Navigate back to the notes list or home page after successful update
              navigate('/');
            } else {
              console.error('Failed to update note:', json);
            }
          } catch (error) {
            console.error('Error updating note:', error);
          }
    }
    else{
        navigate('/');
    }
    
  };

  return (
    <div className="form-card">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Update Note</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  className="form-control"
                  placeholder="Enter content"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
