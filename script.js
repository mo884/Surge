gsap.registerPlugin(ScrollTrigger);



// Section 1
document.addEventListener("DOMContentLoaded", function () {

    let section1 = gsap.timeline()

    section1.to(".section1", {
        opacity: 1,
        duration: 1,
    });

    section1.from(".emirates-nbd", {
        opacity: 0,
        duration: 1,
        y: -15,
        ease: "power2.out"
    }, "+=0.1");

    section1.from("h1, .surge, .msg, .msg2", {
        opacity: 0,
        duration: 1,
        stagger: 0.5,
    }, "<+=0.3");

    section1.from(".section1 .scroll", {
        opacity: 0,
        y: 20,
        duration: 1,
    }, "<+=2");

    const obj = document.querySelector('.scroll');
    obj.addEventListener('load', () => {
        const svgDoc = obj.contentDocument;
        const dot = svgDoc.querySelector('#dot');

        section1.from(dot, {
            opacity: 0,
            y: 30,
            duration: 1,
            repeat: -1,
            ease: "power2.out"
        }, "<+=0.5");
    });
});



// Initialize Swiper without autoplay enabled
const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: false, // Disable autoplay initially
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        800: {
            slidesPerView: 3,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        },
        0: {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        },
    },
});

// GSAP scroll trigger for fade-in and autoplay
gsap.from('.swiper-slide', {
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '#mySwiper',
        start: 'top 80%',
        end: 'bottom top',
        onEnter: () => {
            swiper.autoplay.start(); // Start autoplay on enter
        },
        onLeave: () => {
            swiper.autoplay.stop(); // Stop autoplay on leave
        },
        onEnterBack: () => {
            swiper.autoplay.start(); // Restart autoplay when scrolling back
        },
        onLeaveBack: () => {
            swiper.autoplay.stop(); // Stop autoplay again when leaving upward
        }
    },
});



document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll("#chart1 .slide");
    const blueClasses = ["blue1", "blue2", "blue3", "blue4", "blue5", "blue6"];
    const textClasses = ["text1", "text2", "text3", "text4", "text5", "text6"];

    gsap.registerPlugin(ScrollTrigger);

    // === Initial state for Section 3 ===
    blueClasses.forEach(cls => gsap.set(`.${cls}`, { opacity: 0 }));
    gsap.set(".blue1", { opacity: 1 });
    textClasses.forEach(cls => gsap.set(`.${cls}`, { attr: { fill: "black" } }));
    gsap.set(".text1", { attr: { fill: "white" } });
    gsap.set(slides, { opacity: 0 });
    gsap.set(slides[0], { opacity: 1 });

    let currentSlide = 0;
    let section4Started = false;

    // === Section 4 Initial Setup ===
    gsap.set('#chart2 .svgcontent', { opacity: 0 });
    gsap.set('#chart2 .btn .bluebg', { opacity: 0 });
    gsap.set('#chart2 .btn .txt', { attr: { fill: "black" } });
    gsap.set('#chart2 .svgcontent1', { opacity: 1 });
    gsap.to('#chart2 .btn .bluebg1', { opacity: 1 });
    gsap.set('#chart2 .btn .txt1', { attr: { fill: "white" } });

    const section4Animations = function (sel) {
        let tl = gsap.timeline();

        tl.set('#chart2 .btn .txt', { attr: { fill: "black" } })
            .to('#chart2 .svgcontent', { opacity: 0, duration: 0.1 })
            .to('#chart2 .btn .bluebg', { opacity: 0, duration: 0.1 }, "<")
            .set(`#chart2 .btn .txt${sel}`, { attr: { fill: "white" } }, "<")
            .to(`#chart2 .svgcontent${sel}`, { opacity: 1, duration: 0.4, delay: 0.1 })
            .to(`#chart2 .btn .bluebg${sel}`, { opacity: 1, duration: 0.4 }, "<");

        return tl;
    };

    // === Manual click only: no timer, no loop ===
    $('#chart2 .btn').on('click', function () {
        const selection = $(this).data('btn');
        section4Animations(selection);
    });

    // === Section 3 ScrollTrigger Logic ===
    ScrollTrigger.create({
        trigger: ".section3",
        start: "top top",
        end: () => `+=${slides.length * window.innerHeight}`,
        pin: true,
        snap: 1 / (slides.length - 1),
        onUpdate: (self) => {
            const progress = self.progress;
            const newSlide = Math.round(progress * (slides.length - 1));

            if (newSlide !== currentSlide) {
                gsap.to(slides[currentSlide], { opacity: 0, duration: 0.15, ease: "power1.out" });
                gsap.to(slides[newSlide], {
                    opacity: 1,
                    duration: 0.15,
                    ease: "power1.out",
                    onStart: () => {
                        gsap.fromTo(
                            slides[newSlide].querySelectorAll("g"),
                            { opacity: 0 },
                            { opacity: 1, y: 0, stagger: 0.3, duration: 1 }
                        );

                        blueClasses.forEach(cls =>
                            gsap.to(`.${cls}`, { opacity: 0, duration: 0.3 })
                        );
                        gsap.to(`.blue${newSlide + 1}`, { opacity: 1, duration: 0.3 });

                        textClasses.forEach(cls =>
                            gsap.to(`.${cls}`, { attr: { fill: "black" }, duration: 0.3 })
                        );
                        gsap.to(`.text${newSlide + 1}`, {
                            attr: { fill: "white" },
                            duration: 0.3
                        });
                    }
                });

                currentSlide = newSlide;

                if (newSlide === slides.length - 1 && !section4Started) {
                    section4Started = true;

                    // Removed runAnimationLoop() call here
                    gsap.to(".section4 p", { opacity: 0, delay: 4.5 });
                }
            }
        }
    });
});





