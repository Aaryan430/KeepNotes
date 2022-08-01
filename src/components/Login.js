import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles/loginStyle.css'
import LoginDesign from './styles/LoginDesign'


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
      <LoginDesign />
      <div className="container-fluid my-3  box" >
        <i className="fa fa-key" aria-hidden="true"></i>
        <div className="login-title">
          <h2>Login</h2>
        </div>

        <form className="my-3 login-form" onSubmit={handleSubmit} autoComplete="off">

          <div className="mb-3 input-box">
            <input type="email" className=" input-val" onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" />
            <label htmlFor="email" className="form-control-label" value={credentials.email}>EMAIL </label>
            <div id='emailHelp' className='authenticate'>We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3 input-box">
            <input type="password" className=" input-val" onChange={handleChange} id="password" name="password" />
            <label htmlFor="password" className="form-control-label" value={credentials.password}>PASSWORD</label>
          </div>

          <button type="submit" className="login-button btn btn-outline-primary" >LOGIN</button>
        </form>
        <div className="sign-up-link">
        <p> New User?</p>
        <Link className='btn btn-outline-dark mx-1' to='/signup' role="button" >Signup</Link>
        </div>
      </div>
    </>
  )
}

export default Login