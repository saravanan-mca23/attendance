// const User = require("../models/user-model");

// const { hashPassword, comparePassword } = require("../helpers/helper")

const JWT = require("jsonwebtoken");
const Hod = require("../models/hod-model");
const Class = require("../models/sclassSchema")
const Subject = require("../models/subjectSchema")
 const Student = require("../models/studentSchema")
 const mongoose = require('mongoose');




const register = async(req, res) =>{
    try {
        const {name, email,  password } = req.body;
    if(!name){
        res.send({message: "Name is Required"});
    }

    if(!email){
        res.send({message: "Email is Required"});
    }

  
    if(!password){
        res.send({message: "Password is Required"});
    }

    
  
    //CHECK FOR EXISTING USER
    const existingUser = await Hod.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success: false,
            message: "HOD Already Exists!!!"
        });
    }

   
    //saving new user
    const user = await Hod.create({
        name, email, password
    });

    res.status(201).send({
        success: true, 
        message: "HOD Registration Successfull",
        user
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register",
            error
        });
    }

};


// *------------*
// LOGIN KA LOGIC
// *------------*

const login = async(req, res) => {
    try {

        //validation
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        //check if user exists or not
        const user = await Hod.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        // match password 
        // const match = await comparePassword(password, user.password);
        // if(!match){
        //     return res.status(404).send({
        //         success: false, 
        //         message: "Invalid email or password"
        //     });
        // }

        // Generate token if logged in successfull


            console.log("Login Success");
            res.status(200).send({
            success: true,
            message: "Login Successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                
            },
        
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};





// FETCHING CLASS

// controllers/classController.js


const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({});
        res.status(200).json(classes);
  
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET SUBJECTS 

const getSubjectsByClass = async (req, res) => {
    try {
        const { className } = req.query;
        const subjects = await Subject.find({ className });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};



// GET ATTENDANCE 

// routes/attendance.js

// const mongoose = require('mongoose');
// const Student = require('../models/Student');

const getAttendance = async (req, res) => {
    const { className, subject, date } = req.query;

    try {
        const classId = new mongoose.Types.ObjectId(className);
        const subjectId = new mongoose.Types.ObjectId(subject);

        const attendanceRecords = await Student.find({
            sclassName: classId,
            'attendance.subName': subjectId,
            'attendance.date': new Date(date),
        },
        {
            name: 1,
            rollNum: 1,
            attendance: { $elemMatch: { date: new Date(date), subName: subjectId } }
        }).populate('sclassName').populate('attendance.subName');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getAttendance };






module.exports = {register, login, getClasses, getSubjectsByClass,getAttendance}