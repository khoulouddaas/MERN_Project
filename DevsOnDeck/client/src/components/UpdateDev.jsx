import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// Assuming you have an App.css file for styling, similar to the second snippet.
import '../App.css'; 

const DevEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [dev, setDev] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        password: '', // Passwords should not be pre-filled for security
        confirmPassword: '' // Passwords should not be pre-filled for security
    });

    // Fetches developer data on component mount
    useEffect(() => {
        axios.get(`http://localhost:8000/api/devs/${id}`)
            .then(res => {
                const data = res.data;
                setDev({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    address: data.address || '',
                    city: data.city || '',
                    state: data.state || '',
                    password: '', // Ensure passwords are not pre-filled
                    confirmPassword: '' // Ensure passwords are not pre-filled
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching developer:', err);
                setLoading(false);
                // Optionally set a general error message if data fetching fails
                setErrors({ general: { message: 'Failed to load developer data.' } });
            });
    }, [id]); // Dependency array includes 'id' to re-fetch if ID changes

    // Handles changes to input fields
    const handleChange = (e) => {
        setDev({
            ...dev,
            [e.target.name]: e.target.value
        });
    };

    // Validates form fields
    const validateForm = () => {
        const newErrors = {};
        if (!dev.firstName.trim()) newErrors.firstName = { message: "First name is required" };
        if (!dev.lastName.trim()) newErrors.lastName = { message: "Last name is required" };
        if (!dev.email.trim()) newErrors.email = { message: "Email is required" };
        if (!dev.address.trim()) newErrors.address = { message: "Address is required" };
        if (!dev.city.trim()) newErrors.city = { message: "City is required" };
        if (!dev.state.trim()) newErrors.state = { message: "State is required" };
        // Only validate password match if a new password is being entered
        if (dev.password && dev.password !== dev.confirmPassword) {
            newErrors.confirmPassword = { message: "Passwords do not match" };
        }
        return newErrors;
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // Set errors and stop submission if validation fails
            return;
        }

        // Send updated developer data to the backend
        axios.put(`http://localhost:8000/api/devs/${id}`, dev, { withCredentials: true })
            .then(res => {
                navigate('/devs/profile'); // Navigate to profile page on successful update
            })
            .catch(err => {
                if (err.response?.data?.errors) {
                    // Set specific errors returned from the backend
                    setErrors(err.response.data.errors);
                } else {
                    // Set a general error message for other issues
                    setErrors({ general: { message: 'Something went wrong. Please try again later.' } });
                }
            });
    };

    // Display loading message while data is being fetched
    if (loading) {
        return (
            <div className="dev-registration-container">
                <div className="registration-box">
                    <p>Loading developer data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dev-registration-container">
            <div className="registration-box">
                <h2>Edit Developer Profile</h2>
                {errors.general && <p className="error-text">{errors.general.message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={dev.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={dev.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={dev.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={dev.address}
                            onChange={handleChange}
                        />
                        {errors.address && <p className="error-text">{errors.address.message}</p>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={dev.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="error-text">{errors.city.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State:</label>
                            <select
                                id="state"
                                name="state"
                                value={dev.state}
                                onChange={handleChange}
                            >
                                <option value="">-- Select State --</option>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="NY">NY</option>
                                <option value="TX">TX</option>
                                {/* Add more states as needed */}
                            </select>
                            {errors.state && <p className="error-text">{errors.state.message}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password (optional):</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={dev.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={dev.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="submit-button">
                        Update Profile
                    </button>
                </form>

                <button type="button" onClick={() => navigate('/devs/profile')} className="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DevEdit;
