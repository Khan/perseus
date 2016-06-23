// Modified version of https://github.com/petehunt/jsx-loader to use jsx-i18n

const loaderUtils = require("loader-utils");
const babel = require("babel-core");
const _ = require("../lib/underscore.js");
const UglifyJS = require("uglify-js");
const path = require("path");
const fs = require("fs");

const includeEditor = process.env.INCLUDE_EDITORS === "true";
const babelrc = JSON.parse(fs.readFileSync(
    path.join(__dirname, "..", ".babelrc")
));

module.exports = function(source) {
    this.cacheable && this.cacheable();

    const sourceFilename = loaderUtils.getRemainingRequest(this);
    const current = loaderUtils.getCurrentRequest(this);

    const query = loaderUtils.parseQuery(this.query);
    // For some reason, Babel doesn't use .babelrc here; maybe because we're
    // in a subfolder.
    const options = _.extend({}, babelrc, {
        sourceMaps: query.sourceMap,
    });
    const transform = babel.transform(source, options);

    // NOTE(charlie): If we remove these additional transforms, we can use the
    // standard babel-loader.
    if (includeEditor) {
        // TODO(emily): Do this with a real AST transform.
        transform.code = transform.code.replace(/__EDITOR__/g, "true");
    } else {
        // When removing editors, we use uglifyjs to strip out dead code from
        // __EDITOR__ being false.
        // TODO(emily): Figure out how to do dead code elimination that doesn't
        // mess with the code as much as this does.
        transform.code = UglifyJS.minify(transform.code, {
            // transform.code is a string, not a filename
            fromString: true,

            // Keep comments in the output, and beautify it to undo the
            // minification from the compress step.
            output: {
                comments: true,
                beautify: true,
            },
            // Don't mangle (rename variables)
            mangle: false,
            // Perform some compression:
            compress: {
                // These 3 options are needed to actually remove the dead code
                // from setting __EDITOR__ to false.
                dead_code: true,
                conditionals: true,
                evaluate: true,

                // Globally set __EDITOR__ to false.
                global_defs: {
                    __EDITOR__: false,
                },

                // Disable all other compression options.
                sequences: false,
                properties: false,
                drop_debugger: false,
                unsafe: false,
                comparisons: false,
                booleans: false,
                loops: false,
                unused: false,
                hoist_funs: false,
                hoist_vars: false,
                if_return: false,
                join_vars: false,
                cascade: false,
                side_effects: false,
                warnings: false,
            },
        }).code;
    }

    if (transform.map) {
        transform.sourceMap.sources = [sourceFilename];
        transform.sourceMap.file = current;
        transform.sourceMap.sourcesContent = [source];
    }

    this.callback(null, transform.code, transform.map);
};
