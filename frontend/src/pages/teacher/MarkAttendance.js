import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlinePresentToAll } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const MarkAttendance = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const getAllUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/student/getallstudent/${currentUser.teachSclass._id}`);
            if (data?.users) {
                setUsers(data.users);
            } else {
                setUsers([]);
            }
        } catch (error) {
            toast.error('Error fetching students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser?._id) {
            getAllUser();
        }
    }, [currentUser]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date().toISOString().split('T')[0]);
        }, 1000 * 60 * 60 * 24); // Update date every 24 hours

        return () => clearInterval(intervalId);
    }, []);

    const handleMarkAttendance = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/StudentAttendance/${id}`, {
                subName: currentUser.teachSubject,
                status,
                date,
            });
            if (response.data) {
                toast.success(`Attendance marked as ${status}`);
                getAllUser(); // Refresh user list after marking attendance
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error marking attendance');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <div className='card mt-4'>
                <div className='card-body'>
                    <h2 className='card-title' style={{textAlign: "center"}}>MARK ATTENDANCE</h2>
                    <h5 style={{ display: "inline-block" }}>TEACHER NAME: <span style={{ fontSize: "18px" }}>Prof. {currentUser.name}</span></h5>

                    <h5>SUBJECT: <span style={{fontSize: "18px"}}> {currentUser.teachSubject.subName}</span></h5>
                    <h5>DATE: <span style={{fontSize: "18px"}}> {date}</span></h5>

                </div>
            </div>
            <table className='table table-bordered table-hover mt-4'>
                <thead>
                    <tr>
                        <th className='text-center align-middle'>Roll No</th>
                        <th className='text-center align-middle'>Name</th>
                        <th className='text-center align-middle'>Email</th>
                        <th className='text-center align-middle'>Phone</th>
                        <th className='text-center align-middle'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users
                            .sort((a, b) => a.rollNum - b.rollNum) // Sort users array by roll number in ascending order
                            .map((curUser, index) => {
                                const isAttendanceMarked = curUser.attendance.some(
                                    (att) =>
                                        new Date(att.date).toDateString() === new Date(date).toDateString() &&
                                        att.subName === currentUser.teachSubject
                                );
                                return (
                                    <tr key={index}>
                                        <td className='text-center align-middle'>{curUser.rollNum}</td>
                                        <td className='text-center align-middle'>{curUser.name}</td>
                                        <td className='text-center align-middle'>{curUser.email}</td>
                                        <td className='text-center align-middle'>{curUser.phone}</td>
                                        <td className='text-center align-middle d-flex justify-content-center'>
                                            <button
                                                onClick={() => handleMarkAttendance(curUser._id, 'Present')}
                                                className='btn btn-success me-3'
                                                disabled={isAttendanceMarked}
                                            >
                                                <MdOutlinePresentToAll size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleMarkAttendance(curUser._id, 'Absent')}
                                                className='btn btn-danger'
                                                disabled={isAttendanceMarked}
                                            >
                                                <RxCross1 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                    ) : (
                        <tr>
                            <td colSpan='5' className='text-center'>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MarkAttendance;
