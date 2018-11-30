import React from "react";
import PropTypes from "prop-types";

var styles = {
  content: {
    color: "#D00123",
    textSize: "35px",
    textAlign: "center"
  }
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {
    text: "Loading"
  };

  state = {
    text: this.props.text
  };

  componentDidMount() {
    const { text, speed } = this.props;

    const stopper = text + "...";

    this.interval = window.setInterval(() => {
      // console.log("...");

      if (this.state.text === stopper) {
        this.setState(() => ({
          text
        }));
      } else {
        this.setState(prevstate => ({
          text: prevstate.text + "."
        }));
      }
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

export default Loading;
