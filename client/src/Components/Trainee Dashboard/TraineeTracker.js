import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeTracker.css'
{/*import { resetWarningCache } from 'prop-types';*/}

const TraineeTracker = () => {

  const [prs, setPrs] = useState([]);
  const [codeWarsRank, setCodeWarsRank] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/search/issues?q=is:pr%20author:Mathias02%20user:codeyourfuture")
      .then((res) => res.json())
      .then((data) => {
        setPrs(data)})
  }, []);
  
    return(
        <div className="traineeD">
            <Navbar />
            <h1>Hello trainee, below is your tracked total score</h1>
            <div className='tablescore'>
              <table>
                <thead>
                  <tr>
                    <th>PRs</th>
                    <th>CodeWars</th>
                    <th>Codility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{prs.total_count}</td>
                    <td>56</td>
                    <td>52</td>
                  </tr>
                </tbody>
              </table>
            </div>
    
            <Footer />
        </div>
    )
}

export default TraineeTracker;