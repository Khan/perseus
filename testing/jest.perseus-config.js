/* eslint-disable no-console */
/**
 * WARNING: This file is intentionally not named jest.config.js.  This is
 * so that js_test_client.js doesn't get confused and try to run tests using
 * this config file instead services/static/jest.config.js.  This file can
 * be renamed once perseus is in its own repo.
 */
const ancesdir = require("ancesdir");
const glob = require("fast-glob");

const staticRootDir = ancesdir(__dirname, ".static_root");

const {PERSEUS_COV} = process.env;

if (!["all", "renderers", "widgets90", "widgets99"].includes(PERSEUS_COV)) {
    console.warn(
        "PERSEUS_COV environment variable must be set to one of 'all', 'renderers', 'widgets90', or 'widgets99'.",
    );
    process.exit(1);
}

const renderers = [
    // Used by multiple renders
    "<rootDir>/javascript/perseus-all-package/renderer.jsx",
    "<rootDir>/javascript/perseus-all-package/hint-renderer.jsx",
    "<rootDir>/javascript/perseus-all-package/hints-renderer.jsx",
    "<rootDir>/javascript/perseus-all-package/mixins/provide-keypad.jsx",

    // renderer.jsx
    "<rootDir>/javascript/perseus-all-package/perseus-markdown.jsx",
    "<rootDir>/javascript/perseus-all-package/question-paragraph.jsx",
    "<rootDir>/javascript/perseus-all-package/widget-container.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets.js",
    "<rootDir>/javascript/perseus-all-package/util.js",
    "<rootDir>/javascript/perseus-all-package/asset-context.js",
    "<rootDir>/javascript/perseus-all-package/components/zoomable.jsx",
    "<rootDir>/javascript/perseus-all-package/components/zoomable-tex.jsx",
    "<rootDir>/javascript/perseus-all-package/components/svg-image.jsx",
    "<rootDir>/javascript/perseus-all-package/components/tex.jsx",
    "<rootDir>/javascript/perseus-all-package/util/katex-preprocess.js",

    // item-renderer.jsx
    "<rootDir>/javascript/perseus-all-package/item-renderer.jsx",

    // server-item-renderer.jsx
    "<rootDir>/javascript/perseus-all-package/server-item-renderer.jsx",

    // multi-renderer.jsx
    "<rootDir>/javascript/perseus-all-package/multi-items/multi-renderer.jsx",
    "<rootDir>/javascript/perseus-all-package/multi-items/items.js",
    "<rootDir>/javascript/perseus-all-package/multi-items/shapes.js",

    // article-renderer.jsx
    "<rootDir>/javascript/perseus-all-package/article-renderer.jsx",
];

const widgets90 = [
    // Used by multiple widgets
    "<rootDir>/javascript/perseus-all-package/components/graphie-classes.jsx",
    "<rootDir>/javascript/perseus-all-package/components/graphie-movables.jsx",
    "<rootDir>/javascript/perseus-all-package/components/graphie.jsx",
    "<rootDir>/javascript/perseus-all-package/components/input-with-examples.jsx",
    "<rootDir>/javascript/perseus-all-package/components/possible-answers.jsx",
    "<rootDir>/javascript/perseus-all-package/components/simple-keypad-input.jsx",
    "<rootDir>/javascript/perseus-all-package/mixins/changeable.jsx",
    "<rootDir>/javascript/perseus-all-package/renderer.jsx",
    "<rootDir>/javascript/perseus-all-package/tex-wrangler.js",
    "<rootDir>/javascript/perseus-all-package/util/answer-types.js",
    "<rootDir>/javascript/perseus-all-package/util/math.js",
    "<rootDir>/javascript/perseus-all-package/util.js",

    // radio
    "<rootDir>/javascript/perseus-all-package/widgets/radio.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets/radio/*.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets/radio.jsx",

    // image
    "<rootDir>/javascript/perseus-all-package/widgets/image.jsx",
    "<rootDir>/javascript/perseus-all-package/components/svg-image.jsx",

    // numeric-input
    "<rootDir>/javascript/perseus-all-package/widgets/numeric-input.jsx",

    // definition
    "<rootDir>/javascript/perseus-all-package/widgets/definition.jsx",

    // explanation
    "<rootDir>/javascript/perseus-all-package/widgets/explanation.jsx",

    // input-number
    "<rootDir>/javascript/perseus-all-package/widgets/input-number.jsx",

    // expression
    "<rootDir>/javascript/perseus-all-package/widgets/expression.jsx",
    "<rootDir>/javascript/perseus-all-package/components/math-input.jsx",

    // group
    "<rootDir>/javascript/perseus-all-package/widgets/group.jsx",

    // dropdown
    "<rootDir>/javascript/perseus-all-package/widgets/group.jsx",
];

const widgets99 = [
    ...widgets90,

    // Used by multiple widgets
    "<rootDir>/javascript/perseus-all-package/components/graph.jsx",
    "<rootDir>/javascript/perseus-all-package/components/number-input.jsx",
    "<rootDir>/javascript/perseus-all-package/components/inline-icon.jsx",
    "<rootDir>/javascript/perseus-all-package/components/math-output.jsx",
    "<rootDir>/javascript/perseus-all-package/components/sortable.jsx",
    "<rootDir>/javascript/perseus-all-package/icon-paths.js",
    "<rootDir>/javascript/perseus-all-package/interactive2/*.js",
    "<rootDir>/javascript/perseus-all-package/interactive2/*.jsx",
    "<rootDir>/javascript/perseus-all-package/interactive2.js",
    "<rootDir>/javascript/perseus-all-package/util/interactive.js",
    "<rootDir>/javascript/perseus-all-package/util/tex.js",

    // graded-group
    "<rootDir>/javascript/perseus-all-package/widgets/graded-group.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets/graded-group-answer-bar.jsx",

    // interactive-graph
    "<rootDir>/javascript/perseus-all-package/widgets/interactive-graph.jsx",
    "<rootDir>/javascript/perseus-all-package/components/info-tip/info-tip.jsx",
    "<rootDir>/javascript/perseus-all-package/components/info-tip.jsx",

    // categorizer
    "<rootDir>/javascript/perseus-all-package/widgets/categorizer.jsx",

    // transformer
    "<rootDir>/javascript/perseus-all-package/widgets/transformer.jsx",
    "<rootDir>/javascript/perseus-all-package/components/tex.jsx",

    // passage-ref
    "<rootDir>/javascript/perseus-all-package/widgets/passage-ref.jsx",
    "<rootDir>/javascript/perseus-all-package/mixins/widget-jsonify-deprecated.jsx",
    "<rootDir>/javascript/perseus-all-package/perseus-markdown.jsx",

    // video
    "<rootDir>/javascript/perseus-all-package/widgets/video.jsx",
    "<rootDir>/javascript/perseus-all-package/components/fixed-to-responsive.jsx",

    // matcher
    "<rootDir>/javascript/perseus-all-package/widgets/matcher.jsx",

    // passage
    "<rootDir>/javascript/perseus-all-package/widgets/passage.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets/passage/passage-markdown.jsx",

    // sorter
    "<rootDir>/javascript/perseus-all-package/widgets/sorter.jsx",

    // matrix
    "<rootDir>/javascript/perseus-all-package/widgets/matrix.jsx",
    "<rootDir>/javascript/perseus-all-package/components/text-input.jsx",

    // cs-program
    "<rootDir>/javascript/perseus-all-package/widgets/cs-program.jsx",

    // graded-group-set
    "<rootDir>/javascript/perseus-all-package/widgets/graded-group-set.jsx",

    // grapher
    "<rootDir>/javascript/perseus-all-package/widgets/grapher.jsx",
    "<rootDir>/javascript/perseus-all-package/widgets/grapher/util.jsx",

    // orderer
    "<rootDir>/javascript/perseus-all-package/widgets/orderer.jsx",

    // interaction
    "<rootDir>/javascript/perseus-all-package/widgets/interaction.jsx",

    // number-line
    "<rootDir>/javascript/perseus-all-package/widgets/number-line.jsx",

    // iframe
    "<rootDir>/javascript/perseus-all-package/widgets/iframe.jsx",
];

const all = [...renderers, ...widgets90, ...widgets99];

const collectCoverageFrom = {
    all,
    renderers,
    widgets90,
    widgets99,
}[PERSEUS_COV];

const patternsWithoutFiles = [];

for (const pattern of collectCoverageFrom) {
    const files = glob.sync(pattern.replace("<rootDir>", staticRootDir));
    if (files.length === 0) {
        patternsWithoutFiles.push(pattern);
    }
}

if (patternsWithoutFiles.length > 0) {
    console.warn(
        `The following patterns don't match any files:\n${patternsWithoutFiles.join(
            "\n",
        )}`,
    );
    process.exit(1);
}

module.exports = {
    rootDir: staticRootDir,
    testMatch: [
        "<rootDir>/javascript/perseus-all-package/**/__tests__/*_test.js",
        "<rootDir>/javascript/perseus-all-package/**/__tests__/*_test.jsx",
        "<rootDir>/javascript/perseus-all-package/**/__tests__/*_test.js",
        "<rootDir>/javascript/perseus-all-package/**/__tests__/*_test.jsx",
    ],
    coverageDirectory: `<rootDir>/javascript/perseus-testing/coverage/jest/${PERSEUS_COV}`,
    collectCoverageFrom: collectCoverageFrom,
    moduleNameMapper: {
        "^perseus$": "<rootDir>/javascript/perseus/perseus.js",
        "^perseus-editor$": "<rootDir>/javascript/perseus/editor-perseus.js",
        // Load a .js file with no exports whenever a .css or .less file is requested.
        "\\.(css|less)$": "<rootDir>/dev/tools/jest-runner/style-mock.js",
    },

    // Automatically restore mock state between every test. Equivalent to calling
    // jest.restoreAllMocks() between each test. This will lead to any mocks having
    // their fake implementations removed and restores their initial implementation.
    restoreMocks: true,

    // This file is loaded by each jest worker before setting up the test framework
    // and before running tests.
    setupFiles: [
        "<rootDir>/javascript/perseus-testing/jest-setup.js",
        "jest-date-mock",
    ],

    // This file is loaded by each jest worker after setting up the test framework
    // but before running the tests.
    setupFilesAfterEnv: [
        "jest-extended/all",
        "jest-specific-snapshot",
        "<rootDir>/dev/tools/jest-runner/matchers/perseusMatchers.js",
        "<rootDir>/javascript/perseus-testing/jest-setup-after-env.js",
    ],

    // Jest supports node 10 which uses jsdom-sixteen, so we'll use that.
    testEnvironment: "jsdom",

    // Compile .js files using custom babel settings.
    transform: {
        "^.+\\.(js|jsx|mjs)$":
            "<rootDir>/javascript/perseus-testing/jest-transform.js",
    },

    // Don't compute coverage on files in these locations.
    coveragePathIgnorePatterns: ["/node_modules/", "/third_party/"],

    // Add in custom snapshot serializers
    snapshotSerializers: ["jest-serializer-html"],
};
