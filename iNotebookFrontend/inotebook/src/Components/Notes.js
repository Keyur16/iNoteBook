import React, {useContext, useEffect, useRef, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
//import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;

    const navigate = useNavigate();


    useEffect(() => {

        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }
        
    },[getNotes])
    
    const ref = useRef(null)
    const refClose = useRef(null)


    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "General"})

    const updateNote = (currentNote)=>{
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }


    const handleClick = (e)=>{
        // console.log("updating the note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value })
    }

  return (
    <>       
        <AddNote/>


        {/* Edit the note */}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} required className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" minLength={5} required className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}/>
                </div>
                
            </form>

                
            </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.edescription.length < 5 || note.etag.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>


        <div className="row my-3">
        <h2>Your Notes</h2>

        {/* if there are no notes to display */}
        <div className="container">
        {notes===0 && 'No notes to display'}
        </div>

        {notes.map((note,i)=>{
          return <Noteitem key={i} updateNote={updateNote} note = {note}/>;
        })
        }
        </div>
    </>
  )
}

export default Notes