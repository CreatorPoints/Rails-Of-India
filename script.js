window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const projectInfo = document.querySelector(".project-info");

    if (!hero || !projectInfo) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const rect = projectInfo.getBoundingClientRect();

    if(scrollY > windowHeight / 2){
        hero.classList.add("blur");
        projectInfo.classList.add("visible");
    } else {
        hero.classList.remove("blur");
        projectInfo.classList.remove("visible");
    }

    if(rect.top < windowHeight && rect.bottom > 0){
        const distanceFromCenter = Math.abs(
          rect.top + rect.height / 2 - windowHeight / 2
        );
        const blurAmount = Math.min(8, (distanceFromCenter / (windowHeight / 2)) * 8);
        projectInfo.style.filter = `blur(${blurAmount}px)`;
    } else {
        projectInfo.style.filter = "blur(8px)";
    }
});
