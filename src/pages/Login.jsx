import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";
import rocketImg from "../assets/img/rocket.png";
import rasaKataImg from "../assets/img/logo-rasa-kata.png";
import lockIcon from "../assets/img/lockIcon.png";
import keyIcon from "../assets/img/keyIcon.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika login
    navigate("/");
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

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <img src={lockIcon} alt="Lock Icon" className="input-icon" />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <img src={keyIcon} alt="Key Icon" className="input-icon" />
              <input type="password" placeholder="Password" required />
              <span className="eye-icon">👁️</span>
            </div>

            <a href="#" className="forgot-link">
              Lupa Password?
            </a>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-text">
            Belum punya akun?{" "}
            <a href="#" className="register-link">
              Daftar di sini
            </a>
          </p>
        </div>

        {/* Kanan - Ilustrasi */}
        <div className="login-right">
          <img src={rocketImg} alt="Rocket" className="rocket-img" />
        </div>
      </div>
    </div>
  );
}
