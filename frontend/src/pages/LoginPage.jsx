import { useState } from 'react';
import axios from 'axios';
import "../css/loginPage.css";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8200/user/login', { email, password });
      const { role, accessToken } = response.data;
      console.log(response.data);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', role);
      return { role };
    }
    catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response.role)
      if (response.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Username or password incorrect');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="show-password">
              <Link onClick={togglePasswordVisibility}>
                {showPassword ? "Hide Password" : "Show Password"}
              </Link>
            </div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" className="btn btn-secondary login-btn">Login</button>
          <div>
            <p className='signuplink'>Dont have an account? <Link to="/register">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export { LoginPage };
