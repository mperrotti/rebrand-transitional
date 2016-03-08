module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
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
					'assets/css/shim.css': 'assets/scss/shim.scss',
					'assets/css/brand-transition.css': 'assets/scss/brand-transition.scss'
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
				}
			}
		},

		'watch': {

			css: {
				files: ['assets/scss/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: false,
					spawn: false,
				}
			}

		}
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'sass']);
	grunt.registerTask('upload', ['ftpPut']);
};
