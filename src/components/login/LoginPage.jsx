import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoEye, IoEyeOff, IoMail, IoLockClosed } from "react-icons/io5"; // Import icons
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  // Dummy Google Login Function
  const handleGoogleLogin = () => {
    alert("Google login is currently unavailable.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email/Password Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md w-full pl-10"
              required
            />
            <IoMail className="absolute left-3 top-3 text-gray-500" size={20} />
          </div>

          {/* Password Input with Show/Hide Feature */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md w-full pl-10 pr-10"
              required
            />
            <IoLockClosed
              className="absolute left-3 top-3 text-gray-500"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          <p className="text-start text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup here
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <hr className="my-4" />

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 flex items-center justify-center gap-2 w-full"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="w-5 h-5 "
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
