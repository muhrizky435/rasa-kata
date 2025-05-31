import { useState, useEffect } from "react";
import "../assets/styles/profile.css";
import authService from "../services/authService"; // Assuming you have an authService to get user data
import Swal from "sweetalert2";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    anonymous_username: ""
  });

  const [formData, setFormData] = useState({ ...profileData });
  const user = authService.getCurrentUser();

  useEffect(() => {
    // Dummy data
    const fetchProfile = async () => {

      const userData = {
        name: user.name,
        email: user.email,
        anonymous_username: user.anonymous_username
      };

      setProfileData(userData);
      setFormData(userData);
    };

    fetchProfile();
  }, [user.anonymous_username, user.email, user.name]);

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

  const handleSubmit = async () => {
    console.log("Profile updated:", formData);

    await authService.updateUser(formData, user.id);
    
    Swal.fire({
      icon: 'success',
      title: 'Berhasil memperbarui Profil',
      text: 'Profil Anda telah diperbarui.',
      confirmButtonText: 'OK'
    });
  }

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
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="profile-name">{formData.name}</h2>
              <p className="profile-subtitle">Kelola informasi profil Anda</p>
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
              <div className="form-group">
                <label htmlFor="anonymous_username" className="form-label">
                  Anonymous Username
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="anonymous_username"
                    name="anonymous_username"
                    value={formData.anonymous_username}
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
                      onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
};

export default Profile;