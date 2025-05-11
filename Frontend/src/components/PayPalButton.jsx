import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosinstance";

const SquarePaymentButton = ({ amount, user, token, appointmentData }) => {
  const paymentFormRef = useRef();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showTestCards, setShowTestCards] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from token
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        console.log('Decoded token data:', decoded);
        setUserData({
          email: decoded.email,
          name: decoded.name,
          id: decoded.id
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSquareScript = () => {
      if (window.Square) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
      script.async = true;
      
      script.onload = () => {
        if (isMounted) {
          setIsScriptLoaded(true);
        }
      };
      
      script.onerror = (e) => {
        console.error("Square script failed to load", e);
        setPaymentError("Failed to load payment system");
      };

      document.body.appendChild(script);
    };

    loadSquareScript();

    return () => {
      isMounted = false;
      if (paymentFormRef.current) {
        paymentFormRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !paymentFormRef.current || !userData) return;

    const initializeSquare = async () => {
      try {
        const payments = window.Square.payments('sandbox-sq0idb-s0E3vWhPV50yN_YrojbO1Q', 'EAAAl-2AMDEcC0VzxUZe__ZXwYw7J5mGMl96E6Sdwcj4P6jChght__7FoCGc2AP9');
        const card = await payments.card();
        await card.attach('#card-container');

        const paymentForm = document.getElementById('payment-form');
        const handlePaymentSubmit = async (event) => {
          event.preventDefault();
          setPaymentError(null);
          setIsProcessing(true);

          try {
            const result = await card.tokenize();
            if (result.status === 'OK') {
              console.log('Card tokenized successfully:', result);
              
              // Parse the time string (e.g., "10:00 AM")
              const [time, period] = appointmentData.time.split(' ');
              const [hours, minutes] = time.split(':');
              let hour = parseInt(hours);
              if (period === 'PM' && hour !== 12) hour += 12;
              if (period === 'AM' && hour === 12) hour = 0;
              
              // Create date object and set time
              const dateTime = new Date(appointmentData.date);
              dateTime.setHours(hour, parseInt(minutes), 0, 0);

              const response = await axiosInstance.post('/payment', {
                sourceId: result.token,
                amount: amount,
                appointmentData: {
                  userId: userData.id,
                  doctorId: appointmentData.doctorId,
                  dateTime: dateTime.toISOString(),
                  status: 'completed'
                }
              });

              if (response.data.success) {
                console.log('Payment successful:', response.data);
                window.location.reload();
              } else {
                throw new Error(response.data.message || 'Payment failed');
              }
            } else {
              throw new Error('Card tokenization failed');
            }
          } catch (error) {
            console.error('Payment failed:', error);
            setPaymentError(error.message || 'Payment failed. Please try again.');
          } finally {
            setIsProcessing(false);
          }
        };

        paymentForm.addEventListener('submit', handlePaymentSubmit);
      } catch (error) {
        console.error("Square initialization error:", error);
        setPaymentError("Failed to initialize payment system");
      }
    };

    initializeSquare();
  }, [isScriptLoaded, amount, user, token, appointmentData, userData]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div ref={paymentFormRef} className="payment-container">
      <div className="test-cards-info mb-3">
        <button 
          className="btn btn-link p-0" 
          onClick={() => setShowTestCards(!showTestCards)}
        >
          {showTestCards ? 'Hide Test Cards' : 'Show Test Cards'}
        </button>
        
        {showTestCards && (
          <div className="test-cards mt-2 p-3 bg-light rounded">
            <h6>Test Card Numbers:</h6>
            <ul className="list-unstyled">
              <li><strong>Visa:</strong> 4111 1111 1111 1111</li>
              <li><strong>Mastercard:</strong> 5555 5555 5555 4444</li>
              <li><strong>Expiry:</strong> Any future date</li>
              <li><strong>CVV:</strong> Any 3 digits</li>
              <li><strong>Postal Code:</strong> Any 5 digits</li>
            </ul>
          </div>
        )}
      </div>

      {paymentError && (
        <div className="alert alert-danger mb-3">
          {paymentError}
        </div>
      )}

      <form id="payment-form">
        <div id="card-container" className="mb-3"></div>
        <button 
          id="card-button" 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
};

export default SquarePaymentButton;
