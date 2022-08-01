import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import './styles/loginStyle.css'
import LoginDesign from './styles/LoginDesign'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({name:"",email: "",password:"",confirmpassword:""})
    let history = useHistory();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(credentials.password !== credentials.confirmpassword){
            props.showAlert("Please confirm your password correctly","danger")
            json.success = false;
        }
        
        // API Call 
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                // Save the auth-token and redirect
                localStorage.setItem('token',json.authtoken);
                history.push("/");
                props.showAlert("Account Created Successfully","success");
            }
            else{
                props.showAlert("Invalid Details","danger");
            }
        
    }
    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


  return (
    <>
    <LoginDesign/>
    <div className="container my-3 box">
    <div className="login-title">
    <h2>Create an Account</h2>
    </div>
    <form className="my-3 " onSubmit={handleSubmit}>
        <div className="mb-3 input-box">
            <input type="text" className="input-val" onChange={handleChange} id="name" name="name" aria-describedby="name"  /> 
            <label htmlFor="text" className="form-label"  value={credentials.name}>Name</label>
        </div>
        <div className="mb-3 input-box">
            <input type="email" className="input-val" onChange={handleChange} id="email" name="email" aria-describedby="emailHelp"  /> 
            <label htmlFor="email" className="form-label"  value={credentials.email}>Email</label>
        </div>
        <div className="mb-3 input-box">
            <input type="password" className="input-val" onChange={handleChange}id="password" name="password" />
            <label htmlFor="password" className="form-label" value={credentials.password}>Password</label>
        </div>
        <div className="mb-3 input-box">
            <input type="confirmpassword" className="input-val" onChange={handleChange}id="confirmpassword" name="confirmpassword" />
            <label htmlFor="confirmpassword" className="form-label" value={credentials.confirmpassword}>Confirm Password</label>
        </div>
       
        <button  type="submit" className="btn btn-primary" >Sign Up</button>
    </form>
</div>
    </>
  )
}

export default Signup