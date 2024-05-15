import { Link } from 'react-router-dom';
import "../css/sidebar.css"

const Sidebar = () => {
    return (
        <div style={{ width: "300px", height: "86vh", backgroundColor: "#52668b", color: "white" }}>
            <ul>
                <li><Link to="/admin-dashboard/streams">Streams</Link></li>
                <li><Link to="/admin-dashboard/subjects">Subjects</Link></li>
                <li><Link to="/admin-dashboard/students">Students</Link></li>
            </ul>
        </div>
    );
}

export { Sidebar };
