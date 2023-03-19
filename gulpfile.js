const { src, dest, watch, parallel } = require("gulp");

//CSS
const plumber = require ("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Imágenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
//JS
const terser = require("gulp-terser-js");

function css (done){    
    src("src/scss/**/*.scss") //Identificar archivo de SASS  
        .pipe(sourcemaps.init())  
        .pipe(plumber())
        .pipe(sass()) //Compilar
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css")); //Guardar en HDD

    done();
}

function versionWebp(done){
    
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
    done();
}

function versionAvif(done){
    
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
    done();
}

//Función para llevarse archivos js al compilado
function js(done){
    src("src/js/**/*.js")
    .pipe(sourcemaps.init()) 
    .pipe(terser())
    .pipe(dest("build/js"))
    .pipe(sourcemaps.write("."));
    done();
}

//Función que observa todos los archivos scss y ejecuta la f css
function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", js);
    done();
}


exports.css = css;
exports.js = js;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev);