import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormCard.css';

const FormCard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const notes = {
      title: title,
      content: content
    };

    try {
      const response = await fetch('https://notes-backend-plkz.onrender.com/notes', {
        method: 'POST',
        body: JSON.stringify(notes),
        headers: { 
          "Content-Type": "application/json"
        }
      });

      const json = await response.json();
      console.log(json);

      // Clear form after successful submission
      setTitle('');
      setContent('');
      navigate('/'); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-card">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Create a New Note</h3>
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
