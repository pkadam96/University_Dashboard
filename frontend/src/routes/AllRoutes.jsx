import { Route, Routes } from "react-router-dom"
import { StreamsPage } from "../pages/StreamsPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="admin-dashboard/streams" element={<StreamsPage/>} />
      {/* <Route path="/dashboard" element={<StudentDashboard />} /> */}
    </Routes>
  );
}

export { AllRoutes }
