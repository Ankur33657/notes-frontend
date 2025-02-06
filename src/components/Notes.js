import { useEffect,useState,React } from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';
const Notes=()=>{
    const [notes, setNotes] = useState(null); 
     

  useEffect(() => {
    const fetchNotes = async () => {
     
        const response = await fetch('https://notes-backend-plkz.onrender.com/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const json = await response.json();
        console.log(json);
        setNotes(json);
    
    };

    fetchNotes();
  }, []); 
    const deletenote=async(id)=>{
      const isConfirmed = window.confirm("Are you sure you want to delete this note?");
      if(isConfirmed){

        try {
          // Sending the DELETE request to the server with the note's id
          const response = await fetch(`https://notes-backend-plkz.onrender.com/notes/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Successfully deleted, now update the state
            const updatedNotes = notes.filter((note) => note._id !== id);
            setNotes(updatedNotes);
            console.log('Note deleted successfully');
          } else {
            console.log('Failed to delete note');
          }
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    }
 
    return (
        <>
        <div className="row row-cols-1 row-cols-md-3 row-cols-sm-1 row-cols-xs-1 g-4">
        {
            notes && notes.map((item,index)=>(
                <div className="container">
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote blockquote-custom bg-white px-3 pt-4">
              <div className="blockquote-custom-icon bg-info shadow-1-strong">
                <i className="fa fa-quote-left text-white">A</i>
              </div>
              <p className="mb-0 mt-2 font-italic">
               {item.content}
                
              </p>
              <footer className="blockquote-footer pt-4 mt-4 border-top">
                <span className="font-weight-bold text-primary">{item.title}</span>
            
              </footer>
            </blockquote>

            {/* Delete and Update Icons */}
            <div className="d-flex justify-content-between pt-3">
              <button onClick={()=>deletenote(item._id)}className="btn btn-danger">
                <i className="fas fa-trash-alt"></i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
              </button>
              <Link to='update'state={ { title:item.title,
                content:item.content,
                id:item._id } }>
  <button className="btn btn-warning">
    <i className="fas fa-edit"></i> 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
    </svg>
  </button>
</Link>
              
            </div>
          </div>
        </div>
      </section>
    </div>
            ))
        }
        </div>
        </>
    );
}
export default Notes;