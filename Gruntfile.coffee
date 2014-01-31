module.exports = (grunt) ->
    @loadNpmTasks('grunt-browserify')
    @loadNpmTasks('grunt-bump')
    @loadNpmTasks('grunt-contrib-clean')
    @loadNpmTasks('grunt-contrib-jshint')
    @loadNpmTasks('grunt-contrib-uglify')
    @loadNpmTasks('grunt-contrib-watch')
    @loadNpmTasks('grunt-mocha-cli')

    @initConfig
        clean:
            dist: ['dist']

        jshint:
            all: [ 'lib/*.js', 'test/*.js' ]
            options:
                jshintrc: '.jshintrc'

        watch:
            all:
                options:
                    atBegin: true
                files: ['lib/**.js', 'test/*{,/*}']
                tasks: ['test']

        mochacli:
            options:
                files: 'test/*.js'
            spec:
                options:
                    reporter: 'spec'

        browserify:
            dist:
                files:
                    'dist/json-inspect.js': ['lib/json-inspect.js']
                options:
                    alias: 'lib/json-inspect.js:json-inspect'

        uglify:
            dist:
                files:
                    'dist/json-inspect.min.js': 'dist/json-inspect.js'

        bump:
            options:
                files: ['package.json', 'bower.json']
                commitFiles: ['-a']
                pushTo: 'origin'

    @registerTask 'default', ['test']
    @registerTask 'build', ['clean', 'jshint', 'browserify', 'uglify']
    @registerTask 'test', ['build', 'mochacli']
