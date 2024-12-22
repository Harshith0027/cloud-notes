import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import alertContext from '../contexts/alerts/alertContext';
//import {loadingContext} from '../contexts/loadingBar/LoadingState';

const SignUp = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const context = useContext(alertContext);
 // const context2 = useContext(loadingContext);
  //const {setProgress} = context2;
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword : "" });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name : credentials.name, email: credentials.email, password: credentials.password })
    });
    const data = await response.json();
    if (data) {
      // redirecting to the home of user
      localStorage.setItem('token', data.authToken);
      //setProgress(50);
      navigate("/");
      //setProgress(70);
      showAlert("signup is completed", "success");
      //setProgress(100);
    }
    else {
      //setProgress(50)
      showAlert("Invalid Credentials", "danger");
      //setProgress(100)
    }
  };
  return (
    <>
    <div className='container' style={{backgroundColor : "#E6E9AF", borderRadius : "0.75%"}}>
      <h3 className="mt-3 md-3 my-3">Create an account to use the Cloud Notes</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" onChange={handleChange} placeholder='Recommended to go with unique name' value={credentials.name} name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder='Enter a valid email' onChange={handleChange} value={credentials.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleChange} placeholder='Recommended to keep strong password' value={credentials.password} name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={handleChange} placeholder='Re-Enter the password in this textbox' value={credentials.cpassword} name="cpassword" minLength={5} required />
        </div>
        <button disabled={credentials.password !== credentials.cpassword || credentials.password.length < 5 } type="submit" className="btn btn-success mb-3">Submit</button>
      </form>
      </div>
    </>
  )
}

export default SignUp
