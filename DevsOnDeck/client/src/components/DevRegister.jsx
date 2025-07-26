import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
                nav('/');
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
        <div>
            <h2>Developer Sign Up</h2>

            {confirmReg && <p style={{ color: "green" }}>{confirmReg}</p>}
            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

            <form onSubmit={register}>
                <div>
                    <label>First Name:</label><br />
                    <input
                        type="text"
                        name="firstName"
                        value={dev.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label><br />
                    <input
                        type="text"
                        name="lastName"
                        value={dev.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label><br />
                    <input
                        type="text"
                        name="address"
                        value={dev.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label><br />
                    <input
                        type="text"
                        name="city"
                        value={dev.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label><br />
                    <input
                        type="text"
                        name="state"
                        value={dev.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        name="email"
                        value={dev.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        name="password"
                        value={dev.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label><br />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={dev.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account? <Link to="/devs/login">Sign in</Link>
            </p>
        </div>
    );
};

export default DevRegistration;
