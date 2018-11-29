import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import api from "../utils/api";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

function Profile({ info }) {
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && (
          <li>
            <a href={info.blog}>{info.blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

function Player({ label, score, profile }) {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const querystringInCurrentURL = this.props.location.search;
    const { playerOneName, playerTwoName } = queryString.parse(
      querystringInCurrentURL
    );

    api.battle([playerOneName, playerTwoName]).then(
      function(results) {
        if (results === null) {
          return this.setState(() => ({
            error: "Looks like a players is nonexistent",
            loading: false
          }));
        }

        this.setState(() => ({
          loading: false,
          winner: results[0],
          loser: results[1],
          error: null
        }));
      }.bind(this)
    );
  }

  render() {
    const { error, loser, winner, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <p>
          error <Link to="/battle">Reset</Link>
        </p>
      );
    }

    if (winner && loser) {
      return (
        <div className="row">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
      );
    }
  }
}

export default Results;
