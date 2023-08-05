import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentials] = useState({email: "", password : ""})
    let nav = useNavigate();
    const handle = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email, password:credentials.password}))
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        } else {
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            nav("/");
        }
    }
    const onChange = (event) => {
            setcredentials({...credentials,[event.target.name]:event.target.value})
   }
  return (
    <>
    <div className='container'>
                <form onSubmit={handle}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={onChange} value={credentials.email}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" onChange={onChange} id="exampleInputPassword1" value={credentials.password}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/createuser' className='m-3 btn btn-danger' >Register</Link>
                </form>
            </div>
    </>
  )
}