﻿# 🩺 MediConnect - Smart Telehealth Platform

**MediConnect** is an advanced telehealth web application that bridges the gap between doctors and patients through a smart, AI-integrated, real-time healthcare experience. Built with a scalable backend, secure payment systems, and intelligent services, MediConnect brings modern healthcare to your fingertips.

## 🚀 Features

### 👩‍⚕️ Role-Based Dashboards
- **Doctor Dashboard**: Manage appointments, view patient history, write prescriptions, and access video calls.
- **Patient Dashboard**: Book consultations, upload reports, view prescriptions, and receive AI-powered health insights.

### 🗺️ Doctor Discovery
- Search for doctors based on **location**, **specialization**, and **ratings** using an interactive **Mapbox/Google Maps** interface.

### 🤖 AI-Generated Diet Plans
- After appointments, patients receive personalized diet plans using **NLP-based AI** (Whisper/Deepgram + custom logic).

### 🔁 Redis Caching
- Frequently accessed data (like popular doctors, specializations, and AI diet templates) is cached using **Redis** for optimal performance.

### 📞 Secure Video Calls
- Enable real-time, HIPAA-compliant video consultations post-appointment using **WebRTC** or **Socket.IO** integration.

### 💳 Payment Integration
- Fast and secure payments through **Square Up** to confirm appointments and unlock premium services.

### 📝 Smart Prescriptions
- Doctors can write and manage digital prescriptions which are auto-saved, shareable, and retrievable from MongoDB.

### 📥 OTP-Based Login
- Secure authentication using **OTP verification** (email or SMS based) for both doctors and patients.

### 📤 File Uploads
- Upload profile pictures, medical reports, and prescriptions using **Multer**.

### 📊 Health History & Analytics
- Patients can track their medical history, appointment frequency, and health analytics over time.

---

## 🧠 Tech Stack

| Layer       | Technology                        |
|------------|-----------------------------------|
| Backend     | Node.js, Express.js (MVC)         |
| Frontend    | React.js / Next.js *(suggested)*  |
| Database    | MongoDB (Mongoose ODM)            |
| AI Services | Whisper / Deepgram + OpenAI API   |
| Video Call  | WebRTC / Socket.IO                |
| Payments    | Square Up                         |
| Caching     | Redis                             |
| Maps        | Mapbox / Google Maps              |
| Uploads     | Multer                            |
| Auth        | OTP (Email or SMS via Twilio/SendGrid) |
| Deployment  | Docker, NGINX, PM2 *(suggested)*  |

---

## 📁 Folder Structure (Backend)


🧩 **Reusable Components**: All major UI elements like forms, modals, cards, etc., are dynamically rendered with props to ensure reusability across pages.

📡 **Service Layer**: All backend communication is centralized in the `services/` folder for easy updates and better separation of concerns.

---
Backend:
cd mediconnect-backend
npm install
cp .env.example .env
# Add MongoDB URI, Redis config, Square API Keys, Twilio config
npm run dev

Frontend:
cd mediconnect-frontend
npm install
npm start


.env file
MONGO_URL='mongodb+srv://ayush:ayush@cluster0.4lunv.mongodb.net/MediConnect?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECRET='PIYUSH'
PAYPAL_CLIENT_ID=''
PAYPAL_CLIENT_SECRET=''
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER="adityarustagi1507@gmail.com"
EMAIL_PASSWORD='cxvv ugck afei yclx'
