window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const projectInfo = document.querySelector(".project-info");

    const scrollY = window.scrollY;

    if(scrollY > window.innerHeight / 2){
        // Blur hero
        hero.classList.add("blur");

        // Show project info
        projectInfo.classList.add("visible");
    } else {
        // Reset
        hero.classList.remove("blur");
        projectInfo.classList.remove("visible");
    }
});
