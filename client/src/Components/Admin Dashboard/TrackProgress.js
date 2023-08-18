import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TrackProgress.css";
import BackButton from "../BackButton/BackButton";
import AdminTrackerTable from "./Tracker Form/AdminTrackerTable";
import TrackerTable from "../Trainee Dashboard/TrackerTable";

const TrackProgress = () => {
	const [username, setUsername] = useState("");
	const [entry, setEntry] = useState({});
	const [codewars, setCodewars] = useState([]);
	const [cohort, setCohort] = useState([]);
	const [showTracker, setShowTracker] = useState(false);
	const [showAdminTable, setShowAdminTable] = useState(false);

	useEffect(() => {
		if (username) {
			setShowTracker(false);
			setShowAdminTable(false);

			// Fetch data from GitHub API
			fetch(
				`https://api.github.com/search/issues?q=is:pr%20author:${username}%20user:codeyourfuture`
			)
				.then((res) => {
					if (res.status === 200) {
						return res.json();
					} else {
						console.log("wrong username");
					}
				})
				.then((data) => setEntry(data));

			// Fetch Codewars data
			fetch(`https://www.codewars.com/api/v1/users/${username}`)
				.then((res) => res.json())
				.then((data) => {
					setCodewars([data.ranks.overall.rank]);
				});

			// Fetch cohort data
			fetch(
				`https://api.github.com/search/issues?q=is:pr%20author:${username}%20user:codeyourfuture`
			)
				.then((res) => res.json())
				.then((data) =>
					setCohort(
						data.items.filter((item) => {
							return console.log(item.url);
						})
					)
				);
		}
	}, [username]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowTracker(true);
		setShowAdminTable(true);
	};

	return (
		<div>
			<Navbar />
			<BackButton />
			<div className="progress_box">
				{!showTracker && (
					<h1>Hello volunteer, below you can Enter Trainee Github Username</h1>
				)}
				<div className="progress_container">
					{showTracker ? (
						<div className="tracker">
							<h1>
								Hello {username}, below is your current score as of{" "}
								{new Date().toLocaleDateString()}
							</h1>
							<div className="tabcontainer">
								<table className="tab">
									<thead>
										<tr>
											<th>PRs</th>
											<th>CodeWars Rank</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{entry?.total_count || "Loading..."}</td>
											<td>{codewars[0] || "Loading..."}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h2>Your PRs in Cohort Repositories:</h2>
							<div className="cohort-container">
								{cohort.map((item) => (
									<div key={item.id} className="cohort-item">
										{/* Render cohort data here */}
									</div>
								))}
							</div>
							<TrackerTable /> {/* Render the TrackerTable component */}
						</div>
					) : (
						<form className="trainee_form" onSubmit={handleSubmit}>
							<label htmlFor="cohort">Github Name: </label>
							<input
								type="text"
								id="cohort"
								className="cohort_name"
								name="cohort"
								placeholder="Enter Github UserName"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							<button type="submit" className="trainee_submit">
								Submit
							</button>
						</form>
					)}
				</div>
			</div>
			{showAdminTable && <AdminTrackerTable />}{" "}
			{/* Conditionally render AdminTrackerTable */}
			<Footer />
		</div>
	);
};

export default TrackProgress;
