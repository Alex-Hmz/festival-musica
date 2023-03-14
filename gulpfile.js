const { src, dest, watch, parallel } = require("gulp");

//CSS
const plumber = require ("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));

//Imágenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css (done){    
    src("src/scss/**/*.scss") //Identificar archivo de SASS    
        .pipe(plumber())
        .pipe(sass()) //Compilar
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
    .pipe(dest("build/js"));
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