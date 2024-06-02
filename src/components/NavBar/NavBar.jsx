import React, { useState, useRef, useEffect } from "react";
import { NavBars } from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils";
import ImageModal from "../ImageModal/ImageModal";
import "./navbar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, updateUser } = useUser();
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

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

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <nav id="navbar" ref={navRef}>
      <Link to="/" className="home-link">
        DoMe
      </Link>
      <NavBars onClick={() => setIsOpen(!isOpen)} />
      <ul className={isOpen === true ? "open" : "close"}>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link onClick={handleSignout}>SignOut</Link>
            </li>
            <li>
              <img
                src={user.avatar}
                alt={user.username}
                className="profile-pic"
                onClick={handleImageClick}
              />
            </li>
          </>
        ) : (
          <li className="signin-link-nav">
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ul>
      {user && (
        <ImageModal
          show={showImageModal}
          onClose={handleCloseImageModal}
          imageUrl={user.avatar}
        />
      )}
    </nav>
  );
};

export default NavBar;
