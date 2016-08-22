/**
 * Loads the Perseus demo pages
 *
 * This file initializes the Khan globals and mounts Demo pages
 * to demonstrate and develop the Perseus application
 */

require('./perseus-env.js');

window.Khan = {
    Util: KhanUtil,
    error: function() {},
    query: {debug: ""},
    imageBase: "/images/",
};

const Perseus = window.Perseus = require('./editor-perseus.js');
const ReactDOM = window.ReactDOM = React.__internalReactDOM;

const EditorDemo = require('./editor-demo.jsx');
const RendererDemo = require('./renderer-demo.jsx');
const ArticleDemo = require('./article-demo.jsx');

const defaultQuestion = {
    "question": {
        "content": "",
        "images": {},
        "widgets": {},
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const query = Perseus.Util.parseQueryString(window.location.hash.substring(1));
const question = query.content ? JSON.parse(query.content) : defaultQuestion;
const problemNum = Math.floor(Math.random() * 100);

// React router v20XX
const path = window.location.search.substring(1);
const routes = { // The value is spread across a React.createElement call
    'renderer': [RendererDemo, {question, problemNum}],
    'article': [ArticleDemo, {content: question}],
    '': [EditorDemo, {question, problemNum}],
};

Perseus.init({skipMathJax: false, loadExtraWidgets: true}).then(function() {
    ReactDOM.render(
        React.createElement(...(routes[path] || routes[''])),
        document.getElementById("perseus-container")
    );
}).then(function() {
}, function(err) {
    console.error(err); // @Nolint
});
