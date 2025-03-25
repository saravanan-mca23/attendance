const LeaveRequest = require('../models/leave-model');
const Student = require('../models/studentSchema.js');

exports.createLeaveRequest = async (req, res) => {
  const { userId, startDate, endDate, reason } = req.body;  // Destructure userId from req.body
  try {
    const user = await Student.findById(userId);  // Use userId directly
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newLeaveRequest = new LeaveRequest({ userId, name: user.name, startDate, endDate, reason });
    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// UPDATE LEAVE REQUEST STATUS
exports.updateLeaveRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {

  try {
    const leaveRequests = await LeaveRequest.find({});
    // console.log(leaveRequests);
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leave requests for a specific student
// Get leave requests for a specific student
exports.getStudentLeaveRequests = async (req, res) => {
  const userId = req.params.id
  console.log(userId);

  try {
    let leaveRequests = await LeaveRequest.find({userId});
    // console.log(leaveRequests);
    res.json(leaveRequests)
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
