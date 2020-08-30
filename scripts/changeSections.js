/* console.log('Estoy funcionando desde el changeSections'); */

//VARIABLES SECCIONES DEL DOM
let principal_section= document.getElementById('principal_section');
let trending_section = document.getElementById('trending_section');
let results_section = document.getElementById('results');
let search_empty = document.getElementById('search_empty');
let favorite = document.getElementById('favorite');
let misGifos = document.getElementById('misGifos');
let carousel = document.getElementById('carousel');
let createGifos = document.getElementById('createGifos');

// FUNCION PARA LIMPIAR EL DOM
let clean_sections=() => {
    principal_section.classList.remove('show');
    principal_section.classList.add('hide');
    trending_section.classList.add('hide');
    trending_section.classList.remove('show');
    /* results.classList.add('hide');
    results.classList.remove('show'); */
    search_empty.classList.add('hide');
    search_empty.classList.remove('show');
    favorite.classList.add('hide');
    favorite.classList.remove('show');
    misGifos.classList.add('hide');
    misGifos.classList.remove('show');
    carousel.classList.add('hide');
    carousel.classList.remove('show');
    createGifos.classList.add('hide');
    createGifos.classList.remove('show');
}

//FUNCION MOSTRAR SECCION DESEADA
let btn_home = document.getElementById('logo');
btn_home.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    principal_section.classList.remove('hide');
    principal_section.classList.add('show');
    trending_section.classList.add('show');
    trending_section.classList.remove('hide');
    trending_section.classList.remove('hide');
    trending_section.classList.add('show');
    carousel.classList.remove('hide');
    carousel.classList.add('show'); 
});

//SECCION FAVORITOS
let btn_favoritos = document.getElementById('btnfavorite');
btn_favoritos.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    favorite.classList.remove('hide'); 
    favorite.classList.add('show');
});

// SECCION MIS GIFOS
let btn_mis_gifos = document.getElementById('btnmisGifos');
btn_mis_gifos.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    misGifos.classList.remove('hide'); 
    misGifos.classList.add('show');
});

//SECCION CREAR GIFOS
let btn_create = document.getElementById('btncreateGifos');
btn_create.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    createGifos.classList.remove('hide'); 
    createGifos.classList.add('show');
    //pedir permiso desde el inicio de la seccion
} );