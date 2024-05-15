import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/signUpPage.css";
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    year: '',
    streamName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8200/user/register', formData);
      if (response.status === 201) {
        alert("Account created successfully !!!")
        console.log('Registration successful:', response.data);
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  return (
    <div className="container">
      <div className="register-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              name="age"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="year"
              placeholder="Enter year"
              value={formData.year}
              onChange={handleChange}
              name="year"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="streamName"
              placeholder="Enter stream name"
              value={formData.streamName}
              onChange={handleChange}
              name="streamName"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary register-btn">Sign Up</button>
          <div>
            <p className='signuplink'>Already have an account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignUpPage };
