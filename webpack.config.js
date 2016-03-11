const path = require("path");

const includeEditor = process.env.INCLUDE_EDITORS === "true";
const prod = process.env.NODE_ENV === "production";

const externalVals = {
    // We inject React libs, underscore, and jQuery into the page in
    // development. These are the paths on `window` (i.e. `"_"` is `window._`
    // or `["React", "__internalReactDOM"]` is
    // `window.React.__internalReactDOM`) to find the modules at.
    "react": "React",
    "react-dom": ["React", "__internalReactDOM"],
    "react-addons-create-fragment":
        ["React", "__internalAddons", "createFragment"],
    "react-addons-pure-render-mixin":
        ["React", "__internalAddons", "PureRenderMixin"],

    "underscore": "_",
    "jquery": "jQuery",

    // RCSS and classnames can be required from webapp, but in dev we just want
    // to bundle them.
    "rcss": prod,
    "classnames": prod,

    // react-components should always be bundled, because we can't require it
    // easily from webapp (yet?). We don't really need to list it here, but
    // it's nice to have a list of all library dependencies.
    "react-components/blur-input.jsx": false,
    "react-components/button-group.jsx": false,
    "react-components/drag-target.jsx": false,
    "react-components/info-tip.jsx": false,
    "react-components/multi-button-group.jsx": false,
    "react-components/sortable.jsx": false,
    "react-components/tex.jsx": false,
    "react-components/tooltip.jsx": false,
};

const externals = function(context, request, callback) {
    // Generate appropriate externals requests for the different libraries we
    // depend on.
    // Docs: http://webpack.github.io/docs/configuration.html#externals
    if (externalVals.hasOwnProperty(request)) {
        if (prod) {
            // In production, make react*, underscore, jquery,
            // classnames, and rcss use normal require()s, but bundle
            // react-components.
            callback(null, !!externalVals[request]);
        } else if (externalVals[request] === false) {
            // In dev, bundle rcss, react-components, and classnames
            callback(null, false);
        } else {
            // In dev, pull react*, underscore, and jquery out of globals based
            // on the paths in `externalVals`, and make sure that we don't try
            // to require them using `requirejs`.
            callback(null, { "this": externalVals[request] }, "this");
        }
    } else {
        callback();
    }
};

module.exports = {
    entry: "./src/" + (includeEditor ? "editor-" : "") + "perseus.js",
    output: {
        path: "./build",
        filename: (includeEditor ? "editor-" : "") + "perseus.js",
        library: "Perseus",
        libraryTarget: "umd",
    },
    externals: externals,
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src/"),
                    path.join(__dirname, "node_modules/react-components/"),
                ],
                // https://github.com/webpack/webpack/issues/119
                loader: path.join(__dirname, "node/jsx-loader.js"),
            },
            {
                test: /\.jison$/, loader: "jison-loader",
            },
        ],
    },
};
