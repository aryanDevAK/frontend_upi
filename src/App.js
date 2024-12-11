// Frontend for UPI Intent Payment Integration

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/pay', {
        amount,
        upiId,
        name,
        transactionNote,
      });
      setPaymentLink(response.data.paymentLink);
      alert('Payment link generated!');
    } catch (error) {
      alert('Error generating payment link');
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
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Pay Now
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
