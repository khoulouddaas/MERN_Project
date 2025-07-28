import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
    password: '',
    confirmPassword: ''
  });

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
          password: data.password || '',
          confirmPassword: data.confirmPassword || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching developer:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setDev({
      ...dev,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!dev.firstName.trim()) newErrors.firstName = { message: "First name is required" };
    if (!dev.lastName.trim()) newErrors.lastName = { message: "Last name is required" };
    if (!dev.email.trim()) newErrors.email = { message: "Email is required" };
    if (!dev.address.trim()) newErrors.address = { message: "Address is required" };
    if (!dev.city.trim()) newErrors.city = { message: "City is required" };
    if (!dev.state.trim()) newErrors.state = { message: "State is required" };
    if (dev.password && dev.password !== dev.confirmPassword) {
      newErrors.confirmPassword = { message: "Passwords do not match" };
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.put(`http://localhost:8000/api/devs/${id}`, dev)
      .then(res => {
        navigate('/devs/AllDevs');
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ general: { message: 'Something went wrong. Please try again later.' } });
        }
      });
  };

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
        <h2>Edit Developer</h2>
        {errors.general && <p className="error-text">{errors.general.message}</p>}

        <form onSubmit={handleSubmit}>
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
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="NY">NY</option>
              </select>
              {errors.state && <p className="error-text">{errors.state.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>New Password (optional):</label>
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

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default DevEdit;
