// import React, { useState, useContext } from 'react';
// import API from '../axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'; // ✅ Back icon
// import bgLogin from './bg_login.png'; // ✅ Background image

// export default function Register() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     password_confirmation: ''
//   });

//   const [errors, setErrors] = useState({});
//   const nav = useNavigate();
//   const { setUser, fetchUser } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const registerRes = await API.post('/api/register', form);

//       const loginRes = await API.post('/api/login', {
//         email: form.email.trim(),
//         password: form.password,
//       });

//       const token = loginRes.data.token;
//       localStorage.setItem('token', token);

//       await fetchUser();
//       nav('/dashboard');
//     } catch (err) {
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors);
//       } else {
//         alert(err.response?.data?.message || 'Register failed');
//       }
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgLogin})` }}
//     >
//       <form className="p-6 bg-white bg-opacity-90 backdrop-blur-md rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
//         {/* ✅ Back Button */}
//         <button
//           type="button"
//           onClick={() => nav(-1)}
//           className="mb-4 flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
//         >
//           <ArrowLeftCircleIcon className="h-6 w-6" />
//           <span className="font-medium">Back</span>
//         </button>

//         <h2 className="text-xl mb-4">Register</h2>

//         <input
//           placeholder="Full name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           className="mb-2 w-full p-2 border"
//         />
//         {errors.name && <div className="text-red-500">{errors.name}</div>}

//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           className="mb-2 w-full p-2 border"
//         />
//         {errors.email && <div className="text-red-500">{errors.email}</div>}

//         <input
//           placeholder="Phone"
//           value={form.phone}
//           onChange={e => setForm({ ...form, phone: e.target.value })}
//           className="mb-2 w-full p-2 border"
//         />
//         {errors.phone && <div className="text-red-500">{errors.phone}</div>}

//         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//         <ul className="text-xs text-gray-500 mb-2 list-disc pl-4">
//           <li>Minimum 8 characters</li>
//           <li>At least one uppercase and lowercase letter</li>
//           <li>At least one number</li>
//           <li>At least one symbol</li>
//         </ul>
//         <input
//           type="password"
//           placeholder="••••••••"
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//           className="mb-2 w-full p-2 border"
//         />
//         {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={form.password_confirmation}
//           onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
//           className="mb-2 w-full p-2 border"
//         />
//         {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}

//         <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useContext } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
// import paypalLogo from "./paypal-logo.png"; // ✅ PayPal-style logo

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await API.post("/api/register", form);
      const loginRes = await API.post("/api/login", {
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", loginRes.data.token);
      await fetchUser();
      nav("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || "Register failed");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* <img src={paypalLogo} alt="PayPal" className="h-8" /> */}
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => nav(-1)}
          className="mb-4 flex items-center gap-2 text-[#0070BA] hover:text-[#005C9E] transition text-sm"
        >
          <ArrowLeftCircleIcon className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <div className="text-red-500 text-xs">{errors.name}</div>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email}</div>
          )}

          {/* Phone */}
          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <div className="text-red-500 text-xs">{errors.phone}</div>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <div className="text-red-500 text-xs">{errors.password}</div>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm({ ...form, password_confirmation: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password_confirmation && (
            <div className="text-red-500 text-xs">
              {errors.password_confirmation}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0070BA] text-white py-2 rounded-md font-semibold hover:bg-[#005C9E] transition"
          >
            Create Account
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#0070BA] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
