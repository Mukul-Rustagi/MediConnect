const express = require('express');
const nodemailer = require("nodemailer");
const axios = require('axios');
const router = express.Router();
router.post('/sendEmail',async(req,res)=>{
    // console.log(req.body.appointmentData.data.appointment.doctorId);
    // console.log(doctor_id);

    let appointmentDate = req.body.appointmentData.data.appointment.createdAt;
    const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER, // Your Gmail ID
              pass: process.env.EMAIL_PASS, // Google App Password
            },
          });
    
        //   console.log(req.body);
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to:req.body.email,
            subject:"Patient-Doctor Appointment",
            text:`Dear Mediconnect user,

Your online appointment has been successfully booked.

Patient:${req.body.patientName}
Doctor: ${req.body.doctorName}
Date: ${appointmentDate}

Please join the meeting 5 minutes before your scheduled time.

Thank you,
MediConnect Team`
          };
          try {
            const p = await transporter.sendMail(mailOptions);
            // console.log("res",p)
            console.log("email sent successfully");
            res.status(200).json({ message: "Email sent successfully" });
          } catch (error) {
            // console.log(error);
            console.log("error while sending email",error);
            res.status(500).json({ message: "Error sending email", error });
          }
});



module.exports = router;
