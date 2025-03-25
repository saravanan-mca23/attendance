const TeacherRequest = require("../../backend/models/teacher-leave-model")
// const LeaveRequest = require('../models/leave-model');
const Teacher = require('../models/teacherSchema.js');

exports.createLeaveRequest = async (req, res) => {
  const { userId, startDate, endDate, reason } = req.body;  // Destructure userId from req.body
  try {
    const user = await Teacher.findById(userId);  // Use userId directly
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTeacherRequest = new TeacherRequest({ userId, name: user.name, startDate, endDate, reason });
    await newTeacherRequest.save();
    
    res.status(201).json(newTeacherRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// UPDATE LEAVE REQUEST STATUS
exports.updateLeaveRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const teacherRequest = await TeacherRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!teacherRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(teacherRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {

  try {
    const teacherRequests = await TeacherRequest.find({});
    // console.log(leaveRequests);
    res.json(teacherRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leave requests for a specific student
// Get leave requests for a specific student
exports.getTeacherLeaveRequests = async (req, res) => {
  const userId = req.params.id
  console.log(userId);

  try {
    let teacherRequests = await TeacherRequest.find({userId});
    // console.log(teacherRequests);
    res.json(teacherRequests)
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
