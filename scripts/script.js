

/* let iconMenu = document.getElementsByClassName('btn-menu')[0];
iconMenu.addEventListener('click', () => {
        if(document.getElementsByTagName('i').classList.contains('class')){
                alert('its work!');
        }
        
});  */

/* == 'fas fa-bars' */



/* let iconMenu = document.getElementById("icon");
iconMenu.onclick = () => {
    iconMenu.classList.toggle("fas fa-bars");
}; */

let iconMenu =document.getElementById('btn-menu').click(() =>{
        iconMenu.lastChild.classList('fas fa-times');
})