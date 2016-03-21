module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ftp');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var DIR_BOWER = './bower_components/',
			DIR_CSS = 'assets/css/',
			DIR_IMG = 'assets/img/';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),
		'sass': {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'assets/css/sq2.css': DIR_BOWER + 'sassquatch2/sass/sassquatch.scss',
					'assets/css/brand-transition.css': 'assets/scss/brand-transition.scss'
				}
			}
		},

		'uglify': {
			my_target: {
				files: {
					'assets/js/scripts.min.js': ['assets/js/dist/*.js']
				}
			}
		},

		'clean': {
			css: [DIR_CSS]
		},

		'ftpPut': {
			options: {
				host: 'mperrotti.com',
				user: 'mperrotti',
				pass: 'P@ssw0rd@mike'
			},
			upload: {
				files: {
					'public_html/temp_storage/rebrand-transitional': 'assets/css/*'
					// 'public_html/temp_storage/rebrand-transitional': 'assets/js/scripts.min.js'
				}
			}
		},

		'watch': {

			css: {
				files: ['assets/scss/*.scss', 'assets/scss/**/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: false,
					spawn: false,
				}
			},

			js: {
				files: ['assets/js/dist/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: false,
					spawn: false,
				}
			}

		}
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'sass', 'uglify']);
	grunt.registerTask('upload', ['ftpPut']);
};
