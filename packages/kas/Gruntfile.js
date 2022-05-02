module.exports = function(grunt) {

var srcFiles = [
    "src/parser.js",
    "src/unitparser.js",
    "src/nodes.js",
    "src/compare.js"
];

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
        options: {
            banner: "/*! KAS | https://github.com/Khan/KAS */\n"
        },
        dist: {
            src: srcFiles,
            dest: "kas.js"
        }
    },
    execute: {
        parser: {
            src: ['src/parser-generator.js']
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-concat");
grunt.loadNpmTasks('grunt-execute');
grunt.registerTask("default", ["concat"]);
grunt.registerTask("parser", ["execute:parser"]);

};
