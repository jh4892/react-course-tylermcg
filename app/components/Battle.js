import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      username: value
    }));
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }
  render() {
    const { username } = this.state;
    const { label } = this.props;

    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={username}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PlayerInput.defaultProps = {
  label: "Username"
};

function ResetButton(props) {
  return (
    <button
      className="reset"
      onClick={function() {
        props.handleReset(props.id, props.username);
      }}
    >
      Reset
    </button>
  );
}

ResetButton.propTypes = {
  handleReset: PropTypes.func.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super();

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => ({
      [id + "Name"]: username,
      [id + "Image"]: `https://github.com/${username}.png?size=200`
    }));
  }

  handleReset(id) {
    this.setState(() => ({
      [id + "Name"]: "",
      [id + "Image"]: null
    }));
  }

  render() {
    const { match } = this.props;
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;

    return (
      <div>
        <div className="row">
          {!playerOneName ? (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          ) : (
            <div>
              <PlayerPreview avatar={playerOneImage} username={playerOneName}>
                <ResetButton
                  handleReset={() => this.handleReset("playerOne")}
                />
              </PlayerPreview>
            </div>
          )}
          {!playerTwoName ? (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          ) : (
            <div>
              <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
                <ResetButton
                  handleReset={() => this.handleReset("playerTwo")}
                />
              </PlayerPreview>
            </div>
          )}
        </div>
        {playerOneName && playerTwoName ? (
          <Link
            className="button"
            to={{
              pathname: match.url + "/results", // (match.url is de huidige url met /battle, die wordt overal meegegeven)
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Battle;
