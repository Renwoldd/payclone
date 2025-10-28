// import React, { useState, useEffect } from "react";
// import api from "../axios";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"; // ✅ Back icon
// import bgLogin from "./bg_login.png"; // ✅ Background image

// function TwoFactorSetup() {
//   const [qr, setQr] = useState("");
//   const [secret, setSecret] = useState("");
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   useEffect(() => {
//     const fetchQr = async () => {
//       try {
//         const response = await api.post("/api/2fa/setup");
//         setQr(response.data.qr);
//         setSecret(response.data.secret);
//       } catch (err) {
//         console.error("Failed to fetch QR code:", err);
//         setError("Unable to load QR code. Try again later.");
//       }
//     };

//     fetchQr();
//   }, []);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/api/2fa/verify", { code });
//       alert("2FA enabled successfully!");
//       nav("/dashboard");
//     } catch (err) {
//       console.error("Verification failed:", err.response?.data || err.message);
//       setError("Invalid code. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="flex min-h-screen items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgLogin})` }}
//     >
//       <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-md p-8">
//         {/* ✅ Back Button */}
//         <button
//           onClick={() => nav(-1)}
//           className="mb-4 flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
//         >
//           <ArrowLeftCircleIcon className="h-6 w-6" />
//           <span className="font-medium">Back</span>
//         </button>

//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Enable Two-Factor Authentication
//         </h1>

//         {error && (
//           <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
//             {error}
//           </div>
//         )}

//         {qr ? (
//           <>
//             <div className="mb-4 text-center">
//               <img src={qr} alt="QR Code" className="mx-auto w-40 h-40" />
//               <p className="text-sm text-gray-600 mt-2">
//                 Scan this QR code with Google Authenticator or Authy.
//               </p>
//             </div>

//             <form onSubmit={handleVerify} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter 6-digit code
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="123456"
//                   required
//                   maxLength={6}
//                   pattern="\d{6}"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
//               >
//                 Verify & Enable 2FA
//               </button>
//             </form>
//           </>
//         ) : (
//           <p className="text-center text-gray-600">Loading QR code…</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TwoFactorSetup;



import React, { useState, useEffect } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
// import bgLogin from "./bg_login.png"; // ✅ Background image

function TwoFactorSetup() {
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await api.post("/api/2fa/setup");
        setQr(response.data.qr);
        setSecret(response.data.secret);
      } catch (err) {
        console.error("Failed to fetch QR code:", err);
        setError("Unable to load QR code. Try again later.");
      }
    };

    fetchQr();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/api/2fa/verify", { code });
      alert("✅ Two-Factor Authentication enabled successfully!");
      nav("/dashboard");
    } catch (err) {
      console.error("Verification failed:", err.response?.data || err.message);
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
    // style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-8">
        {/* Back Button */}
        <button
          onClick={() => nav(-1)}
          className="mb-4 flex items-center gap-2 text-[#0070BA] hover:text-[#005c99] transition"
        >
          <ArrowLeftCircleIcon className="h-6 w-6" />
          <span className="font-medium">Back</span>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enable Two-Factor Authentication
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        {/* QR Section */}
        {qr ? (
          <>
            <div className="mb-6 text-center">
              <img
                src={qr}
                alt="QR Code"
                className="mx-auto w-40 h-40 border border-gray-200 rounded-xl shadow-sm"
              />
              <p className="text-sm text-gray-600 mt-3">
                Scan this QR code with{" "}
                <span className="font-semibold text-[#0070BA]">
                  Google Authenticator
                </span>{" "}
                or{" "}
                <span className="font-semibold text-[#0070BA]">Authy</span>.
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter 6-digit code
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0070BA]/60 focus:border-[#0070BA] p-2 text-center tracking-widest text-lg"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  required
                  maxLength={6}
                  pattern="\d{6}"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0070BA] text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#005c99] hover:shadow-lg hover:scale-[1.02] transition"
              >
                Verify & Enable 2FA
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <div className="animate-spin h-8 w-8 border-4 border-[#0070BA] border-t-transparent rounded-full mx-auto mb-3"></div>
            <p>Loading your QR code...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TwoFactorSetup;
