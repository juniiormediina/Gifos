/* Cambio de icono del menu */
document.getElementById('btn-menu').addEventListener('click', () => {
        
        let iconb = document.getElementById('bars');
        let iconc = document.getElementById('close');
        let fullMenu = document.getElementsByClassName('full-menu')[0];
        
        if(iconb.classList.contains('validacion')){
                iconb.style.display = 'block';
                iconc.style.display = 'none';
                fullMenu.style.left = '-100%';
                iconb.classList.remove('validacion');
        }else{
                iconc.style.display = 'block';
                iconb.style.display = 'none';
                fullMenu.style.left = '0%';
                iconb.classList.add('validacion');
        }
});

/* scroll header sticky y agrego barra de busqueda */
window.onscroll = function(){
        scrollFunction();
};
//TODO: importante falta hacer que se agregue la barra de busqueda en el header al hacer scroll
function scrollFunction(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                /* document.getElementById("navbar").style.background = "white"; */
        } else {
                /* document.getElementById("navbar").style.top = "-50px"; */
        }
}

/* Dark style */
window.onload = () => {
        new DarkMode();
}
class DarkMode{
        constructor(){
               this.change = document.getElementById('changeMode');
               this.body = document.getElementsByTagName('body');
               this.addEvents(); 
        }

        addEvents(){
                this.change.addEventListener('click', () => {
                        this.changeStyle();
                })
        }

        changeStyle() {
                event.preventDefault();
                let hasClass = this.body[0].classList.toggle('dark');
                if(hasClass){
                        event.currentTarget.innerHTML = 'MODO DIURNO';
                } else {
                        event.currentTarget.innerHTML = 'MODO NOCTURNO';
                }
        }
}

/* Slider */
//esto funciona bien solo que no cuando no esta dispuesto el elemento en la pagina que se encuentre
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



/* Cambio entre secciones  */

/* class ChangeSection{
        constructor(){
                this.btnFavorite = document.getElementById('favorite');
                this.btnMisGifos = document.getElementById('misGifos');
                this.btnCreateGifos = document.getElementById('createGifos');
        }

        hide(){

        }

        show(){

        }

        change(){

        }
} */




/* Conectar con API */
//TODO: terminar de hacer la consulta e importe de la API (verificar documentacion)
const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";
let getSearch = (Key_api) => {
        fetch('api.giphy.com/v1/trending/searches' + Key_api)
}



