// App.js
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentDashboard } from './pages/StudentDashboard';
import { PrivateRoute } from './routes/privateRoute';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/admin-dashboard/*" element={
        <PrivateRoute>
          <AdminDashboard/>
        </PrivateRoute> 
        }
      />
      <Route path="/student-dashboard" element={<StudentDashboard/>} />
    </Routes>
  );
}

export default App;
