import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Github battle: Battle your friends and stuff</h1>

        <Link className="button" to="/battle">
          Battle it out!
        </Link>
      </div>
    );
  }
}

export default Home;
