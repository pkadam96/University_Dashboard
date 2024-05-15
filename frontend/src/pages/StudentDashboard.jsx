import { NavbarComponent } from "../components/NavbarComponent"
import "../css/studentDashboard.css"
const StudentDashboard = () => {
    return (
        <>
            <NavbarComponent />
            <div className="container">
                <h1>Hello User</h1>
            </div>
        </>
    )
}
export { StudentDashboard }