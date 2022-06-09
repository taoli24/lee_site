const navSlide = function () {
    const burger = document.querySelector('.burger');
    const navPanel = burger.previousElementSibling;
    const links = document.querySelectorAll('.nav-item');

    burger.addEventListener('click', () => {
        navPanel.classList.toggle('nav-active')

        if (navPanel.style.maxWidth) {
            navPanel.style.maxWidth = null;
        } else {
            navPanel.style.maxWidth = document.body.clientWidth / 2 + 'px';
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

const scrollDownArrow = function () {
    const arrow = document.querySelector('.scroll-down-arrow');
    const projectSection = document.querySelector('.project-section');

    if (arrow != null) {
        arrow.addEventListener('click', (e) => {
            projectSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        });
    }
}

// set project section style based on viewport width
const every_nth = (arr, nth) => arr.filter((element, index) => index % nth === nth - 1);

const toggleClass = function (className) {
    const projects = document.querySelectorAll('.project');
    const projects_arr = Array.from(projects);
    if (window.innerWidth <= 1200) {
        every_nth(projects_arr, 2).forEach(project => {
            if (project.classList.contains(className)) {
                project.classList.remove(className);
            }
        });
    } else {
        if (window.innerWidth > 1200) {
            every_nth(projects_arr, 2).forEach(project => {
                if (project.classList.contains(className) === false) {
                    project.classList.add(className);
                }
            });
        }
    }
}

const addRemoveProjectSecond = function () {
    window.addEventListener('resize', () => {
        toggleClass('project-second');
    });
}

const onload = function () {
    document.addEventListener("DOMContentLoaded", () => {
        toggleClass('project-second');
    });
}

const app = () => {
    onload();
    AOS.init();
    navSlide();
    scrollDownArrow();
    addRemoveProjectSecond();
}

app();


