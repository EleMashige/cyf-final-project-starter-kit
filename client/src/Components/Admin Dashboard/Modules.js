/* Modules.js */
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import moment from "moment";
import "./Modules.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import BackButton from "../BackButton/BackButton";

const Modules = () => {
  // STATE
  const [moduleName, setModuleName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cohortName, setCohortName] = useState("");
  const [modules, setModules] = useState([]);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editedModuleName, setEditedModuleName] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedCohortName, setEditedCohortName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);

  // SUBMIT FUNCTION
  const insertModule = async (event) => {
    event.preventDefault();
    try {
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

      const response = await axios.post("/api/insert", {
        moduleName: moduleName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        cohort: cohortName,
      });
      console.log("Data inserted successfully!", response.data);
      fetchModules(); // Fetch modules again after insertion
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  //GET FUNCTION
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get("/api/get");
      setModules(response.data);
      setFilteredModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // DELETE FUNCTION
  const handleDeleteClick = async (moduleId) => {
    try {
      await axios.delete(`/api/delete/${moduleId}`);
      fetchModules(); // Fetch modules again after deletion
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  //PUT FUNCTION
  const handleEditClick = (moduleId) => {
    setEditingModuleId(moduleId);
  };

  const handleSaveClick = async (moduleId) => {
    try {
      const updatedModule = {
        moduleName: editedModuleName,
        startDate: moment(editedStartDate).format("YYYY-MM-DD"),
        endDate: moment(editedEndDate).format("YYYY-MM-DD"),
        cohort: editedCohortName,
      };
      await axios.put(`/api/update/${moduleId}`, updatedModule);
      setEditingModuleId(null);
      fetchModules(); // Fetch modules again after updating
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  // Handle filter by cohort
  const handleFilterByCohort = () => {
    const filteredData = modules.filter((module) => {
      return module.cohort.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredModules(filteredData);
  };

  // Reset the module list (clear filter)
  const handleResetFilter = () => {
    setSearchTerm("");
    setFilteredModules(modules);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredModules(modules);
    }
  }, [searchTerm, modules]);

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="container" style={{ textAlign: "left", marginRight: "30px" }}>
        <h3 style={{ marginBottom: "60px" }}>Hello Admin, below you can update modules!</h3>
        <div className='form'>
        <div className='form' style={{ textAlign: "left" }}>
          <form onSubmit={insertModule}>
          <h6>Enter new module:</h6>
            <input type='text' placeholder='Enter Module Name' name='moduleName' onChange={(e) => {
              setModuleName(e.target.value);
            }} />
            <label htmlFor='endDate'>Select Start Date</label>
            <input type='date' placeholder='Enter Start Date' name='startDate' onChange={(e) => {
              setStartDate(e.target.value);
            }} />
            <label htmlFor='endDate'>Select End Date</label>
            <input type='date' placeholder='Select End Date' name='endDate' onChange={(e) => {
              setEndDate(e.target.value);
            }} />
            <input type='text' placeholder='Enter Cohort Name' name='cohortName' onChange={(e) => {
              setCohortName(e.target.value);
            }} />
            <button type='submit'>Submit</button>
          </form>
          </div>
        </div>

        {/* TABLE STARTS HERE */}
        <div className="table-container">
          <div className="filter-container">

            {/* Search input for filtering by cohort */}
            <input
              type="text"
              placeholder="Filter by Cohort"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter and Reset buttons */}
            <div className="button-container">
              <button onClick={handleFilterByCohort}>Filter</button>
              <button onClick={handleResetFilter}>Reset</button>
            </div>
          </div>

          {/* Modules list table */}
          <table className="table">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Cohort</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((module) => (
                <tr key={module.id}>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="text"
                        value={editedModuleName}
                        onChange={(e) => setEditedModuleName(e.target.value)}
                      />
                    ) : (
                      module.modulename
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="date"
                        value={editedStartDate}
                        onChange={(e) => setEditedStartDate(e.target.value)}
                      />
                    ) : (
                      moment(module.startdate).format("YYYY-MM-DD")
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="date"
                        value={editedEndDate}
                        onChange={(e) => setEditedEndDate(e.target.value)}
                      />
                    ) : (
                      moment(module.enddate).format("YYYY-MM-DD")
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <input
                        type="text"
                        value={editedCohortName}
                        onChange={(e) => setEditedCohortName(e.target.value)}
                      />
                    ) : (
                      module.cohort
                    )}
                  </td>
                  <td>
                    {module.id === editingModuleId ? (
                      <div>
                        <button onClick={() => handleSaveClick(module.id)}>Save</button>
                        <button onClick={() => setEditingModuleId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(module.id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(module.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Modules;

