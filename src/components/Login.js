import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // API Call 
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth-token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Logged In Successfully", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }

  }
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <>

    <div className="container my-3 " >

          <h2>LogIn</h2>
        <form className="my-3 " onSubmit={handleSubmit}>
          <div className="mb-3 ">
              <label htmlFor="email" className="form-label" value={credentials.email}> Email</label>
              <input type="email" className="form-control" onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" />
              <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
          </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label" value={credentials.password}>Password</label>
              <input type="password" className="form-control" onChange={handleChange} id="password" name="password" />
          </div>

          <button type="submit" className="btn btn-primary" >Login</button>
        </form>
    </div>
    </>
  )
}

export default Login