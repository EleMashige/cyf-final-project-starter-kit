import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './TraineeLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const TraineeLogin = () => {
  return (
    <div>
    <Navbar />
    <div className='traine-login-container'>
    <div>
    <img className='signin-logo' src="https://syllabus.codeyourfuture.io/img/logo.png" alt="Your Logo" />
    </div>
    <div className="github-sign-in-button" onClick={() => console.log('Sign in with GitHub clicked!')}>
          <i className="fab fa-github"></i> {/* GitHub icon */}
          <span>Sign in with GitHub</span>
    </div>
    </div>
      <Footer />
    </div>
  );
};

export default TraineeLogin;
