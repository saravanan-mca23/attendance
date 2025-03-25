import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaHome } from 'react-icons/fa';  // Import the home icon from react-icons
import { useNavigate } from 'react-router-dom';
import "./HodDashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const HODDashboard = () => {
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();  // Get navigate function from useNavigate hook

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/hod/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const fetchSubjects = async (sclassName) => {
        try {
            const response = await axios.get('http://localhost:5000/hod/subjects', {
                params: { sclassName },
            });
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchAttendance = async () => {
        if (!className || !subject || !date) return;

        try {
            const response = await axios.get('http://localhost:5000/hod/attendance', {
                params: { className, subject, date },
            });
            setAttendanceData(response.data);
            prepareChartData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const prepareChartData = (data) => {
        const presentCount = data.filter((d) => d.attendance[0]?.status === 'Present').length;
        const absentCount = data.filter((d) => d.attendance[0]?.status === 'Absent').length;

        setChartData({
            labels: ['Present', 'Absent'],
            datasets: [
                {
                    label: 'Attendance',
                    data: [presentCount, absentCount],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        });
    };

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        setClassName(selectedClass);
        setSubject(''); // Reset subject when class changes
        setSubjects([]); // Reset subjects when class changes
        fetchSubjects(selectedClass);
    };

    useEffect(() => {
        if (className && subject && date) {
            fetchAttendance();
        }
    }, [className, subject, date]);

    return (
        <div className="container mt-5" style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '10px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center">HOD Dashboard</h2>
                <FaHome className="home-icon" style={{ cursor: 'pointer', fontSize: '24px' }} onClick={() => navigate('/')} /> {/* Home Icon */}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="className">Class</label>
                                <select
                                    id="className"
                                    className="form-control"
                                    value={className}
                                    onChange={handleClassChange}
                                >
                                    <option value="">Select Class</option>
                                    {classes.map((classItem) => (
                                        <option key={classItem._id} value={classItem._id}>
                                            {classItem.sclassName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    className="form-control"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map((subjectItem) => (
                                        <option key={subjectItem._id} value={subjectItem._id}>
                                            {subjectItem.subName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {attendanceData.length > 0 ? (
                        <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <div className="card-body d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                                <div className="chart-container" style={{ width: '80%', height: '80%' }}>
                                    <Pie data={chartData} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <div className="card-body text-center" style={{ width: '100%' }}>
                                <p>No data available for the selected subject and date.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {attendanceData.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-center">Attendance Details</h4>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered mx-auto" style={{ maxWidth: '80%' }}>
                            <thead>
                                <tr>
                                    <th>Roll Number</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((student) => (
                                    <tr key={student._id}>
                                        <td>{student.rollNum}</td>
                                        <td>{student.name}</td>
                                        <td style={{ color: student.attendance[0]?.status === 'Present' ? 'green' : 'red' }}>
                                            {student.attendance[0]?.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HODDashboard;
