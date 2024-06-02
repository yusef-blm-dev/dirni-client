import { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils";

const SignIn = () => {
  const [formData, setFormData] = useState({
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
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (res.status === 200) {
      const data = await res.json();
      toast.success("Signin successful!");
      updateUser(data);
      navigate("/");
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Signin failed!");
    }
  };

  return (
    <div className="signin">
      <div className="container-signin">
        <div className="heading">Sign In</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleChange}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <p className="signup-link">
            <Link to="/signup">
              Don't you an Account? <span>Sign up</span>
            </Link>
          </p>
          <input className="login-button" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
