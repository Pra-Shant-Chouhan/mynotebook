import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();
    const clickonSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
            const response = await fetch("https://git.heroku.com/my-note-bookk.git/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        //Login failed Alert 
        if (json.success) {
            //Save the Auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history.push("/");
            props.showAlert("Acount created successfully", "success")
        }
        else {
            props.showAlert("invlaid credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-4">
            <h2> Crate a Account to use My-NoteBook</h2>
            <form onSubmit={clickonSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={2} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm your Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
