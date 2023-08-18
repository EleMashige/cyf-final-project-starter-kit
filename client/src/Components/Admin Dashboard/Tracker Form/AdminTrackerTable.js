import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./AdminTrackerTable.css";
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
        <div>
             <h2>Insert new milestone</h2>
            <div className="form">

                {/* FORM TO INSERT NEW MILESTONES */}
                <form onSubmit={handleSubmit}>
                    <label>Milestones:</label>
                    <input type="text" name="milestones" value={formData.milestones} onChange={handleChange} /><br />

                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} /><br />

                    <label>Required Pull Requests:</label>
                    <input type="number" name="required_pull_requests" value={formData.required_pull_requests} onChange={handleChange} /><br />

                    <label>Codewars:</label>
                    <input type="number" name="codewars" value={formData.codewars} onChange={handleChange} /><br />

                    <label>Cohort:</label>
                    <input type="text" name="cohort" value={formData.cohort} onChange={handleChange} /><br />

                    <button type="submit">Insert</button>
                </form>
            </div>

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
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <input
                                            type="text"
                                            value={editedMilestones}
                                            onChange={(e) => setEditedMilestones(e.target.value)}
                                        />
                                    ) : (
                                        entry.milestones
                                    )}
                                </td>
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
                                <td>
                                    {editingEntryId === entry.id ? (
                                        <input
                                            type="text"
                                            value={editedCohort}
                                            onChange={(e) => setEditedCohort(e.target.value)}
                                        />
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
        </div>
    );
};

export default AdminTrackerTable;