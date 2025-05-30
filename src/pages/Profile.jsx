import React, { useState, useEffect } from "react";
import "../assets/styles/profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [formData, setFormData] = useState({ ...profileData });

  useEffect(() => {
    // Dummy data
    const fetchProfile = async () => {
      const dummyData = {
        username: "user123",
        email: "user@example.com",
        password: "********"
      };

      // Simulasi delay
      setTimeout(() => {
        setProfileData(dummyData);
        setFormData(dummyData);
      }, 500);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    if (isEditing) {
      setProfileData({ ...formData });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <span className="avatar-initial">
                  {formData.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="profile-name">{formData.username}</h2>
              <p className="profile-subtitle">Kelola informasi profil Anda</p>
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'disabled' : ''}`}
                    placeholder="Masukkan username"
                  />
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                </div>
              </div>

            {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'disabled' : ''}`}
                    placeholder="Masukkan email"
                  />
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                </div>
              </div>


            {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'disabled' : ''}`}
                    placeholder="Masukkan password"
                  />
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                </div>
              </div>

            {/* form aksi */}
              <div className="form-actions">
                {isEditing ? (
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-cancel"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="btn btn-save"
                    >
                      <span>Simpan</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="btn btn-edit"
                  >
                    <span>Edit Profile</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>

        
        {/* tambahan */}
          <div className="profile-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Keamanan Akun</h3>
              <div className="security-item">
                <div className="security-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="security-content">
                  <h4>Verifikasi Email</h4>
                  <p>Email Anda telah diverifikasi</p>
                </div>
                <div className="security-status verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="security-item">
                <div className="security-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div className="security-content">
                  <h4>Password Kuat</h4>
                  <p>Gunakan kombinasi huruf, angka, dan simbol</p>
                </div>
                <div className="security-status warning">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <triangle points="7.86 2 16.14 2 22 16 2 16 7.86 2"></triangle>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Aktivitas Terakhir</h3>
              <div className="activity-item">
                <div className="activity-time">2 jam lalu</div>
                <div className="activity-text">Login dari perangkat baru</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">1 hari lalu</div>
                <div className="activity-text">Update profil</div>
              </div>
              <div className="activity-item">
                <div className="activity-time">3 hari lalu</div>
                <div className="activity-text">Ganti password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;