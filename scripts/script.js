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

