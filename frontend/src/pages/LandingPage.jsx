import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="app__wrapper grid-center bg">
      <div className="landing-page-wrapper flex column">
        <h1>Welcome to Chaty</h1>
        <Link to="/chatApp">
          <div className="main-btn">
            <button> Start Now</button>
          </div>
        </Link>
      </div>

      <footer>
        <p>made by nofar yunger 2021</p>
      </footer>
    </main>
  );
}

export default LandingPage;
