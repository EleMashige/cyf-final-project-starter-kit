import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


export function Home() {
	const client_id = "a823fe614b9796fe502f";
    const redirect_uri = "http://localhost:3100/api/auth/github";
    const githubLoginUrl = "https://github.com/login/oauth/authorize";
    const state = "secret-key";
    const url = `${githubLoginUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
	return (
		<main role="main">
			<div>
				{/* <img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
	           </h1> */}
			<Link to={url}>GitHub login:</Link>
			</div>
		</main>
	);
}
export default Home;