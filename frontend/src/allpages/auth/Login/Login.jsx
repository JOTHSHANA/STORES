import React, { useEffect, useState } from "react";
import "./Login.css";
import google from "../../../assets/google.png";
import Globalization from "../../../assets/Globalization.gif";
import apiHost from "../../../components/utils/api";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${apiHost}/auth/google`;
  };

  return (
    <div>
      <div className="total-login-page">
        <div className="login-card">
          <img src={Globalization} alt="Login Image" className="login-image" />
          <button className="signin-button" onClick={handleGoogleLogin}>
            <img src={google} alt="GoogleImage" className="google-logo" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import apiHost from "../../utils/api";

// function Login() {
//   const [token, setToken] = useState(null);

//   const googleAuth = () => {
//     window.open(${apiHost}/auth/google, "_self");
//   };

//   useEffect(() => {
//     console.log("Token updated:", token);
//   }, [token]);

//   // const handleLogin = () => {
//   //   // Perform login using JWT token
//   //   // You can send the token to your backend for verification
//   //   console.log("Logged in with token:", token);
//   //   // Add your login logic here
//   // };

//   const handleLogout = () => {
//     setToken(null);
//   };

//   return (
//     <div>
//       <h1>Log in Form</h1>
//       <div>
//         {!token ? (
//           <button onClick={googleAuth}>
//             <span>Sign in with Google</span>
//           </button>
//         ) : (
//           <div>
//             <p>You are logged in!</p>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
