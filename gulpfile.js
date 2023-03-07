const { src, dest, watch } = require("gulp");
const plumber = require ("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
function css (done){
    
    src("src/scss/**/*.scss") //Identificar archivo de SASS    
        .pipe(plumber())
        .pipe(sass()) //Compilar
        .pipe(dest("build/css")); //Guardar en HD

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.dev = dev;