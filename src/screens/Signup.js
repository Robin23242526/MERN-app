import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })
    let nav = useNavigate();
    const handle = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location }))
        const response = await fetch("http://localhost:5000/api/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("enter valid credentials");
        } else {
            nav('/login');
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handle}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' value={credentials.name} onChange={onChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={onChange} value={credentials.email} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" onChange={onChange} id="exampleInputPassword1" value={credentials.password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" name='location' className="form-control" onChange={onChange} id="exampleInputAddress" value={credentials.location} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger' >Already a User</Link>
                </form>
            </div>
        </>
    )
}