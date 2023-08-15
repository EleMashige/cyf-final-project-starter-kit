import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./TraineeTracker.css";
import TrackerTable from "./TrackerTable";

const TraineeTracker = ({ user }) => {

const [entry, setEntry] = useState([]);
const [codewars, setCodewars] = useState([]);
const [cohort, setCohort] = useState([]);

    useEffect(() =>{
        fetch(`https://api.github.com/search/issues?q=is:pr%20author:${user}%20user:codeyourfuture`)
        .then((res) => {
            if(res.status == 200){
               return res.json();
            }else{
                console.log("wrong username");
            }
            })
        .then((data) => setEntry(data));
    },[user]);

    useEffect(() =>{
        fetch(`https://www.codewars.com/api/v1/users/${user}`)
        .then((res) => res.json())
        .then((data) => setCodewars(data));
    },[user]);

    useEffect(() => {
        fetch(`https://api.github.com/search/issues?q=is:pr%20author:${user}%20user:codeyourfuture`)
            .then((res) => res.json())
            .then((data) => setCohort(data.items.filter((item) => {
                return console.log(item.url);
            })));
    }, [user]);

    return(
        <div className='tracker'>
        <Navbar />
            <h1>Hello {user}, below is your tracked score</h1>
            <div className='tabcontainer'>
                <table className='tab'>
                    <thead>
                        <tr>
                            <th>PRs</th>
                            <th>CodeWars</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{entry?.total_count || "Loading..."}</td>
                            <td>{codewars?.honor || "Loading..."}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TrackerTable />
        <Footer />
        </div>
    );
};

export default TraineeTracker;
