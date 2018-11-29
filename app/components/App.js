import React from "react";
import Popular from "./Popular";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

export default App;
