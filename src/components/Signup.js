import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

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
    <div className="container my-3">
    <h2>Create an Account to continue</h2>
    <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="text" className="form-label"  value={credentials.name}>Name</label>
            <input type="text" className="form-control" onChange={handleChange} id="name" name="name" aria-describedby="name"  /> 
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label"  value={credentials.email}>Email</label>
            <input type="email" className="form-control" onChange={handleChange} id="email" name="email" aria-describedby="emailHelp"  /> 
            <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label" value={credentials.password}>Password</label>
            <input type="password" className="form-control" onChange={handleChange}id="password" name="password" />
        </div>
        <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label" value={credentials.confirmpassword}>Confirm Password</label>
            <input type="confirmpassword" className="form-control" onChange={handleChange}id="confirmpassword" name="confirmpassword" />
        </div>
       
        <button  type="submit" className="btn btn-primary" >Sign Up</button>
    </form>
</div>
  )
}

export default Signup