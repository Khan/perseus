/**
 * Loads the Perseus demo pages
 *
 * This file initializes the Khan globals and mounts Demo pages
 * to demonstrate and develop the Perseus application
 */

let DemoComponent = null;
window.icu = {
    getDecimalFormatSymbols: function() {
        return {
            decimal_separator: ".",
            grouping_separator: ",",
            minus: "-",
        };
    },
};
window.KhanUtil = {
    debugLog: function() {},
    localeToFixed: function(num, precision) {
        return num.toFixed(precision);
    },
};
window.Khan = {
    Util: KhanUtil,
    error: function() {},
    query: {debug: ""},
    imageBase: "/images/",
    scratchpad: {
        _updateComponent: function() {
            if (DemoComponent) {
                DemoComponent.forceUpdate();
            }
        },
        enable: function() {
            Khan.scratchpad.enabled = true;
            this._updateComponent();
        },
        disable: function() {
            Khan.scratchpad.enabled = false;
            this._updateComponent();
        },
        enabled: true,
    },
};
window.Exercises = {
    localMode: true,

    useKatex: true,
    khanExercisesUrlBase: "../",

    getCurrentFramework: function() {
        return "khan-exercises";
    },
    PerseusBridge: {
        cleanupProblem: function() {
            return false;
        },
    },
};

const Perseus = window.Perseus = require('./editor-perseus.js');
const ReactDOM = window.ReactDOM = React.__internalReactDOM;

const EditorDemo = require('./editor-demo.jsx');
const RendererDemo = require('./renderer-demo.jsx');


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
    '': [EditorDemo, {question, problemNum}],
};

Perseus.init({skipMathJax: false}).then(function() {
    DemoComponent = ReactDOM.render(
        React.createElement(...(routes[path] || routes[''])),
        document.getElementById("perseus-container")
    );
}).then(function() {
}, function(err) {
    console.error(err); // @Nolint
});
