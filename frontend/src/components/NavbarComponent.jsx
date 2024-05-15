import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Navbar className=" justify-content-between p-4" style={{ 
      backgroundColor: "#52668b",  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }}>
      <Navbar.Brand style={{
        fontSize: "28px",color: "white"
      }}>University Dashboard</Navbar.Brand>
      {userRole === 'student' && (
        <Navbar.Collapse className="justify-content-end" >
          <Navbar.Text className='pe-4' >
            <Link variant="light" style={{color: "white",fontSize: "18px", textDecoration:"none"}} onClick={() => navigate('/student-dashboard/profile')}>My Profile</Link>
          </Navbar.Text>
          <Navbar.Text className='pe-4'>
            <Link variant="light" style={{color: "white", fontSize: "18px", textDecoration:"none"}} onClick={() => navigate('/student-dashboard/performance')}>My Performance</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
      <Button type="submit" style={{backgroundColor:"rgb(221, 72, 72)", color:"black", padding:"5px 10px", fontSize:"18px", fontWeight:"600"}} onClick={logout}>Logout</Button>
    </Navbar>
  );
}

export { NavbarComponent };
