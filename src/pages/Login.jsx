import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika login
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="login-card">
        {/* Kiri - Form */}
        <div className="login-left">
          <img src="/logo.png" alt="Logo Rasa Kata" className="logo" />
          <h2 className="welcome-title">Selamat Datang 👋</h2>
          <p className="welcome-text">
            Tempat di mana kata-kata jadi jendela emosimu.<br />
            Mari lanjutkan perjalanan memahami dirimu sendiri.
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <i className="icon">🔒</i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <i className="icon">🔑</i>
              <input type="password" placeholder="Password" required />
              <span className="eye-icon">👁️</span>
            </div>

            <a href="#" className="forgot-link">Lupa Password?</a>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="register-text">
            Belum punya akun? <a href="#" className="register-link">Daftar di sini</a>
          </p>
        </div>

        {/* Kanan - Ilustrasi */}
        <div className="login-right">
          <img src="/rocket.png" alt="Rocket" className="rocket-img" />
        </div>
      </div>
    </div>
  );
}
