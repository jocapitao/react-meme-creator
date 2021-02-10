import React from "react";
import { Route, Switch } from "react-router-dom";
import { Meme } from "./meme/Meme";
import { MemeGenerated } from "./memegenerated/MemeGenerated";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Meme Creator</h1>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
