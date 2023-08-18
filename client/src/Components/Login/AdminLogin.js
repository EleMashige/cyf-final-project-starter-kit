import React, { useState } from "react";
import "./AdminLogin.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    // Reset the form after submission
    setEmail("");
    setPassword("");
  };

  return (
		<div>
			<Navbar />
			<BackButton />
			<div className="signin-form-container">
				<form className="signin-form" onSubmit={handleSubmit}>

					<Link to="/admin-dashboard">
						<button type="submit" className="signin-button">
							Sign In
						</button>
					</Link>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export default AdminLogin;
