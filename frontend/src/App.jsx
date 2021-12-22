import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatApp from "./pages/ChatApp";

import "stream-chat-react/dist/css/index.css";
import "./App.css";
import "./assets/styles/styles.scss";

function App() {
  return (
    <Router>
      <section className="app__wrapper ">
        <Switch>
          <Route path="/chatApp" component={ChatApp} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </section>
    </Router>
  );
}

export default App;
