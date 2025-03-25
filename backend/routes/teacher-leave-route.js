const express = require("express");
// const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware");
const { createLeaveRequest, getAllLeaveRequests, getTeacherLeaveRequests, updateLeaveRequestStatus } = require("../controllers/teacher-leave-controller");
const { getAttendance } = require("../controllers/hod-controller");


const router = express.Router();

// CREATE LEAVE REQUEST
router.route("/leave-request").post( createLeaveRequest);

// GET ALL REQUEST
router.route("/get-leave-request/:id").get( getAllLeaveRequests);

router.route("/get-teacher-request/:id").get( getTeacherLeaveRequests)


// UPDATE REQUEST
router.route("/update-leave-request/:id").put(updateLeaveRequestStatus)

router.get("/attendance/:id", getAttendance)

module.exports = router;