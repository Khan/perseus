var React = require('react');
var ReactDOM = require('react-dom');

var render = function(Component, dom, props) {
    ReactDOM.render(<Component {...props} />, dom);
};

module.exports = render;
