module.exports = function(grunt) {

var srcFiles = [
    "build/src/core.js",
    "build/src/util.js",
    "build/src/info-tip.js",
    "build/src/renderer.js",
    "build/src/editor.js",
    "build/src/widgets.js",
    "build/src/widgets/input-number.js",
    "build/src/widgets/interactive-graph.js",
    "build/src/widgets/interactive-number-line.js",
    "build/src/widgets/radio.js",
    "build/src/widgets/dropdown.js",
    "build/src/widgets/table.js",
    "build/src/widgets/categorization.js",
    "build/src/widgets/expression.js",
    "build/src/widgets/ordering.js",
    "build/src/item-renderer.js",
    "build/src/item-editor.js"
];

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    shell: {
        jsx: {
            command: "jsx src/ build/src/"
        }
    },
    concat: {
        options: {
            banner: "/*! Perseus | http://github.com/Khan/perseus */\n",
            separator: ";"
        },
        dist: {
            src: srcFiles,
            dest: "build/perseus.js"
        }
    },
    uglify: {
        options: {
            banner: "/*! Perseus | http://github.com/Khan/perseus */\n"
        },
        build: {
            src: srcFiles,
            dest: "build/perseus.min.js"
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks("grunt-shell");

grunt.registerTask("default", ["shell:jsx", "concat", "uglify"]);

};
