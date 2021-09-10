import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
    const shi = {
        "Name": "Bitt2",
        "BE": "EC"
    }
    const [state, setState] = useState(shi)
    const update = () => {
        setTimeout(() => {
            setState({
                "Name": "Mon2",
                "BE": "CE"
            })

        }, 1000);
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;