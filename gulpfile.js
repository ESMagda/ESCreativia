var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify-es').default,
		cleancss     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rsync        = require('gulp-rsync'),
		newer        = require('gulp-newer'),
		rename       = require('gulp-rename'),
		responsive   = require('gulp-responsive'),
		del          = require('del'),
		imagemin     = require('gulp-imagemin'),
		cache        = require('gulp-cache');

// Local Server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

function bsReload(done) { browserSync.reload(); done(); };

gulp.task('styles', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({
		outputStyle: 'expanded',
		includePaths: [__dirname + '/node_modules']
	}))
	.pipe(concat('styles.min.css'))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) 
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/OwlCarousel/dist/owl.carousel.min.js',
		'app/js/_libs.js', 
		'app/js/_custom.js', 
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) 
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// Responsive Images
var quality = 95; // Responsive images quality

// Produce @1x images
gulp.task('img-responsive-1x', async function() {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@1x'))
		.pipe(responsive({
			'**/*': { width: '50%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('app/img/@1x'))
});
// Produce @2x images
gulp.task('img-responsive-2x', async function() {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('app/img/@2x'))
});
gulp.task('img', gulp.series('img-responsive-1x', 'img-responsive-2x', bsReload));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['app/img/@*'], { force: true })
});

// Code & Reload
gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('styles'));
	gulp.watch(['app/js/_custom.js', 'app/js/_libs.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));

gulp.task('removedist', function() { return del(['dist'], { force: true }) });

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin())) 
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('buildFiles', function() { return gulp.src(['app/*.html', 'app/.htaccess']).pipe(gulp.dest('dist')) });

gulp.task('buildCss', function() { return gulp.src(['app/css/styles.min.css']).pipe(gulp.dest('dist/css')) });

gulp.task('buildJs', function() { return gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest('dist/js')) });

gulp.task('buildFonts', function() { return gulp.src(['app/fonts/**/*']).pipe(gulp.dest('dist/fonts')) });

gulp.task('build', gulp.series('removedist', 'imagemin', 'styles', 'scripts', 'buildFiles', 'buildCss', 'buildJs', 'buildFonts'));


gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));
});