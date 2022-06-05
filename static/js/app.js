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

// const toggleClass = function (){
//
// }

const addRemoveProjectSecond = function () {
    const projects = document.querySelectorAll('.project');
    const projects_arr = Array.from(projects);
    const every_nth = (arr, nth) => arr.filter((element, index) => index % nth === nth - 1);
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1200) {
            every_nth(projects_arr, 2).forEach(project => {
                if (project.classList.contains('project-second')) {
                    project.classList.remove('project-second');
                }
            })
        } else {
            if (window.innerWidth > 1200) {
                every_nth(projects_arr, 2).forEach(project => {
                    if (project.classList.contains('project-second') !== false) {
                        project.classList.add('project-second');
                    }
                })
            }
        }
    });
}

const onload = function () {
    const projects = document.querySelectorAll('.project');
    const projects_arr = Array.from(projects);
    const every_nth = (arr, nth) => arr.filter((element, index) => index % nth === nth - 1);
    document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth <= 1200) {
            every_nth(projects_arr, 2).forEach(project => {
                if (project.classList.contains('project-second')) {
                    project.classList.remove('project-second');
                }
            })
        } else {
            if (window.innerWidth > 1200) {
                every_nth(projects_arr, 2).forEach(project => {
                    if (project.classList.contains('project-second') !== false) {
                        project.classList.add('project-second');
                    }
                })
            }
        }
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


