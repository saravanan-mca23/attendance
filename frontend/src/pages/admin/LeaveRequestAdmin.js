import { useEffect, useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const LeaveRequestsAdmin = () => {
    const currentUser = useSelector(state => state.user.currentUser);

  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();




  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/teacher/get-leave-request/${currentUser._id}?status=pending`
        );
    
        // Sort the requests by createdAt in descending order
        const sortedRequests = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        setRequests(sortedRequests);
      } catch (err) {
        console.error(err);
      }
    };
    

    fetchRequests();
  }, [currentUser._id]);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/teacher/update-leave-request/${id}`,
        { status: "approved" }
      );
      setRequests(requests.map(request => {
        if (request._id === id) {
          return { ...request, status: 'approved' };
        }
        return request;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/teacher/update-leave-request/${id}`,
        { status: "rejected" }
      );
      setRequests(requests.map(request => {
        if (request._id === id) {
          return { ...request, status: 'rejected' };
        }
        return request;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div style={{marginTop:"100px"}}>   
       <div className="container mt-5" >
    <h1 style={{textAlign:"center"}}>LEAVE REQUESTS BY TEACHER</h1>
      <div className="row">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Name:{request.name}</h5>
                  <p className="card-text">Start Date: {new Date(request.startDate).toLocaleDateString()}</p>
                  <p className="card-text">End Date: {new Date(request.endDate).toLocaleDateString()}</p>
                  <p className="card-text">Reason: {request.reason}</p>
                  <p className="card-text">Status: {request.status}</p>
                  <button
                    style={{marginRight:"10px"}}
                    className={`btn btn-success ${request.status !== 'pending' ? 'disabled' : ''} `}
                    onClick={() => handleApprove(request._id)}
                  >
                    Approve
                  </button>
                  <button   
                    className={`btn btn-danger ${request.status !== 'pending' ? 'disabled' : ''} `}
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col">No leave requests</p>
        )}
      </div>
    </div>
    </div>

    </>
  );
};

export default LeaveRequestsAdmin;