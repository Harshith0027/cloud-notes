import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import alertContext from '../contexts/alerts/alertContext';
//import {loadingContext} from '../contexts/loadingBar/LoadingState';

const Login = () => {
    const host = "https://cloud-notes-mjfh.onrender.com";
    const context = useContext(alertContext);
    //const context2 = useContext(loadingContext);
   // const {setProgress} = context2;
    const { showAlert } = context;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email : "", password : ""});
    const handleChange =(e)=>{
        setCredentials({...credentials, [e.target.name ] : e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const data = await response.json();
        if(data){
            // redirecting to the home of user
            localStorage.setItem('token', data.authToken);
            //console.log("hi hi hi hi",data);
            //setProgress(0);
            navigate("/");
            //setProgress(50);
            showAlert("Logged in Successfully", "success");
            //setProgress(100);
        }
        else{
            //setProgress(50);
            showAlert("Invalid Credentials", "danger");
            //setProgress(100);
        }
    };
    return (
        <div className='container' style={{backgroundColor : "#E6E9AF", borderRadius : "0.75%"}}>
        <div className="container">
        <h3 className="mt-3 md-3 my-3">Login to use the Cloud Notes</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={credentials.email} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} name="password"/>
            </div>
            <button disabled={credentials.password.length < 5} type="submit" className="btn btn-success mb-3">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default Login
