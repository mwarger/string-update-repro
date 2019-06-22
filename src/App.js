import React from "react";
import "./App.css";
import awsconfig from "./aws-exports";
import Amplify from "aws-amplify";

import { Todos } from "./Todos";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;
