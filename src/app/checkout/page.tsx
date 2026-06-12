// Daniel Faniyi - Client Checkout Order Submission Screen

"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [deliveryName, setDeliveryName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!deliveryName || !address || !phone) {
      setMessage("Please complete all fields.");
      return;
    }

    setMessage("Order confirmed and submitted successfully.");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Checkout Order Submission</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Delivery Name"
          value={deliveryName}
          onChange={(e) => setDeliveryName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Confirm Order
        </button>

        {message && (
          <div>
            <strong>{message}</strong>
          </div>
        )}
      </div>
    </main>
  );
}