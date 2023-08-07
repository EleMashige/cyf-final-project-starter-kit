import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeTracker.css';

const TraineeTracker = (name) => {

 {/*states */}
 
  const [prs, setPrs] = useState(0);
  const [show, setShow] = useState(false);
  

  {/* fetching data from GitHub Api */}

  useEffect(() => {
    fetch(`https://api.github.com/search/issues?q=is:pr%20author:${name}%20user:codeyourfuture`)
      .then((res) => res.json())
      .then((data) =>{
        console.log(data.items)
        setPrs(data)
      })
  }, [name]);
  
    return(
        <div className="traineeD">
            <Navbar />
            <h1>Hello trainee, below is your tracked total score</h1>  

            {/*table to display data in the browser*/}      

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
                    <td>{show ? prs.total_count: 0}</td>
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