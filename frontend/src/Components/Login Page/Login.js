import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import '../Styles/login.css'

function 
Login() {

    const history = useHistory();
    const [password, passwordSet] = useState("")
    const [email, emailSet] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {login, user} = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
    
            if (response && response.data && response.data.message === "loggedin success") {
                // Successful login, redirect to the homepage
                history.push("/");
            } else {
                // Handle other cases, e.g., show an error message
                setErrorMessage(response.data.message || "Login failed");
            }
        } catch (err) {
            // Handle network or other errors
            console.error("Error during login:", err);
        }
    };
    

    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>LOGIN</h1>
                    <div className="line"></div>
                </div>
    
                <div className="loginBox">
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleLogin}>
                        Login
                    </button>
    
                    {errorMessage && (
                        <div className='error-message'>
                            {errorMessage}
                        </div>
                    )}
    
                    <div className='otherOption'>
                        <button className=" otherbtns form-button" type="submit" >
                            <Link to="/signup" className="otherbtns">Sign Up</Link>
                        </button>
                        <button className=" otherbtns form-button" type="submit">
                            <Link to="/forgetPassword" className="otherbtns">Forget Password</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Login;