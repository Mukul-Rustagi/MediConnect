const express = require('express');
const router = express.Router();
router.post('/sendSocketCode',async(req,res)=>{
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
                subject:"Appointment Meeting Code",
                text:`Dear User,
    
    Your online appointment code is ${req.body.socketCode}
    
    Thank you,
    MediConnect Team`
              };
              try {
                const p = await transporter.sendMail(mailOptions);
                // console.log("res",p)
                // console.log("email sent successfully");
                res.status(200).json({ message: "Email sent successfully" });
              } catch (error) {
                // console.log(error);
                // console.log("error while sending email",error);
                res.status(500).json({ message: "Error sending email", error });
              }
})
module.exports = router;