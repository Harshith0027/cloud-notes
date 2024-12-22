import React, { /*useEffect */} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar =()=> {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    let location = useLocation();
    // useEffect(
    //     () => {
    //         console.log(location.pathname);
    //     }
    // ,[location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link id="n1" className="navbar-brand" to="/">Cloud Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"?"Active":""}`} aria-current="page" to="/" 
                                style={
                                    {color:`${location.pathname === "/"?"green":"white"}`}
                                }>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About"?"Active":""}`} to="/About" 
                                style={
                                    {color:`${location.pathname === "/About"?"green":"white"}`}
                                }>About</Link>
                            </li>
                        </ul>
                    </div>
                    {!localStorage.getItem('token') ? <div>
                    <Link to="/login" className="btn btn-success btn-lg mx-1"  role="button" >Login</Link>
                    <Link to="/signup" className="btn btn-secondary btn-lg mx-1" role="button" >SignUp</Link>
                    </div> : <div> <button className="btn btn-success" onClick={handleLogout}>Logout</button> </div>}
                </div>
            </nav>
        </>
    )
}

export default Navbar