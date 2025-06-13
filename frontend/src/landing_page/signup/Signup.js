import React, { useState } from "react";
import axios from "axios";


const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }
  

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/api/auth/signup", form);
      setMessage({ type: "success", text: "Signup successful! Redirecting..." });
      setForm({ name: "", email: "", password: "" });

      // Redirect after short delay
      setTimeout(() => {
        setMessage(null);
      window.location.href = "http://localhost:3001"
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div className="container col-md-6 p-5">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Sign Up
      </h2>

      {/* Popup Message */}
      {message && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          } alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          required
          className="form-control p-3 fs-5"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          className="form-control p-3 fs-5"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          className="form-control p-3 fs-5"
        />

        <div className="text-center">
          <button type="submit" className="btn btn-primary fs-5 px-5 py-2">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;



