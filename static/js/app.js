const navSlide = function () {
    const burger = document.querySelector('.burger');
    const navPanel = burger.previousElementSibling;
    const links = document.querySelectorAll('.nav-item');


    burger.addEventListener('click', () => {
        navPanel.classList.toggle('nav-active')

        if (navPanel.style.maxWidth) {
            navPanel.style.maxWidth = null;
        } else {
            navPanel.style.maxWidth = document.body.clientWidth/2 + 'px';
        }

        //Animate links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = null;
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.2}s`;
            }
        })

        // Animate burger
        burger.classList.toggle('toggle');
    })
}

const app = () =>{
    AOS.init();
    navSlide();
}

app();


