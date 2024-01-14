import React, { useState, useEffect } from 'react';
import '../Styles/profile.css';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")).data);
    const [password, passwordSet] = useState("");
    const [passwordCnf, passwordCnfSet] = useState("");
    const [email, emailSet] = useState("");
    const [name, nameSet] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);

    useEffect(() => {
        nameSet(user.name);
        passwordSet(user.password);
        emailSet(user.email);
        passwordCnfSet(user.password);
    }, [user]);

    const handleClick = async () => {
        try {
            const data = await axios.patch("/user/" + user._id, {
                email,
                name,
                password,
                confirmPassword: passwordCnf,
                role: user.role,
                _id: user._id,
            });
            localStorage.setItem("user", JSON.stringify(data.data.data));
            setIsProfileUpdated(true);

            // Automatically hide the success message after 3 seconds
            setTimeout(() => {
                setIsProfileUpdated(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>
                    <div className="line"></div>
                    <div className="profileImage">
                        {/* {<img src={user.user.profileImage} /> } */}
                    </div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <input type="file" />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={email} onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={name} onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button>

                    {isProfileUpdated && (
                        <div className="dialogue">
                            <p>Profile updated successfully!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
