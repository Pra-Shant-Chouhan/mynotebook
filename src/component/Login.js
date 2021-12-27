import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    let history = useHistory();
    const clickonSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://git.heroku.com/my-note-bookk.git/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        //Login failed Alert 
        if (json.success) {
            //Save the Auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history.push("/");
            props.showAlert("Login sccessfully", "success")
        }
        else {
            props.showAlert("invlaid credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className = "mt-4">
            <h2>Login to continue to My-NoteBook</h2>
            <form onSubmit={clickonSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onSubmit={clickonSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login
