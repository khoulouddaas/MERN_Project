import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

const DevRegistration = () => {
    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState({});
    const [dev, setDev] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    const handleChange = (e) => {
        setDev({
            ...dev,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/devs/register", dev, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setDev({
                    firstName: "",
                    lastName: "",
                    address: "",
                    city: "",
                    state: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thanks for registering with us! Log in now!");
                setErrors({});
                nav('/devs/skills/languages/:devId'); 
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ general: "Something went wrong. Please try again later." });
                    console.error("Unexpected error:", err);
                }
            });
    };

    return (
        <>
           

            <div className="dev-registration-container">
                <div className="registration-box">
                    <h2>Developer Sign Up</h2>

                    {confirmReg && <p className="success-message">{confirmReg}</p>}
                    {errors.general && <p className="error-text">{errors.general}</p>}

                    <form onSubmit={register}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={dev.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                            </div>
                            <div className="form-group">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={dev.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={dev.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={dev.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p className="error-text">{errors.address.message}</p>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={dev.city}
                                    onChange={handleChange}
                                />
                                {errors.city && <p className="error-text">{errors.city.message}</p>}
                            </div>
                            <div className="form-group">
                                <label>State:</label>
                                <select name="state" value={dev.state} onChange={handleChange}>
                                    <option value="">-- Select State --</option>
                                    <option value="AL">AL</option>
                                    <option value="AK">Alaska</option>

                                </select>
                                {errors.state && <p className="error-text">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={dev.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="error-text">{errors.password.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={dev.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                        </div>
                        
                        <button type="submit">Register</button>
                    </form>

                    <p className="sign-in-link">
                        Already have an account? <Link to="/devs/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default DevRegistration;