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
const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');
const track = document.getElementById('track');
const slickList = document.getElementById('slick-list');
const slick = document.querySelectorAll('.slick');

const slickWidth = slick[0].offsetWidth;

buttonPrev.onclick = () => Move(1);
buttonNext.onclick = () => Move(2);

function Move(value){
        const trackWidth = track.offsetWidth;
        const listWidth = slickList.offsetWidth;

        track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
    
        if(leftPosition < (trackWidth - listWidth) && value == 2){
                track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
        }else if(leftPosition > 0 && value == 1){
                track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
        }
}