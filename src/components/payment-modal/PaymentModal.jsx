import React, { useState } from 'react';
import './payment.css';

export const CheckoutModal = ({ isOpen, handleClose, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const initializePaystack = async (amount) => {
    await loadScript('');
    const publicKey = '';

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: '',
      amount,
      currency: 'NGN',
      ref: `${Math.floor(Math.random() * 1000000000)}`,
      callback: function (response) {
        console.log('Payment successful', response);
      },
      onClose: function () {
        console.log('Payment modal closed');
      }
    });

    handler.openIframe(); 
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentMethod === 'credit_card') {
      initializePaystack();
    }
  };

  return (
    <div className={`checkout-modal ${isOpen ? 'open' : ''}`}>
      <div className="checkout-modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        <h2>Checkout</h2>
        {/* <select id="paymentMethod" name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select> */}
        <form className="checkout-form" onSubmit={handlePayment}>
          {/* <input type="number" onChange={(e)=> setAmount(e.target.value * 100)}/> */}
          <button type="submit" className="pay-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
};
