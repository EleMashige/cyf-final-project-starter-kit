
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LoginButtons from "./LoginButtons";

import backgroundImage from "../../../src/assets/citite2.jpeg"; // Adjust the path

const Home = () => {

	return (
		<div
			style={{
				position: "relative",
				width: "100vw", // Use viewport width to cover the entire page
				height: "100vh", // Use viewport height to cover the entire page
				overflow: "hidden", // Prevent content from overflowing
			}}
		>
			<img
				src={backgroundImage}
				alt="Background"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					zIndex: -1,
				}}
			/>
			<Navbar />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}
			>
				<button
					style={{
						width: "51rem",
						padding: "10px",
						fontSize: "40px",
						color: "red", // Add the red color
						zIndex: 1,
						marginBottom: "20px", // Adjust spacing
						backgroundColor: "rgba(255, 255, 255, 0.7)", // Add some transparency to the button
					}}
				>
					Welcome to CYF Trainees Milestones Tracker
				</button>
				<LoginButtons />
			</div>

			<Footer />
		</div>
	);
};

export default Home;
