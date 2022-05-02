import React from "react";
import ReactDOM from "react-dom";

const App = require("./components/app.js");

import "../less/echo.less";
import "../less/main.less";
import "../less/overrides.less";
import "../less/popover.less";

import "mathquill/build/mathquill.css";

ReactDOM.render(<App />, document.getElementById("root"));
