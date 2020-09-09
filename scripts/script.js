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


