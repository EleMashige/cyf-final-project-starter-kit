import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import StarList from "./StarList";
import "./Home.css";


export function Home() {
	const client_id = "a823fe614b9796fe502f";
    const redirect_uri = "http://localhost:3000/api/auth/github";
	const githubLoginUrl = "https://github.com/login/oauth/authorize";
    const state = "secret-key";
    const url = `${githubLoginUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
	return (
		<main role="main">
			<div>
				<Navbar />
				<Link to={url}>GitHub login:</Link>
				<StarList />
			</div>
		</main>
	);
	}

	export default Home;

