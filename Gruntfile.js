module.exports = function(grunt) {

var srcFiles = [
    "src/core.js",
    "src/util.js",
    "src/widgets.js",
    "src/widgets/input-number.js",
    "src/widgets/interactive-graph.js",
    "src/widgets/radio.js",
    "src/renderer.js",
    "src/editor.js",
    "src/item-renderer.js"
];

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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

grunt.registerTask("default", ["concat", "uglify"]);

};
