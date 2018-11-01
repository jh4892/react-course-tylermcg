var React = require("react");
var PropTypes = require("prop-types");

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
    var stopper = this.props.text + "...";

    this.interval = setInterval(
      function() {
        if (this.state.text === stopper) {
          this.setState(function() {
            return {
              text: this.props.text
            };
          });
        } else {
          this.setState(function(prevState) {
            return {
              text: prevState.text + "."
            };
          });
        }
      }.bind(this),
      300
    );

    setTimeout(
      function() {
        clearInterval(this.interval);
      }.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
