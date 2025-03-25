const express = require("express");
const { login, register, getClasses, getSubjectsByClass, getAttendance } = require("../controllers/hod-controller");



const router = express.Router();

router.post('/hod-register', register);
router.post('/hod-login', login);


router.get("/classes", getClasses)
router.get("/subjects", getSubjectsByClass)
router.get("/attendance", getAttendance)


module.exports = router;