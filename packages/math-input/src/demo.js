const React = require("react");
const ReactDOM = require("react-dom");

const App = require("./components/app");

import "../less/echo.less";
import "../less/main.less";
import "../less/overrides.less";
import "../less/popover.less";

import "mathquill/build/mathquill.css";

ReactDOM.render(<App />, document.getElementById("root"));
