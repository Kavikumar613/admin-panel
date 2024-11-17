import React from "react";

const Home = () => {
  return (
    <div className="home-section">
      <div className="welcome-container">
        <div className="welcome-icon">
          <i className="fas fa-user-shield"></i>
        </div>
        <h1 className="welcome-title">Welcome to the Admin Panel</h1>
        <p className="welcome-message">
          Manage your data efficiently and access all the tools at your
          fingertips.
        </p>
      </div>
    </div>
  );
};

export default Home;
