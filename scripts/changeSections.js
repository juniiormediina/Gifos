/* Secciones del DOM */
let principal_section= document.getElementById('principal_section');
let trending_section = document.getElementById('trending_section');
let results_section = document.getElementById('results');
let search_empty = document.getElementById('search_empty');
let favorite = document.getElementById('favorite');
let misGifos = document.getElementById('misGifos');
let carousel = document.getElementById('carousel');
let createGifos = document.getElementById('createGifos');
let result_search_container = document.getElementById('results');
let result_search_section = document.getElementById('result_search_section'); 

/* Limpiar el DOM */
let clean_sections = () => {
    principal_section.classList.remove('show');
    principal_section.classList.add('hide');
    trending_section.classList.add('hide');
    trending_section.classList.remove('show');
    results.classList.add('hide');
    results.classList.remove('show');
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
    result_search_section.classList.add('hide');
    result_search_section.classList.remove('show');
}

/* Sección Principal */
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
    result_search_container.classList.remove('hide');
    result_search_section.classList.add('show');
    result_search_section.classList.remove('hide');
});

/* Sección favoritos */
let btn_favoritos = document.getElementById('btnfavorite');
btn_favoritos.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    favorite.classList.remove('hide'); 
    favorite.classList.add('show');
});

/* Sección mis gifos */
let btn_mis_gifos = document.getElementById('btnmisGifos');
btn_mis_gifos.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    misGifos_render_container.innerHTML='';
    misGifos.classList.remove('hide'); 
    misGifos.classList.add('show');
    creaMisGifos();
});

/* Sección crear gifos */
let btn_create = document.getElementById('btncreateGifos');
btn_create.addEventListener('click', () => {
    event.preventDefault();
    clean_sections();
    btn_video.hidden=false;
    createGifos.classList.remove('hide'); 
    createGifos.classList.add('show');
    upload_img.classList.add('hide');
    uploading_img.classList.add('hide');
    window_preview.classList.add('hide');
    btn_repeat.classList.add('hide');
    btn_blancos();
});