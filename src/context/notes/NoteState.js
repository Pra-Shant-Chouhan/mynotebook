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
    console.log(json)
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
    const json = response.json(); // parses JSON response into native JavaScript objects

    const note = {
      "_id": "613af8bfd72640655d4dfff0",
      "user": "6138b0f04c9b3177f90b55d5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-10T06:18:39.577Z",
      "__v": 0
    }
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
    console.log(json)
    console.log("Deleteing note with id " + id)
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note
  const editNotes = async (id, title, tag, description) => {
    // Api Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzOGIwZjA0YzliMzE3N2Y5MGI1NWQ1In0sImlhdCI6MTYzMTE4NjEyNH0.Qa8GnkHZULNGRdkMVH65GYwbLohL2hvvj-BtYTNSY-I"
      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
      }

    }

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;