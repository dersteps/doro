module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build']
        },
        copy: {
            js: {
                files: [
                    { expand: true, cwd: 'js', src: ['**.js'], dest: 'build/js'}
                ]
            },
            css: {
                files: [
                    { expand: true, cwd: 'css', src: ['**.css'], dest: 'build/css'}
                ]
            },
            app: {
                files: [
                    {expand: true, cwd: '.', src: ['index.html', 'index.js', 'main.js'], dest: "build"}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('copy:all', ['copy:js', 'copy:css', 'copy:app']);

    grunt.registerTask('default', ['clean:build', 'copy:all']);
};

