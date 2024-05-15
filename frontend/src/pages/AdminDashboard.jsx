import { Route, Routes } from "react-router-dom"
import { NavbarComponent } from "../components/NavbarComponent"
import { Sidebar } from "../components/Sidebar"
import { StreamsPage } from "./StreamsPage"
import { SubjectsPage } from "./SubjectsPage"
import { StudentsPage } from "./StudentsPage"
import { AdminPage } from "./AdminPage"
// AdminDashboard.js
const AdminDashboard = () => {
    return (
        <>
            <NavbarComponent />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{width:"100%"}}>
                    <Routes>
                        <Route path="/" element={<AdminPage />} />
                        <Route path="/streams" element={<StreamsPage />} />
                        <Route path="/subjects" element={<SubjectsPage />} />
                        <Route path="/students" element={<StudentsPage />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}


export { AdminDashboard }