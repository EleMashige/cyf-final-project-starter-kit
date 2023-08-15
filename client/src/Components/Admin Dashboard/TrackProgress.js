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
                    <form className="trainee_form">                
                        <label htmlFor="cohort">Cohort Name: </label>
                        <input type="text" id="cohort" className="cohort_name" name="cohort" placeholder="Enter Cohort Name" required />
                        <input type="submit" className="trainee_submit" value="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrackProgress;