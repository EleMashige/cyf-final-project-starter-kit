import React, { useState } from "react";
import axios from "axios";
import "./TraineeTracker.css";
import BackButton from "../BackButton/BackButton";

const TrackerTable = () => {
    const [cohortFilter, setCohortFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const handleCohortFilter = () => {
        axios.get("/api/traineeProgress")
            .then((response) => {
                const filtered = response.data.filter((entry) =>
                    entry.cohort.toLowerCase() === cohortFilter.toLowerCase()
                );
                setFilteredData(filtered);

                // Display an alert if filtered data is empty
                if (filtered.length === 0) {
                    alert("Cohort does not exist.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div>
            <BackButton />
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Enter Cohort to view requirements"
                    value={cohortFilter}
                    onChange={(e) => setCohortFilter(e.target.value)}
                />
                <button onClick={handleCohortFilter}>Submit</button>
            </div>

            {filteredData.length > 0 && (
                <div className="trainee-tracker-container">
                    <table className="tracker-table">
                        <thead>
                            <tr>
                                <th>Milestones</th>
                                <th>Date</th>
                                <th>Required Pull Requests</th>
                                <th>Codewars</th>
                                <th>Cohort</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.milestones}</td>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                    <td>{entry.required_pull_requests}</td>
                                    <td>{entry.codewars}</td>
                                    <td>{entry.cohort}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrackerTable;

