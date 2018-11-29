const React = require("react");
const PropTypes = require("prop-types");

var styles = {
  content: {
    color: "#D00123",
    textSize: "35px",
    textAlign: "center"
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

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

Loading.propTypes = {
  text: PropTypes.string
};

Loading.defaultProps = {
  text: "Loading"
};

module.exports = Loading;
