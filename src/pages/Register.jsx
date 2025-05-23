import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../assets/styles/login.css";
import rocketImg from "../assets/img/rocket2.png";
import rasaKataImg from "../assets/img/logo-rasa-kata.png";
import lockIcon from "../assets/img/lockIcon.png";
import keyIcon from "../assets/img/keyIcon.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi tidak cocok.");
      return;
    }

    try {
      await register({ email, password });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Registrasi gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="container">
      <div className="register-card">
        {/* Kiri - Form */}
        <div className="register-left">
          <img src={rasaKataImg} alt="Logo Rasa Kata" className="logo" />
          <h2 className="welcome-title">Buat Akun Baru 🚀</h2>
          <p className="welcome-text">
            Mulailah perjalanan baru memahami dirimu.
            <br />
            Daftarkan dirimu dan jadilah bagian dari kami.
          </p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="register-form">
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Sembunyikan" : "Tampilkan"}
                style={{ userSelect: "none" }}
              >
                {showPassword ? "🚫" : "👁️"}
              </span>
            </div>
            <div className="input-group">
              <img src={keyIcon} alt="Key Icon" className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                title={showConfirmPassword ? "Sembunyikan" : "Tampilkan"}
                style={{ userSelect: "none" }}
              >
                {showConfirmPassword ? "🚫" : "👁️"}
              </span>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>

          <p className="register-text">
            Sudah punya akun?{" "}
            <Link to="/" className="register-link">
              Login di sini
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

export default Register;
