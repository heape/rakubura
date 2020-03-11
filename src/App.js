import React, { Component } from "react";
import "./App.css";
import NavBar from "./Todos/pages/navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="temp-icon"></div>
        <NavBar />
      </React.Fragment>
    );
  }
}

export default App;
