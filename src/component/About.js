import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)

    useEffect(() => {
        a.update()
         // eslint-disable-next-line 
    }, [])
    return (
        <div>
            This is About Page His name is  {a.state.Name} and he is an {a.state.BE} Engineer
        </div>
    )
}

export default About
