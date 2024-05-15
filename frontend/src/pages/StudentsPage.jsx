import axios from "axios";
import { useEffect, useState } from "react";
const token = localStorage.getItem('token');

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8200/student/students',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.items);
            setStudents(response.data.items);
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    };
    return (
        <div style={{padding:"5%"}}>
            <h2 style={{textAlign:"center"}}>Students</h2>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <table style={{width:"800px", marginTop:"50px", border:"1px solid"}}>
                <thead style={{borderBottom:"1px solid"}}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Year</th>
                            <th>Stream</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.year}</td>
                                <td>{student.stream}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export { StudentsPage }