AOS.init();

// loading =======================
window.addEventListener("load", () => {
    const loading = document.querySelector(".loading");
    loading.style.cssText = "opacity:0; z-index:-1;";

    // song button ======================================
    const audioButton = document.querySelector(".audio-btn"),
        puse = document.querySelector("#puse");

    let backMusic = document.createElement("div");
    backMusic.className = "background-music"
    document.body.appendChild(backMusic);
    backMusic.innerHTML =
        "<audio id='music' data-custem autoplay loop src='audio/Art of Silence.mp3'></audio>";

    localSave = localStorage.getItem("icon-music");
    if (localSave && localSave === "puse-act") {
        puse.classList.toggle("puse-act");
    };

    let music = document.querySelector("#music");

    audioButton.addEventListener("click", () => {
        puse.classList.toggle("puse-act")
        if (puse.classList.contains("puse-act")) {
            music.pause();
            audioButton.setAttribute("title", "play");
            localStorage.setItem("icon-music", "puse-act")
            music.dataset.custem = music.src = "";
        } else {
            music.play();
            audioButton.setAttribute("title", "pause");
            localStorage.setItem("icon-music", "play")
            music.dataset.custem = music.src = "audio/Art of Silence.mp3";
        };

        window.localStorage.setItem("data-music", music.src);
    });

    if (window.localStorage.getItem("data-music")) {
        music.src = window.localStorage["data-music"]
    }

    // scrollY =======================================
    let content = document.querySelectorAll(".content"),
        section = document.querySelectorAll("section"),
        secservices = document.querySelector("#sec-services"),
        scrollMouse = document.querySelector(".scroll-mouse");

    function scrollSecion() {
        let scrollYsec = section.length;
        while (scrollYsec-- && window.scrollY - 200 < section[scrollYsec].offsetTop) {
            content.forEach(contents => contents.classList.remove("scrollSec"));
            content[scrollYsec].classList.add("scrollSec");
        };

        // scrollMouse
        if (window.scrollY >= secservices.offsetTop - 750) {
            scrollMouse.style.transform = "scale(0)";
        } else scrollMouse.style.transform = "scale(1)";
        // 
    };
    scrollSecion()
    window.addEventListener("scroll", scrollSecion);

    // loading model-3D ============================================
    setTimeout(() => {
        document.querySelector(".loading-model").remove();
        document.querySelector("model-viewer").style.opacity = "1";
    }, 2500);

    // skills-couter && scroll  =======================================
    let counter = document.querySelectorAll(".counter");
    lineProgressphsho = document.querySelector(".skill-bar .phsho"),
        lineProgresszb = document.querySelector(".skill-bar .zb"),
        lineProgresssubpai = document.querySelector(".skill-bar .subpai"),
        lineProgressble = document.querySelector(".skill-bar .ble"),
        secSkills = document.querySelector("#sec-skills"),
        started = false;

    window.addEventListener("scroll", () => {
        if (window.scrollY >= secSkills.offsetTop - 300) {
            if (!started) {
                counter.forEach(all => counterSkills(all));
            }
            started = true;

            function counterSkills(ele) {
                let startCounter = ele.dataset.counter;
                let a = setInterval(() => {
                    if (++ele.textContent == startCounter) {
                        clearInterval(a);
                    }
                }, 2000 / startCounter);
            };

            // aniamtion progress line skills
            lineProgressphsho.style.cssText =
                "animation: photo 2s linear forwards; -webkit-animation: photo 2s linear forwards;";
            lineProgresszb.style.cssText =
                "animation: zb 2s linear forwards; -webkit-animation: zb 2s linear forwards;";
            lineProgresssubpai.style.cssText =
                "animation: zb 2s linear forwards; -webkit-animation: zb 2s linear forwards;";
            lineProgressble.style.cssText =
                "animation: ble 2s linear forwards; -webkit-animation: ble 2s linear forwards;";
        };
    });

    // project slider img ===========================================
    let btnLeft = document.querySelector("#btn-left"),
        btnRight = document.querySelector("#btn-right"),
        slider = document.querySelector(".slider"),
        sliderBox = document.querySelectorAll(".slider-box img");

    btnRight.addEventListener("click", () => {
        slider.scrollTo({
            left: 1207,
            behavior: "smooth"
        });

        btnRight.style.display = "none";
        btnLeft.style.display = "block";

        btnLeft.onclick = function () {
            slider.scrollTo({
                left: 0,
                behavior: "smooth"
            });

            btnLeft.style.display = "none";
            btnRight.style.display = "block";
        };
    });

    // light box ====================================================
    let lightBoxContainer = document.createElement("div"),
        lightBoxHeader = document.createElement("div"),
        lightBoxHeaderContent = document.createElement("div"),
        lightBoxHeaderClose = document.createElement("div"),
        lightBoxHeaderDownload = document.createElement("a"),
        lightBoxHeaderDownloadAtt1 = document.createAttribute("download"),
        lightBoxHeaderDownloadAtt2 = document.createAttribute("href"),
        lightBoxHeadersocialMedia = document.createElement("div"),
        lightBoxHeadersocialMediaContainer = document.createElement("ul"),
        lightBoxHeadersocialMediaInsta = document.createElement("ol"),
        lightBoxHeadersocialMediaArt = document.createElement("ol"),
        lightBoxHeadersocialMediaBeha = document.createElement("ol"),
        lightBoxImg = document.createElement("img"),
        lightBoxBtnLeft = document.createElement("span"),
        lightBoxBtnRight = document.createElement("span");

    sliderBox.forEach(sliderImg => {
        sliderImg.addEventListener("click", () => {
            slider.appendChild(lightBoxContainer);
            lightBoxContainer.prepend(lightBoxHeader, lightBoxImg, lightBoxBtnLeft, lightBoxBtnRight)
            lightBoxHeader.appendChild(lightBoxHeaderContent);
            lightBoxHeaderContent.append(lightBoxHeadersocialMedia, lightBoxHeaderDownload, lightBoxHeaderClose);
            lightBoxHeadersocialMedia.appendChild(lightBoxHeadersocialMediaContainer);
            lightBoxHeadersocialMediaContainer.append(lightBoxHeadersocialMediaInsta, lightBoxHeadersocialMediaArt, lightBoxHeadersocialMediaBeha);

            // create classes
            lightBoxContainer.className = "light-box";
            lightBoxHeader.className = "light-box__header";
            lightBoxHeaderContent.className = "light-box__header-content";
            lightBoxHeaderClose.className = "light-box__header-close light-box-con";
            lightBoxHeaderDownload.className = "light-box__header-download light-box-con";
            lightBoxHeadersocialMedia.className = "light-box__header-social light-box-con";
            lightBoxBtnLeft.className = "light-box__btn-left light-box__btn";
            lightBoxBtnRight.className = "light-box__btn-right light-box__btn";
            lightBoxHeadersocialMediaContainer.className = "light-box__social-media";
            lightBoxHeadersocialMediaInsta.className = "light-box__social-media__insta";
            lightBoxHeadersocialMediaArt.className = "light-box__social-media__art";
            lightBoxHeadersocialMediaBeha.className = "light-box__social-media__beha"

            // close light box
            lightBoxHeaderClose.onclick = function () {
                lightBoxContainer.remove();
            };

            // download img light box
            lightBoxHeaderDownload.onclick = function () {
                document.documentElement.style.setProperty("--animation", "downloand");
                lightBoxHeaderDownload.setAttributeNode(lightBoxHeaderDownloadAtt1);
                lightBoxHeaderDownload.setAttributeNode(lightBoxHeaderDownloadAtt2);
                lightBoxHeaderDownload.setAttribute("href", sliderImg.src);
                lightBoxHeaderDownload.classList.add("active");
                lightBoxHeaderDownload.addEventListener("animationend", () => {
                    lightBoxHeaderDownload.classList.remove("active");
                });
            };

            // cocial media light box
            function socialMediaToggle(e) {
                if (e.target != e.currentTarget) return;
                lightBoxHeadersocialMediaInsta.innerHTML =
                    "<a href='https://www.instagram.com/accounts/login/?next=/zd_ar.t/' target='_blanck'><i class='fa-brands fa-instagram'></i> instagram</a>";
                lightBoxHeadersocialMediaArt.innerHTML =
                    "<a href='https://www.artstation.com/zakariaelgallouch' target='_blanck'><i class='fa-brands fa-artstation'></i> art station</a>";
                lightBoxHeadersocialMediaBeha.innerHTML =
                    "<a href='https://www.behance.net/ZDART/projects' target='_blanck'><i class='fa-brands fa-behance'></i> behance</a>";
            };
            lightBoxHeadersocialMedia.addEventListener("click", socialMediaToggle);

            open = () => {
                lightBoxHeadersocialMedia.classList.add("show-act");
                lightBoxHeadersocialMediaContainer.classList.add("show");
            };

            close = () => {
                lightBoxHeadersocialMedia.classList.remove("show-act")
                lightBoxHeadersocialMediaContainer.classList.remove("show");
            };

            lightBoxHeadersocialMedia.onclick = () => {
                if (!lightBoxHeadersocialMediaContainer.classList.contains("show")) {
                    open();
                } else close();
            };

            document.body.onclick = (e) => {
                a = lightBoxHeadersocialMedia.contains(e.target);
                b = lightBoxHeadersocialMediaContainer.contains(e.target);
                !a && !b ? close() : "(--)";
            };

            // inner img html to js light box
            lightBoxImg.src = sliderImg.src;
            lightBoxImg.setAttribute("loading", "lazy");

            // button pass images light box
            var imagesArray = [
                "img-1.jpg",
                "img-2.png",
                "img-3.png",
                "img-4.png",
                "img-5.png",
                "img-6.jpg",
                "img-7.jpg",
                "img-8.png",
                "img-9.png",
                "img-10.png",
                "img-11.jpg",
                "img-12.png"]
            var index = 0;

            // btn prev
            function buttonPrev() {
                if (index <= 0) index = imagesArray.length;
                index--;
                return setLightBoxImg();
            };
            lightBoxBtnLeft.addEventListener("click", buttonPrev);

            // btn next
            function buttonNext() {
                if (index >= imagesArray.length - 1) index = -1;
                index++;
                return setLightBoxImg();
            };
            lightBoxBtnRight.addEventListener("click", buttonNext)

            // set light box img
            function setLightBoxImg() {
                lightBoxImg.setAttribute("src", "img/" + imagesArray[index]);
            };

            // button pass images light box btn keyboard control
            window.addEventListener('keydown', (e) => {
                if (e.key.includes("ArrowLeft")) {
                    buttonPrev();
                } else if (e.key.includes("ArrowRight")) {
                    buttonNext();
                } else {
                    e.preventDefault();
                };
            });
        });
    });

});

