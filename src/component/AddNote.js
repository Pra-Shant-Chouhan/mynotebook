import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: " ", description: "", tag: "" })
    
    const ClickInput = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: " ", description: "", tag: "" }); // After adding note make filed of title, description and tag empty
        props.showAlert("Added  successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
      
    }
    return (
        <div className = "container">
            <h2>Add a Note</h2>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={ note.title}/>
        
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required value={ note.tag}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={ note.description}/>
                </div>
                
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick= {ClickInput}>Add Note</button>
            </form>
            
        </div>
    )
}

export default AddNote
