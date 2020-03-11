import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PageOne = () => {
  return (
    <div>
      PageOne
      <Link to="/pagetwo">
        <button>
          show PageTwo when you click this!!
        </button>
      </Link>
    </div>
  );  
};

const PageTwo = () => {
  return (
    <div>
      PageTwo
      <Link to="/">
        <button>
          show PageOne when you click this!!
        </button>
      </Link>
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <Router>
        <div>
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo"  component={PageTwo} />
        </div>
      </Router>
    </div>
  );
};

export default MainPage;