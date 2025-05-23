import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../assets/styles/login.css";
import rocketImg from "../assets/img/rocket.png";
import rasaKataImg from "../assets/img/logo-rasa-kata.png";
import lockIcon from "../assets/img/lockIcon.png";
import keyIcon from "../assets/img/keyIcon.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to feed if already logged in
  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        {/* Kiri - Form */}
        <div className="login-left">
          <img src={rasaKataImg} alt="Logo Rasa Kata" className="logo" />
          <h2 className="welcome-title">Selamat Datang 👋</h2>
          <p className="welcome-text">
            Tempat di mana kata-kata jadi jendela emosimu.
            <br />
            Mari lanjutkan perjalanan memahami dirimu sendiri.
          </p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={keyIcon} alt="Key Icon" className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon">👁️</span>
            </div>

            <a href="#" className="forgot-link">
              Lupa Password?
            </a>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-text">
            Belum punya akun?{" "}
            <Link to="/register" className="register-link">
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Kanan - Ilustrasi */}
        <div className="login-right">
          <img src={rocketImg} alt="Rocket" className="rocket-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
