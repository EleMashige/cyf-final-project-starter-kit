
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LoginButtons from "./LoginButtons";
import './Home.css';
 // Adjust the path
 
import backgroundImage from "../../../src/assets/citite2.jpeg";

const Home = () => {

	return (
		<div className='home_container'>
			<img  src={backgroundImage}  alt="Background" className='bgi' />
			<Navbar />
			<div className="container_btn">
				<h2 className='welcome_btn'>
					Welcome to CYF Progress Tracker
				</h2>
			<LoginButtons />
			</div>

			<Footer />
		</div>
	);
};

export default Home;
