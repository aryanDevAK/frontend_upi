// Frontend for UPI Intent Payment Integration with Order Confirmation

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [orderId, setOrderId] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-upi.onrender.com/api/pay', {
        amount,
        upiId,
        name,
        transactionNote,
      });
      setPaymentLink(response.data.paymentLink);
      setOrderId(response.data.orderId);
      alert('Payment link generated!');
    } catch (error) {
      alert('Error generating payment link');
    }
  };

  const checkOrderStatus = async () => {
    try {
      const response = await axios.get(`https://backend-upi.onrender.com/api/order/${orderId}`);
      const { status } = response.data.order;

      if (status === 'success') {
        alert('Order Placed Successfully!');
      } else {
        alert('Payment Pending or Failed. Please try again.');
      }
    } catch (error) {
      alert('Error checking order status');
    }
  };

  return (
    <div className="container">
      <h1>UPI Payment Integration</h1>
      <form className="payment-form" onSubmit={handlePayment}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Merchant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Transaction Note (Optional)"
          value={transactionNote}
          onChange={(e) => setTransactionNote(e.target.value)}
        />
        <button type="submit">Generate Payment Link</button>
      </form>

      {paymentLink && (
        <div className="result">
          <h2>Payment Link</h2>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" onClick={checkOrderStatus}>
            Pay Now
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
