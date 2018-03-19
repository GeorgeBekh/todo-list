'use strict';

import React from "react";
import ReactDOM from "react-dom";
import Main from "./Views/Main.jsx";
import style from "./styles/bootstrap.css"; //TODO: bundle styles into separate file

ReactDOM.render(
  <div>
      <style>{style.toString()}</style>
      <Main/>
  </div>, 
  document.getElementById("root")
);
