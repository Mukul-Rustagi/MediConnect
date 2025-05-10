// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendAppointmentConfirmation = async (toEmail, appointmentDetails) => {
  const mailOptions = {
    from: `MediConnect <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Appointment Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2c3e50;">Appointment Booked Successfully!</h2>
        <p>Dear ${appointmentDetails.user.name},</p>
        <p>Your appointment has been confirmed with the following details:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
          <p><strong>Date:</strong> ${new Date(appointmentDetails.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${appointmentDetails.time}</p>
          <p><strong>Doctor:</strong> Dr. ${appointmentDetails.doctor.name}</p>
          <p><strong>Department:</strong> ${appointmentDetails.department}</p>
        </div>

        <p style="margin-top: 20px;">
          Please arrive 15 minutes prior to your appointment time. 
          You can manage your appointment through your MediConnect account.
        </p>
        
        <p>Best regards,<br/>MediConnect Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};