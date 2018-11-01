var React = require("react");
var Popular = require("./Popular");
var Nav = require("./Nav");
var Home = require("./Home");
var Battle = require("./Battle");
var ReactRouter = require("react-router-dom");
var Results = require("./Results");
var Router = ReactRouter.BrowserRouter;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav />
          <div className="container">
            <Switch>
              {" "}
              // Renders 1 Route
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/popular" component={Popular} />
              <Route path="/battle/results" component={Results} />
              <Route
                render={function() {
                  return <p>Too bad... 404.</p>;
                }}
              />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

module.exports = App;
