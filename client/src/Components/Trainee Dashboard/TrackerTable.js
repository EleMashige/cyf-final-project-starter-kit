import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TraineeTracker.css';

const TrackerTable = () => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        axios.get("/api/traineeProgress")
            .then(response => {
                setProgressData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>

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
                    {progressData.map((entry, index) => (
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

        </div>
    );
};

export default TrackerTable;