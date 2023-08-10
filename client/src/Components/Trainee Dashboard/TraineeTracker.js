import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeTracker.css'; // Import your custom CSS file for styling

const TraineeTracker = () => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        axios.get('/api/traineeProgress')
            .then(response => {
                setProgressData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="trainee-tracker-container">
            <div className="tracker-heading"> <h1>Hello Name, below is your tracker</h1> </div>
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
            <Footer />
        </div>
    );
};

export default TraineeTracker;
