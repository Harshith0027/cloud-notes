import React from 'react';

const About = () => {
  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header" style={{backgroundColor : "#DCE4C9"}}>
          About This Application
        </div>
        <div className="card-body" style={{backgroundColor : "#E6E9AF"}}>
          <h5 className="card-title">Cloud Notes</h5>
          <p className="card-text">
            This application is designed to help users manage their notes efficiently and securely. 
            You can create, edit, and delete notes, ensuring that your important information is always at your fingertips.
          </p>
          <p className="card-text">
            Developed by <strong>Harshith</strong>, this application aims to provide a user-friendly interface 
            along with robust features for note management.
          </p>
          <p className="card-text">
            Thank you for using Cloud Notes! Your time is our pleasure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
