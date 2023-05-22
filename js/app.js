const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, yValue = 0;

let rotateDegree = 0;

function update(cursorPosition){
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isIntLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isIntLeft * 0.1; 

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) rotateY(${rotateDegree * rotateSpeed}deg) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
    });
}

update(0);

window.addEventListener("mousemove", (e) => {
    if(timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX)
})

if(window.innerWidth >= 1525){
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else{
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

let timeline = gsap.timeline();

Array.from(parallax_el).filter((el) => !el.classList.contains("text")).forEach((el) => {
    let initialTop = getComputedStyle(el).top; // Store the initial top position
    timeline.fromTo(
        el,
        {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        },
        {
            top: initialTop,
            duration: 3.5,
            ease: "power3.out",
        },
        "1"
    );
});


timeline.from(".text h1", {
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 100,
        duration: 2,
    }, 
    "2.5"
)
.from(
    ".text h2",
    {
        y: -150,
        opacity: 0,
        duration: 1.5,
    },
    "3"
)
.from(
    ".hide", {
        opacity: 0,
        duration: 1.5,
    },
    "3"
);

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var mainTop = $('#main-section').position().top;
    var section2Top = $('#section2').position().top;

    if (scroll >= mainTop && scroll < section2Top) {
        // Calculate the percentage of how far the user has scrolled
        var percentage = ((scroll - mainTop) / (section2Top - mainTop)) * 100;

        // Multiply the percentage by a factor to make the clouds move faster
        var speed = 1.8;
        var adjustedPercentage = percentage * speed;

        // Apply the adjusted percentage to the left/right properties of each cloud
        $('#cloud1').css('right', (100 - adjustedPercentage) + '%');
        $('#cloud2').css('left', (100 - adjustedPercentage) + '%');
    } else {
        // If the user is not within the transition area, move the clouds off-screen
        $('#cloud1').css('right', '100%');
        $('#cloud2').css('left', '100%');
    }
});
