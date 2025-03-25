const Student = require("../models/studentSchema")

exports.getStudentController = async (req, res) => {
    try {
        const users = await Student.find({});
        
        if (users.length === 0) {
            return res.status(400).send({
                success: false,
                message: "No students found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Fetched successfully",
            users
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in fetching students",
        });
    }
}
