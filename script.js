window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const projectInfo = document.querySelector(".project-info");

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const rect = projectInfo.getBoundingClientRect();

    // Hero blur logic
    if(scrollY > windowHeight / 2){
        hero.classList.add("blur");
        projectInfo.classList.add("visible");
    } else {
        hero.classList.remove("blur");
        projectInfo.classList.remove("visible");
    }

    // Project info dynamic blur based on scroll into view
    if(rect.top < windowHeight && rect.bottom > 0){
        // distance from center
        const distanceFromCenter = Math.abs(rect.top + rect.height/2 - windowHeight/2);
        const blurAmount = Math.min(8, (distanceFromCenter / (windowHeight/2)) * 8);
        projectInfo.style.filter = `blur(${blurAmount}px)`;
    } else {
        // out of view → full blur
        projectInfo.style.filter = 'blur(8px)';
    }
});
