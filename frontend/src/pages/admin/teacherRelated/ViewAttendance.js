import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewAttendance = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [date, setDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0]); // Set current date as default
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:5000/hod/attendance', {
                params: { className: currentUser.teachSclass._id , subject: currentUser.teachSubject._id, date },
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

    useEffect(() => {
        if (date) {
            fetchAttendance();
        }
    }, [date]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">ATTENDANCE</h2>
                            <div className="form-group">
                                <label htmlFor="className">Class:</label> {currentUser.teachSclass.sclassName}
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject:</label> {currentUser.teachSubject.subName}
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
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
                    {attendanceData.length > 0 && (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Attendance Details</h4>
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
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {attendanceData.length > 0 && (
                        <div className="card">
                            <div className="card-body">
                                <div className="chart-container" style={{ width: '100%', height: '400px' }}>
                                    <Pie data={chartData} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAttendance;
