const express = require("express");
// const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware");
const { createLeaveRequest, getAllLeaveRequests, getStudentLeaveRequests, updateLeaveRequestStatus } = require("../controllers/leave-controller");

const {getStudentController} = require("../controllers/attendance-controller");
const { getClass } = require("../controllers/student_controller");


const router = express.Router();

// CREATE LEAVE REQUEST
router.route("/leave-request").post( createLeaveRequest);

// GET ALL REQUEST
router.route("/get-leave-request/:id").get( getAllLeaveRequests);

router.route("/getstudentrequest/:id").get( getStudentLeaveRequests)


// UPDATE REQUEST
router.route("/update-leave-request/:id").put(updateLeaveRequestStatus)

router.route('/getallstudent/:classId').get(getClass)



module.exports = router;