import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
export function Home() {
	const [message, setMessage] = useState("Loading...");
	useEffect (() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const client_id = "a823fe614b9796fe502f";
    const redirect_uri = "http://localhost:3100/api/auth/github";
	const githubLoginUrl = "https://github.com/login/oauth/authorize";
    const state = "secret-key";
    const url = `${githubLoginUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;

	return (
		<main role="main">
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
				</h1>

				<br />
				<Link to={url}>GitHub login:</Link>
			</div>
		</main>
	);
}
export default Home;