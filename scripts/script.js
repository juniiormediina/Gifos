/* Funcion del boton del menu */
document.getElementById('btn-menu').addEventListener('click', () => {
        var iconMenu = document.getElementById('icon');
        let fullMenu = document.getElementsByClassName('full-menu')[0];
        if (iconMenu.classList.contains('fa-times')) {
                iconMenu.classList.toggle('fa-times');
                iconMenu.classList.toggle('fa-bars');
                fullMenu.style.left = '-100%';
        } else{
                iconMenu.classList.toggle('fa-bars');
                iconMenu.classList.toggle('fa-times');
                fullMenu.style.left = '0%';
        }
});

/* Sugerencias en la barra de busqueda */

/* Slider */

var slide_index = 1;
displaySlides(slide_index);

function nextSlide(n){
        displaySlides(slide_index += n);
}

function currentSlide(n){
        displaySlides(slide_index = n);
}

function displaySlides(n){
        var slides = document.getElementsByClassName('showSlide');
        if(n > slides.length){
                slide_index = 1;
        }
        if(n < 1){
                slide_index = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
        }
        slides[slide_index - 1].style.display = 'Block';
}

/* Conectar con API */
//TODO: terminar de hacer la consulta e importe de la API (verificar documentacion)
const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";
let getSearch = (Key_api) => {
        fetch('api.giphy.com/v1/trending/searches' + Key_api)
}

/* Scroll */
window.onscroll = function(){
        scrollFunction();
};
//TODO: importante falta hacer que se agregue la barra de busqueda en el header al hacer scroll
function scrollFunction(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("navbar").style.background = "white";
        } else {
                /* document.getElementById("navbar").style.top = "-50px"; */
        }
}