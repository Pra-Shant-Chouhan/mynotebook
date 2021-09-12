import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get All Notes

  const getNotes = async () => {
    // Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOGIwZjA0YzliMzE3N2Y5MGI1NWQ1In0sImlhdCI6MTYzMTE4NjEyNH0.Qa8GnkHZULNGRdkMVH65GYwbLohL2hvvj-BtYTNSY-I"
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    setNotes(json)

  }


  //Add a Note

  const addNote = async (title, description, tag) => {
    // Api Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOGIwZjA0YzliMzE3N2Y5MGI1NWQ1In0sImlhdCI6MTYzMTE4NjEyNH0.Qa8GnkHZULNGRdkMVH65GYwbLohL2hvvj-BtYTNSY-I"
      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note))
   

  }

  //Delete a Note
  const deleteNote = async (id) => {
    // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOGIwZjA0YzliMzE3N2Y5MGI1NWQ1In0sImlhdCI6MTYzMTE4NjEyNH0.Qa8GnkHZULNGRdkMVH65GYwbLohL2hvvj-BtYTNSY-I"
      },

    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, tag, description) => {
    // Api Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOGIwZjA0YzliMzE3N2Y5MGI1NWQ1In0sImlhdCI6MTYzMTE4NjEyNH0.Qa8GnkHZULNGRdkMVH65GYwbLohL2hvvj-BtYTNSY-I"
      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json =await response.json(); // parses JSON response into native JavaScript objects

    let newNotes =JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes)

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;