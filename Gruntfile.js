module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
        options: {
            banner: "/*! Perseus | http://github.com/Khan/perseus */\n"
        },
        build: {
            src: [
                "src/core.js",
                "src/widgets.js",
                "src/widgets/input-integer.js",
                "src/renderer.js",
                "src/editor.js"
            ],
            dest: "build/perseus.min.js"
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-uglify");

grunt.registerTask("default", ["uglify"]);

};
