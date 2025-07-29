import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const OrgRegistration = () => {
    const [confirmReg, setConfirmReg] = useState('');
    const [errors, setErrors] = useState({});
    const [org, setOrg] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: ""
    });

    const nav = useNavigate();

    const handleChange = (e) => {
        setOrg({
            ...org,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/org/register", org, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setOrg({
                    name: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmReg("Thanks for registering with us! Log in now!");
                setErrors({});
                nav('/devs/login');
            })
            .catch((err) => {
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ general: "Something went wrong. Please try again later." });
                    console.error("Unexpected error:", err);
                }
            });
    };

    return (
        <div className="dev-registration-container">
            <div className="registration-box">
                <h2>Organization Sign Up</h2>

                {confirmReg && <p className="success-message">{confirmReg}</p>}
                {errors.general && <p className="error-text">{errors.general}</p>}

                <form onSubmit={register}>
                    <div className="form-group">
                        <label>Organization Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={org.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error-text">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={org.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={org.address}
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
                                value={org.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="error-text">{errors.city.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>State:</label>
                            <select name="state" value={org.state} onChange={handleChange}>
                                <option value="">-- Select State --</option>
                                <option value="AL">AL</option>
                                <option value="CA">CA</option>
                                <option value="NY">NY</option>
                                <option value="TX">TX</option>
                            </select>
                            {errors.state && <p className="error-text">{errors.state.message}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={org.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={org.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit">Register</button>
                </form>

                <p className="sign-in-link">
                     <Link to="/devs/register">Need to Sign Up as a developer?</Link>
                </p>
            </div>
        </div>
    );
};

export default OrgRegistration;
