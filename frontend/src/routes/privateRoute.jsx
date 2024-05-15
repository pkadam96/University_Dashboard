import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    const isAuth = token ? true : false;

    if (!isAuth) {
        return <Navigate to="/login" />;
    }
    const userRole = localStorage.getItem('role');
    const adminRoutes = ['/admin-dashboard', '/admin-dashboard/streams', '/admin-dashboard/subjects', '/admin-dashboard/students'];

    if (adminRoutes.includes(window.location.pathname) && userRole !== 'admin') {
        return <Navigate to="/student-dashboard" />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PrivateRoute };
