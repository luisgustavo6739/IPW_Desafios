const navbar = document.querySelector(".nav-overlay");

window.addEventListener("scroll", () => {
    if (window.scrollY > 55) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});