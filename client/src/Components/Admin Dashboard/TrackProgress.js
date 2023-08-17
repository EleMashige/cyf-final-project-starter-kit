import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './TrackProgress.css';

const TrackProgress = () => {
    return(
        <div>
            <Navbar />
            <div className="progress_box">
                <h1>Hello volunteer, below you can track trainee progress</h1>
                <div className="progress_container">
                    <form action="POST" className="trainee_form">                
                        <label htmlFor="cohort">Cohort Name: 
                          <input type="text" id="cohort" className="cohort_name" name="cohort" placeholder="Enter Cohort Name" required/>
                        </label>
                        <label htmlFor="startDate">Start Date: 
                          <input type="text" id="startDate" className="trainee_name" name='startDate' placeholder="Enter Start Date" required />
                        </label>
                        <label htmlFor="endDate">End Date: 
                          <input type="text" id="endDate" className="trainee_name" name='endDate' placeholder="Enter End Date" required />
                        </label>
                        <input type="submit" className="trainee_submit" value="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrackProgress;