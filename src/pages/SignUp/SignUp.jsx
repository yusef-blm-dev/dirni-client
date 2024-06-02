import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./signup.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Signup successful!");
        updateUser(data);
        navigate("/signin");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="container-signup">
        <div className="heading">Sign Up</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input className="login-button" type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
