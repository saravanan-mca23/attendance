import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LeaveRequestsUser = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [requests, setRequests] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/student/getstudentrequest/${currentUser._id}`);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(currentUser._id);
  }, [currentUser]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: '90vw' }}>
        <div className="card-header">
          <h1 className="card-title">My Leave Requests</h1>
        </div>
        <div className="card-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {requests.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td>{currentUser.name}</td>
                      <td>{new Date(request.startDate).toLocaleDateString()}</td>
                      <td>{new Date(request.endDate).toLocaleDateString()}</td>
                      <td>{request.reason}</td>
                      <td style={{ color: request.status === 'pending' || request.status === 'rejected' ? 'red' : 'green' }}>
                        {request.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsUser;
