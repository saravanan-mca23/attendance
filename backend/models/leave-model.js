// userSchema from your previous code
const mongoose = require("mongoose");
// const Student = require("../models/studentSchema");

const leaveRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    name: {type: String, required:true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

const LeaveRequest = new mongoose.model("LeaveRequest", leaveRequestSchema);

module.exports = LeaveRequest;
