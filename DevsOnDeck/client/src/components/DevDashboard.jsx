import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure your CSS is imported

const DevDashboard = () => {
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = () => {
    axios.get('http://localhost:8000/api/devs/allDevs')
      .then(res => {
        setDevelopers(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch developers', err);
      });
  };

  const deleteDeveloper = (id) => {
    if (window.confirm("Are you sure you want to delete this developer?")) {
      axios.delete(`http://localhost:8000/api/devs/${id}`)
        .then(() => {
          setDevelopers(developers.filter(dev => dev._id !== id));
        })
        .catch(err => console.error('Delete failed', err));
    }
  };

  const editDeveloper = (id) => {
    navigate(`/devs/update/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Developer Dashboard</h2>
      <div className="dashboard-table-wrapper">
        <Table className="black-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {developers.map(dev => (
              <tr key={dev._id}>
                <td>{dev.firstName} {dev.lastName}</td>
                <td>{dev.email}</td>
                <td>{dev.city}</td>
                <td>{dev.state}</td>
                <td>{dev.address}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => editDeveloper(dev._id)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => deleteDeveloper(dev._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DevDashboard;