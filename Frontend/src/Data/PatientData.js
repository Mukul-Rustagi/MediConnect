const patientData = {
  name: "Johnnn Doe",
  upcomingAppointments: [
    {
      _id: "6643f0d1739b0d4a88f19b7a",
      title: "Follow-up Consultation",
      doctor: {
        _id: "6643f0d1739b0d4a88f19b72",
        name: "Dr. Jane Smith",
      },
      patient: {
        _id: "6643f0d1739b0d4a88f19b71",
        name: "John Doe",
      },
      date: "2025-05-20",
      time: "10:30 AM",
      location: "Room 101, General Clinic",
      status: "confirmed",
    },
    {
      _id: "6643f0d1739b0d4a88f19b7b",
      title: "Cardiology Review",
      doctor: {
        _id: "6643f0d1739b0d4a88f19b73",
        name: "Dr. Alan Grant",
      },
      patient: {
        _id: "6643f0d1739b0d4a88f19b71",
        name: "John Doe",
      },
      date: "2025-06-01",
      time: "2:00 PM",
      location: "Cardiology Wing",
      status: "pending",
    },
  ],
  messages: [],
  prescriptions: [
    {
      _id: "6643f0d1739b0d4a88f19b91",
      userId: {
        _id: "6643f0d1739b0d4a88f19b71",
        name: "John Doe",
      },
      doctorId: {
        _id: "6643f0d1739b0d4a88f19b72",
        name: "Dr. Jane Smith",
      },
      prescriptionDetails: {
        medications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "Twice a day",
          },
          {
            name: "Ibuprofen",
            dosage: "200mg",
            frequency: "Once a day",
          },
        ],
        instructions: "Take after meals. Finish full course.",
      },
      dateIssued: "2025-05-08",
    },
  ],
  billing: {
    totalDue: 125.5,
  },
};
export default patientData;
