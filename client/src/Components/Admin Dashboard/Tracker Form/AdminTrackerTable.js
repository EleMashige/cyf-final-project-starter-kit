
import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import moment from "moment";
import "./AdminTrackerTable.css";
=======
import moment from 'moment';
import "./AdminTrackerTable.css";

>>>>>>> fba18fa13551428892c912119faf3b7f2abb7317
const AdminTrackerTable = () => {
    const [progressData, setProgressData] = useState([]);
    const [formData, setFormData] = useState({
        milestones: "",
        date: "",
        required_pull_requests: "",
        codewars: "",
        cohort: "",
    });
    const [editingEntryId, setEditingEntryId] = useState(null);
    const [editedMilestones, setEditedMilestones] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedRequiredPullRequests, setEditedRequiredPullRequests] = useState("");
    const [editedCodewars, setEditedCodewars] = useState("");
    const [editedCohort, setEditedCohort] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Define the available cohorts and milestones
    const cohorts = ["LDN-9", "LDN-10", "LDN-11", "LDN-12", "ZA-2", "ZA-3"];
    const milestones = ["Intro To Coding", "Fundamentals", "Induction", "Git and Github", "HTML-CSS", "JavaScript Core 1", "JavaScript Core 2", "JavaScript Core 3", "React", "Node", "SQL", "Final Projects"];

    useEffect(() => {
        fetchProgressData();
    }, []);

    // GET FUNCTION
    const fetchProgressData = async () => {
        try {
            const response = await axios.get("/api/traineeProgress");
            setProgressData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // POST FUNCTION
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/traineeProgress", formData);
            console.log("Inserted row:", response.data);
            fetchProgressData();
        } catch (error) {
            console.error("Error inserting trainee progress:", error);
        }
    };

    const handleEditClick = (id) => {
        setEditingEntryId(id);

        const entryToEdit = progressData.find((entry) => entry.id === id);

        setEditedMilestones(entryToEdit.milestones);
        setEditedDate(entryToEdit.date);
        setEditedRequiredPullRequests(entryToEdit.required_pull_requests);
        setEditedCodewars(entryToEdit.codewars);
        setEditedCohort(entryToEdit.cohort);
    };

    const handleSaveClick = async (id) => {
        try {
            const updatedEntry = {
                milestones: editedMilestones,
                date: moment(editedDate).format("YYYY-MM-DD"),
                required_pull_requests: editedRequiredPullRequests,
                codewars: editedCodewars,
                cohort: editedCohort,
            };
            await axios.put(`/api/traineeProgress/${id}`, updatedEntry);
            setEditingEntryId(null);
            fetchProgressData();
        } catch (error) {
            console.error("Error updating trainee progress:", error);
        }
    };

    // DELETE FUNCTION
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/traineeProgress/${id}`);
            console.log("Deleted row:", id);
            fetchProgressData();
        } catch (error) {
            console.error("Error deleting trainee progress:", error);
        }
    };

    // FILTER
    const handleFilterByCohort = () => {
        const filteredData = progressData.filter((entry) => {
            return entry.cohort.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setProgressData(filteredData);
    };

    const handleResetFilter = () => {
        setSearchTerm("");
        fetchProgressData();
    };

    useEffect(() => {
        if (searchTerm === "") {
            fetchProgressData();
        } else {
            handleFilterByCohort();
        }
    }, [searchTerm]);

    return (
<<<<<<< HEAD
        <div>
             <h2>Insert new milestone</h2>
            <div className="form">

                {/* FORM TO INSERT NEW MILESTONES */}
                <form onSubmit={handleSubmit}>
                    <label>Milestones:</label>
                    <input type="text" name="milestones" value={formData.milestones} onChange={handleChange} /><br />
=======
>>>>>>> fba18fa13551428892c912119faf3b7f2abb7317

        <div className="admin-container">

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by Cohort"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleFilterByCohort}>Filter</button>
                <button onClick={handleResetFilter}>Reset Filter</button>
            </div>

            <div>
            <h5>To edit milestones, click on table</h5>
            </div>

            <div className="trainee-tracker-container">
                <table className="tracker-table">
                    <thead>
                        <tr>
                            <th>Milestones</th>
                            <th>Date</th>
                            <th>Required Pull Requests</th>
                            <th>Codewars</th>
                            <th>Cohort</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* //TABLE */}
                    <tbody>
                        {progressData.map((entry) => (
                            <tr key={entry.id}>
                            {/* MILESTONES COLUMN */}
                                <td>
                                {editingEntryId === entry.id ? (
                                        <select
                                            value={editedMilestones}
                                            onChange={(e) => setEditedMilestones(e.target.value)}
                                        >
                                            <option value="">Select a milestone</option>
                                            {milestones.map((milestone) => (
                                                <option key={milestone} value={milestone}>
                                                    {milestone}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        entry.milestones
                                    )}
                                </td>

                                {/* DATE COLUMN */}
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <input
                                            type="date"
                                            value={editedDate}
                                            onChange={(e) => setEditedDate(e.target.value)}
                                        />
                                    ) : (
                                        new Date(entry.date).toLocaleDateString()
                                    )}
                                </td>

                                {/* PR COLUMN */}
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <input
                                            type="number"
                                            value={editedRequiredPullRequests}
                                            onChange={(e) => setEditedRequiredPullRequests(e.target.value)}
                                        />
                                    ) : (
                                        entry.required_pull_requests
                                    )}
                                </td>

                                {/* CODEWARS COLUMN */}
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <input
                                            type="number"
                                            value={editedCodewars}
                                            onChange={(e) => setEditedCodewars(e.target.value)}
                                        />
                                    ) : (
                                        entry.codewars
                                    )}
                                </td>

                                {/* COHORT COLUMN */}
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <select
                                            value={editedCohort}
                                            onChange={(e) => setEditedCohort(e.target.value)}
                                        >
                                            <option value="">Select a cohort</option>
                                            {cohorts.map((cohort) => (
                                                <option key={cohort} value={cohort}>
                                                    {cohort}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        entry.cohort
                                    )}
                                </td>
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <div>
                                            <button onClick={() => handleSaveClick(entry.id)}>Save</button>
                                            <button onClick={() => setEditingEntryId(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => handleEditClick(entry.id)}>Edit</button>
                                            <button onClick={() => handleDelete(entry.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ENTER NEW MILESTONE FORM */}

            <div>
                {/* FORM TO INSERT NEW MILESTONES */}
                <form onSubmit={handleSubmit} className="milestone-form">
                    <label>Insert New Milestone:</label>
                    <select name="milestones" value={formData.milestones} onChange={handleChange}>
                        <option value="">Select a milestone</option>
                        {milestones.map((milestone) => (
                            <option key={milestone} value={milestone}>{milestone}</option>
                        ))}
                    </select><br />

                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} /><br />

                    <label>Required Pull Requests:</label>
                    <input type="number" name="required_pull_requests" value={formData.required_pull_requests} onChange={handleChange} /><br />

                    <label>Codewars:</label>
                    <input type="number" name="codewars" value={formData.codewars} onChange={handleChange} /><br />

                    <label>Cohort:</label>
                    <select name="cohort" value={formData.cohort} onChange={handleChange}>
                        <option value="">Select a cohort</option>
                        {cohorts.map((cohort) => (
                            <option key={cohort} value={cohort}>{cohort}</option>
                        ))}

                    </select><br />

                    <button type="submit">Insert</button>
                </form>
            </div>
        </div>
    );
};

export default AdminTrackerTable;