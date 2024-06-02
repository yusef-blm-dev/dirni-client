import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { API_BASE_URL } from "../../utils.js";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.jsx";
import { AvatarUploader } from "../../components/AvatarUploader/AvatarUploader.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

import "./profile.css";

const Profile = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    avatar: user.avatar,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // State for showing image modal
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (files.length > 0) {
        const newUrl = await handleFileUpload(files);
        if (newUrl) {
          formData.avatar = newUrl;
        }
      }

      const response = await fetch(`${API_BASE_URL}/users/update/${user._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        updateUser(data);
        toast.success("Profile updated successfully!");
        navigate("/profile");
        setFormData({ ...formData, password: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
      resetField("password");
    }
  };

  const resetField = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/delete/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Account deleted successfully");
        updateUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting account");
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signout`, {
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      updateUser(null);
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    try {
      const res = await fetch(`${API_BASE_URL}/image/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const response = await res.json();
      return response.imageUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDelete();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="container-general">
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-img">
          <AvatarUploader
            imageUrl={formData.avatar}
            onFileChange={(url) => setFormData({ ...formData, avatar: url })}
            setFiles={setFiles}
          />
        </div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="button-container">
            {isUpdating ? (
              <button type="button" className="update-button" disabled>
                <div className="spinner-container">
                  <Spinner />
                </div>
              </button>
            ) : (
              <input type="submit" value="Update" className="update-button" />
            )}
          </div>
        </form>
        <div className="links-profile">
          <Link onClick={handleDeleteClick} className="delete">
            Delete Account
          </Link>
          <Link onClick={handleSignout} className="signout">
            SignOut
          </Link>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default Profile;
