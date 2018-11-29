const React = require("react");
const Popular = require("./Popular");
const Nav = require("./Nav");
const Home = require("./Home");
const Battle = require("./Battle");
const ReactRouter = require("react-router-dom");
const Results = require("./Results");
const Router = ReactRouter.BrowserRouter;
const Link = ReactRouter.Link;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

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
              <Route render={() => <p>Too bad... 404.</p>} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

module.exports = App;
