
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
const leaveRoutes = require("./routes/leave-route.js")
const teacherLeaveRoutes = require("./routes/teacher-leave-route.js")
const hodRoutes = require("./routes/hod-route.js")



const PORT = 5000


// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
    .connect('mongodb+srv://yrsaravanan77:yrsaravanan77@cluster0.q8brunl.mongodb.net/college')
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))
 
app.use('/', Routes);
app.use("/student", leaveRoutes)
app.use("/teacher", teacherLeaveRoutes)
app.use("/hod", hodRoutes)


app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})