const path = require("path");
const webpack = require("webpack");

const includeEditor = process.env.INCLUDE_EDITORS === "true";
const forFrame = process.env.PERSEUS_FRAME === "true";
const slim = !process.env.NOT_SLIM && !includeEditor && !forFrame;
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
    "react-addons-css-transition-group":
        ["React", "__internalAddons", "CSSTransitionGroup"],

    "underscore": "_",
    "jquery": "jQuery",

    // Aphrodite and classnames can be required from webapp, but in dev we just
    // want to bundle them.
    "aphrodite": prod,
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
            // classnames, and aphrodite use normal require()s, but bundle
            // react-components.
            callback(null, !!externalVals[request]);
        } else if (externalVals[request] === false) {
            // In dev, bundle aphrodite, react-components, and classnames
            callback(null, false);
        } else {
            // In dev, pull react*, underscore, and jquery out of globals based
            // on the paths in `externalVals`, and make sure that we don't try
            // to require them using `requirejs`.
            callback(null, {"this": externalVals[request]}, "this");
        }
    } else {
        callback();
    }
};

function getEntryPoints() {
    if (includeEditor) {
        return {"editor-perseus": "./src/editor-perseus.js"};
    } else if (forFrame) {
        return {"frame-perseus": "./src/perseus-frame.js"};
    } else {
        const name = slim ? "perseus-slim" : "perseus";
        return {
            [name]: slim ? "./src/perseus.js" : "./src/perseus-full.js",
        };
    }
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
];

if (!slim) {
    // This plugin prevents the creation of extra files, so all chunks are
    // just in one file (same as before perseus slimming).
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
    }));
}

module.exports = {
    entry: getEntryPoints(),
    output: {
        path: "./build",
        // NOTE(jared): If you pass `loadExtraWidgets: true` to Perseus.init &
        // you haven't preloaded the `perseus-extras.js` file, webpack will
        // try to load it, but it doesn't have a hope of knowing where to get
        // it from. So it will try to load it at this very unusual path that
        // will hopefully give developers a hint at what's going on.
        publicPath: "if you see this then you failed to preload " +
            "the extra-widgets chunk from perseus. webpack is trying " +
            "to load it for you",
        filename: "[name].js",
        library: "Perseus",
        libraryTarget: "umd",
        namedChunkFilename: "perseus-extras.js",
    },
    externals: externals,
    plugins: plugins,
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
                    // TODO(kevinb) figure out a better way to package this
                    path.join(__dirname, "math-input/"),
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
