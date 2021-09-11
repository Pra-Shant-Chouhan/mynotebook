import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
 const notesInitial =   [
        {
          "_id": "613a19cd9841611db751ad5e",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-09T14:27:25.172Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        },
        {
          "_id": "613af8bfd72640655d4dfff0",
          "user": "6138b0f04c9b3177f90b55d5",
          "title": "MERN",
          "description": "DOING PROJECT",
          "tag": "REACT.js",
          "date": "2021-09-10T06:18:39.577Z",
          "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
    }

export default NoteState;