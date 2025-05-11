// src/App.js
import React, { useState, useEffect } from "react";
import MapComponent from "./Near_By_Hospitals2";
import "../styles/Near_By_Hospitals.css";
import "../styles/Modal.css";
// import hospitalData from './your-hospitals-data';

const Near_By_Hospitals = ({ onClose }) => {
  const hospitalData = [
    { name: "", state: "DELHI", latitude: 28.5672, longitude: 77.21 },
    { name: "", state: "DELHI", latitude: 28.6059, longitude: 77.0383 },
    { name: "", state: "DELHI", latitude: 28.6741, longitude: 77.1339 },
    { name: "", state: "DELHI", latitude: 28.568, longitude: 77.2058 },
    { name: "", state: "DELHI", latitude: 28.5413, longitude: 77.2832 },
    { name: "", state: "DELHI", latitude: 28.6668, longitude: 77.2146 },
    { name: "", state: "DELHI", latitude: 28.684, longitude: 77.3094 },
    { name: "", state: "DELHI", latitude: 28.6196, longitude: 77.0821 },
    { name: "", state: "GUJARAT", latitude: 23.053967, longitude: 72.603844 },
    { name: "", state: "GUJARAT", latitude: 23.0547, longitude: 72.6311 },
    { name: "", state: "GUJARAT", latitude: 23.1096, longitude: 72.6264 },
    { name: "", state: "GUJARAT", latitude: 23.045, longitude: 72.59 },
    { name: "", state: "GUJARAT", latitude: 23.0265, longitude: 72.5827 },
    { name: "", state: "GUJARAT", latitude: 22.554609, longitude: 72.967361 },
    { name: "", state: "GUJARAT", latitude: 21.182947, longitude: 72.831581 },
    { name: "", state: "GUJARAT", latitude: 23.02557, longitude: 72.527458 },
    { name: "", state: "PUNJAB", latitude: 31.545771, longitude: 76.231384 },
    { name: "", state: "PUNJAB", latitude: 30.804373, longitude: 76.497116 },
    { name: "", state: "PUNJAB", latitude: 31.3334201, longitude: 75.5619671 },
    { name: "", state: "PUNJAB", latitude: 29.3573365, longitude: 76.9607831 },
    { name: "", state: "PUNJAB", latitude: 30.1357, longitude: 77.266 },
    { name: "", state: "PUNJAB", latitude: 31.6447, longitude: 74.8599 },
    { name: "", state: "PUNJAB", latitude: 30.3679, longitude: 75.5405 },
    { name: "", state: "PUNJAB", latitude: 30.722949, longitude: 76.712036 },
    { name: "", state: "PUNJAB", latitude: 30.37451, longitude: 75.5487 },
    { name: "", state: "PUNJAB", latitude: 31.6348, longitude: 74.9663 },
    { name: "", state: "PUNJAB", latitude: 23.0578, longitude: 79.843 },
    { name: "", state: "PUNJAB", latitude: 31.096134, longitude: 75.77877 },
    {
      name: "",
      state: "MAHARASHTRA",
      latitude: 18.48587,
      longitude: 73.905853,
    },
    {
      name: "",
      state: "UTTAR PRADESH",
      latitude: 28.456789,
      longitude: 77.072472,
    },
    {
      name: "",
      state: "ANDHRA PRADESH",
      latitude: 16.511965,
      longitude: 80.633163,
    },
    { name: "", state: "TAMIL NADU", latitude: 8.749402, longitude: 78.168137 },
    { name: "", state: "PUNJAB", latitude: 30.912411, longitude: 75.819412 },
    { name: "", state: "DELHI", latitude: 28.653229, longitude: 77.308601 },
    {
      name: "",
      state: "UTTAR PRADESH",
      latitude: 28.231674,
      longitude: 80.862534,
    },
    { name: "", state: "KARNATAKA", latitude: 12.571047, longitude: 77.001183 },
    { name: "", state: "DELHI", latitude: 28.575552, longitude: 77.262192 },
    { name: "", state: "PUNJAB", latitude: 31.52462, longitude: 75.902008 },
    {
      name: "",
      state: "ANDHRA PRADESH",
      latitude: 17.733288,
      longitude: 83.275429,
    },
    { name: "", state: "TAMIL NADU", latitude: 13.07279, longitude: 80.234421 },
    {
      name: "",
      state: "WEST BENGAL",
      latitude: 22.674788,
      longitude: 87.827484,
    },
    {
      name: "",
      state: "MAHARASHTRA",
      latitude: 18.643318,
      longitude: 73.756042,
    },
    { name: "", state: "GOA", latitude: 15.589379, longitude: 73.816574 },
    {
      name: "",
      state: "WEST BENGAL",
      latitude: 22.742229,
      longitude: 88.05146,
    },
    {
      name: "",
      state: "MAHARASHTRA",
      latitude: 16.709822,
      longitude: 74.227463,
    },
    {
      name: "",
      state: "MADHYA PRADESH",
      latitude: 23.830975,
      longitude: 80.40712,
    },
    { name: "", state: "ODISHA", latitude: 20.651484, longitude: 84.629814 },
    { name: "", state: "ODISHA", latitude: 20.650694, longitude: 84.631775 },
    { name: "", state: "TELANGANA", latitude: 17.357861, longitude: 78.557442 },
    {
      name: "",
      state: "TAMIL NADU",
      latitude: 13.030947,
      longitude: 80.171585,
    },
    {
      name: "",
      state: "TAMIL NADU",
      latitude: 13.095658,
      longitude: 80.206116,
    },
    { name: "", state: "CHENNAI", latitude: 13.109593, longitude: 80.246666 },
    { name: "", state: "ODISHA", latitude: 20.457838, longitude: 85.871536 },
    { name: "", state: "TEALANGANA", latitude: 17.786711, longitude: 79.02697 },
    {
      name: "",
      state: "TAMIL NADU",
      latitude: 11.578299,
      longitude: 78.753654,
    },
    {
      name: "",
      state: "UTTAR PRADESH",
      latitude: 27.597265,
      longitude: 78.045441,
    },
    {
      name: "",
      state: "MAHARASHTRA",
      latitude: 18.399286,
      longitude: 73.769058,
    },
    {
      name: "",
      state: "UTTAR PRADESH",
      latitude: 25.458599,
      longitude: 78.615517,
    },
    {
      name: "AIIMS (All India Institute of Medical Sciences)",
      state: "DELHI",
      latitude: 28.5672,
      longitude: 77.21,
    },
    {
      name: "Safdarjung Hospital",
      state: "DELHI",
      latitude: 28.5684,
      longitude: 77.209,
    },
    {
      name: "Sir Ganga Ram Hospital",
      state: "DELHI",
      latitude: 28.6417,
      longitude: 77.1891,
    },
    {
      name: "Max Super Specialty Hospital, Saket",
      state: "DELHI",
      latitude: 28.5272,
      longitude: 77.2205,
    },
    {
      name: "Fortis Escorts Heart Institute",
      state: "DELHI",
      latitude: 28.5618,
      longitude: 77.2753,
    },
    {
      name: "Indraprastha Apollo Hospital",
      state: "DELHI",
      latitude: 28.5378,
      longitude: 77.2913,
    },
    {
      name: "BLK Super Specialty Hospital",
      state: "DELHI",
      latitude: 28.6415,
      longitude: 77.182,
    },
    {
      name: "Ram Manohar Lohia Hospital",
      state: "DELHI",
      latitude: 28.6248,
      longitude: 77.2001,
    },
    {
      name: "Moolchand Medcity",
      state: "DELHI",
      latitude: 28.5699,
      longitude: 77.24,
    },
    {
      name: "Deen Dayal Upadhyay Hospital",
      state: "DELHI",
      latitude: 28.6518,
      longitude: 77.1185,
    },
    {
      name: "Lok Nayak Hospital",
      state: "DELHI",
      latitude: 28.6411,
      longitude: 77.2347,
    },
    {
      name: "GB Pant Hospital",
      state: "DELHI",
      latitude: 28.6387,
      longitude: 77.2408,
    },
    {
      name: "Vardhman Mahavir Medical College & Safdarjung Hospital",
      state: "DELHI",
      latitude: 28.5678,
      longitude: 77.2102,
    },
    {
      name: "Dr. Ram Manohar Lohia Hospital",
      state: "DELHI",
      latitude: 28.6233,
      longitude: 77.1974,
    },
    {
      name: "Lady Hardinge Medical College & Hospital",
      state: "DELHI",
      latitude: 28.6369,
      longitude: 77.2106,
    },
    {
      name: "Batra Hospital & Medical Research Centre",
      state: "DELHI",
      latitude: 28.5066,
      longitude: 77.2361,
    },
    {
      name: "Rajiv Gandhi Cancer Institute & Research Centre",
      state: "DELHI",
      latitude: 28.7007,
      longitude: 77.1169,
    },
    {
      name: "Dr. BL Kapur Memorial Hospital",
      state: "DELHI",
      latitude: 28.6511,
      longitude: 77.1902,
    },
    {
      name: "National Heart Institute",
      state: "DELHI",
      latitude: 28.5466,
      longitude: 77.2508,
    },
    {
      name: "Jaipur Golden Hospital",
      state: "DELHI",
      latitude: 28.7053,
      longitude: 77.1103,
    },
    {
      name: "Sunder Lal Jain Hospital",
      state: "DELHI",
      latitude: 28.7079,
      longitude: 77.1421,
    },
    {
      name: "Holy Family Hospital",
      state: "DELHI",
      latitude: 28.5626,
      longitude: 77.2577,
    },
    {
      name: "Sanjeevan Hospital",
      state: "DELHI",
      latitude: 28.6461,
      longitude: 77.2247,
    },
    {
      name: "Jeevan Hospital",
      state: "DELHI",
      latitude: 28.6381,
      longitude: 77.2495,
    },
    {
      name: "Shanti Mukand Hospital",
      state: "DELHI",
      latitude: 28.647,
      longitude: 77.2902,
    },
    {
      name: "King George Hospital",
      state: "ANDHRA PRADESH",
      latitude: 17.7041,
      longitude: 83.2977,
    },
    {
      name: "Guntur General Hospital",
      state: "ANDHRA PRADESH",
      latitude: 16.2997,
      longitude: 80.4573,
    },
    {
      name: "Andhra Hospitals",
      state: "ANDHRA PRADESH",
      latitude: 16.5062,
      longitude: 80.6525,
    },
    {
      name: "Kamineni Hospitals",
      state: "ANDHRA PRADESH",
      latitude: 16.5051,
      longitude: 80.6657,
    },
    {
      name: "NRI General Hospital",
      state: "ANDHRA PRADESH",
      latitude: 16.381,
      longitude: 80.7327,
    },
    {
      name: "Sri Venkateswara Institute of Medical Sciences",
      state: "ANDHRA PRADESH",
      latitude: 13.6288,
      longitude: 79.4192,
    },
    {
      name: "Apollo Hospitals, Visakhapatnam",
      state: "ANDHRA PRADESH",
      latitude: 17.7265,
      longitude: 83.3166,
    },
    {
      name: "Care Hospitals, Visakhapatnam",
      state: "ANDHRA PRADESH",
      latitude: 17.7186,
      longitude: 83.3121,
    },
    {
      name: "Ramesh Hospitals, Vijayawada",
      state: "ANDHRA PRADESH",
      latitude: 16.5028,
      longitude: 80.6304,
    },
    {
      name: "KIMS Hospital, Ongole",
      state: "ANDHRA PRADESH",
      latitude: 15.5057,
      longitude: 80.0443,
    },
    {
      name: "Padmavati Hospital, Tirupati",
      state: "ANDHRA PRADESH",
      latitude: 13.6278,
      longitude: 79.4176,
    },
    {
      name: "Seven Hills Hospital, Visakhapatnam",
      state: "ANDHRA PRADESH",
      latitude: 17.7283,
      longitude: 83.3018,
    },
    {
      name: "Government General Hospital, Kakinada",
      state: "ANDHRA PRADESH",
      latitude: 16.9338,
      longitude: 82.2338,
    },
    {
      name: "Government Hospital, Kadapa",
      state: "ANDHRA PRADESH",
      latitude: 14.4727,
      longitude: 78.8326,
    },
    {
      name: "GSL Medical College & General Hospital, Rajahmundry",
      state: "ANDHRA PRADESH",
      latitude: 17.0144,
      longitude: 81.7768,
    },
    {
      name: "Ramesh Hospitals, Guntur",
      state: "ANDHRA PRADESH",
      latitude: 16.2984,
      longitude: 80.4483,
    },
    {
      name: "Care Hospitals, Vijayawada",
      state: "ANDHRA PRADESH",
      latitude: 16.5075,
      longitude: 80.6391,
    },
    {
      name: "Manipal Hospitals, Vijayawada",
      state: "ANDHRA PRADESH",
      latitude: 16.518,
      longitude: 80.6251,
    },
    {
      name: "Sri Sathya Sai Institute of Higher Medical Sciences, Puttaparthi",
      state: "ANDHRA PRADESH",
      latitude: 14.165,
      longitude: 77.8103,
    },
    {
      name: "Visakha Institute of Medical Sciences, Visakhapatnam",
      state: "ANDHRA PRADESH",
      latitude: 17.7362,
      longitude: 83.3276,
    },
    {
      name: "Anantapur Government Hospital",
      state: "ANDHRA PRADESH",
      latitude: 14.6825,
      longitude: 77.6,
    },
    {
      name: "Narayana Medical College & Hospital, Nellore",
      state: "ANDHRA PRADESH",
      latitude: 14.4335,
      longitude: 79.9706,
    },
    {
      name: "Sunshine Hospitals, Vijayawada",
      state: "ANDHRA PRADESH",
      latitude: 16.5053,
      longitude: 80.6498,
    },
    {
      name: "Simhachalam Hospital, Visakhapatnam",
      state: "ANDHRA PRADESH",
      latitude: 17.7679,
      longitude: 83.2177,
    },
    {
      name: "Apollo Specialty Hospitals, Nellore",
      state: "ANDHRA PRADESH",
      latitude: 14.4524,
      longitude: 79.978,
    },
    {
      name: "Gauhati Medical College and Hospital",
      state: "ASSAM",
      latitude: 26.1386,
      longitude: 91.586,
    },
    {
      name: "Dispur Polyclinic",
      state: "ASSAM",
      latitude: 26.1074,
      longitude: 91.7234,
    },
    {
      name: "Apollo Hospitals, Guwahati",
      state: "ASSAM",
      latitude: 26.1604,
      longitude: 91.7674,
    },
    {
      name: "Nemcare Hospital",
      state: "ASSAM",
      latitude: 26.15,
      longitude: 91.738,
    },
    {
      name: "LGB Regional Institute of Mental Health",
      state: "ASSAM",
      latitude: 26.14,
      longitude: 91.5802,
    },
    {
      name: "Tezpur Medical College and Hospital",
      state: "ASSAM",
      latitude: 26.6395,
      longitude: 92.8056,
    },
    {
      name: "Assam Medical College and Hospital",
      state: "ASSAM",
      latitude: 27.4963,
      longitude: 95.5735,
    },
    {
      name: "Jorhat Medical College and Hospital",
      state: "ASSAM",
      latitude: 26.7437,
      longitude: 94.1862,
    },
    {
      name: "SSUHS Medical College",
      state: "ASSAM",
      latitude: 26.1616,
      longitude: 91.7256,
    },
    {
      name: "Gauhati University Medical Center",
      state: "ASSAM",
      latitude: 26.1385,
      longitude: 91.5932,
    },
    {
      name: "Himalaya Hospital",
      state: "ASSAM",
      latitude: 26.1762,
      longitude: 91.7451,
    },
    {
      name: "Brahmaputra Hospital",
      state: "ASSAM",
      latitude: 26.0874,
      longitude: 91.6274,
    },
    {
      name: "Nagaon Medical College",
      state: "ASSAM",
      latitude: 26.3373,
      longitude: 92.6576,
    },
    {
      name: "North Lakhimpur Civil Hospital",
      state: "ASSAM",
      latitude: 27.2362,
      longitude: 94.065,
    },
    {
      name: "Bongaigaon Super Specialty Hospital",
      state: "ASSAM",
      latitude: 26.4666,
      longitude: 90.5632,
    },
    {
      name: "Karimganj Medical College",
      state: "ASSAM",
      latitude: 24.8121,
      longitude: 92.3746,
    },
    {
      name: "Silchar Medical College and Hospital",
      state: "ASSAM",
      latitude: 24.8144,
      longitude: 92.7741,
    },
    {
      name: "Cachar Cancer Hospital and Research Centre",
      state: "ASSAM",
      latitude: 24.804,
      longitude: 92.7582,
    },
    {
      name: "Guwahati Neurological Research Centre",
      state: "ASSAM",
      latitude: 26.1418,
      longitude: 91.7746,
    },
    {
      name: "Madhabdev Hospital",
      state: "ASSAM",
      latitude: 26.147,
      longitude: 91.713,
    },
    {
      name: "Krishna Kanta Handique State Open University Hospital",
      state: "ASSAM",
      latitude: 26.122,
      longitude: 91.6175,
    },
    //{ name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // { name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // { name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // { name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // { name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // { name: "", state: "DELHI", lat:	28.5672, lon:77.2100},
    // Add more hospital data as needed
  ];
  const states = [
    "ANDHRA PRADESH",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHHATTISGARH",
    "GOA",
    "GUJARAT",
    "HARYANA",
    "HIMACHAL PRADESH",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "ODISHA",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TELANGANA",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTARAKHAND",
    "WEST BENGAL",
    "DELHI",
  ];

  const [selectedState, setSelectedState] = useState("");

  const handleSelectState = (state) => {
    setSelectedState(state);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nearby Hospitals</h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="state-selector">
          <select
            value={selectedState}
            onChange={(e) => handleSelectState(e.target.value)}
            className="state-dropdown"
          >
            <option value="">Select a State</option>
            <option value="DELHI">Delhi</option>
            <option value="GUJARAT">Gujarat</option>
            <option value="PUNJAB">Punjab</option>
            <option value="MAHARASHTRA">Maharashtra</option>
            <option value="UTTAR PRADESH">Uttar Pradesh</option>
            <option value="ANDHRA PRADESH">Andhra Pradesh</option>
            <option value="TAMIL NADU">Tamil Nadu</option>
            <option value="KARNATAKA">Karnataka</option>
            <option value="WEST BENGAL">West Bengal</option>
            <option value="GOA">Goa</option>
            <option value="MADHYA PRADESH">Madhya Pradesh</option>
            <option value="ODISHA">Odisha</option>
            <option value="TELANGANA">Telangana</option>
            <option value="CHENNAI">Chennai</option>
          </select>
        </div>
        <div className="map-container">
          <MapComponent
            hospitalData={hospitalData}
            selectedState={selectedState}
          />
        </div>
      </div>
    </div>
  );
};

export default Near_By_Hospitals;
