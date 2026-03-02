const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth:true
});


function firstPageAnimation(){
    //GSAP (GreenSock Animation Platform) iska use animation likhne ke liye hota hai javascript me
    var tl = gsap.timeline();//gsap.timeline()sbse powerful cheez hai ise hmm animation ke chain bna skte for example  phale kis per animation chelga jo phale hoga usper.

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .to(".boundingelem", {
        y: 0,
        ease: "expo.inOut",
        duration: 2,
        stagger: 0.3,
        delay: -1
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut" 
    });
}


var timeout;

function circleChapta(){
    //default scale value
    var xscale = 1;
    var yscale = 1;


    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){

    clearTimeout(timeout);

    //speed nikalne ke liye curr and previous position
    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    //GSAP utils se scale ko 0.8 aur 1.2 ke beech limit karna

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff / 100 + 1);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff / 100 + 1);


    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMousefollower(xscale,yscale);

    //jab mouse ruk jaye toh circle wapas normal jo jaye

    timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    },100);

    });
}

function circleMousefollower(xscale,yscale) {
    window.addEventListener("mousemove", function(dets){
        //document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
       gsap.to("#minicircle", {
        x: dets.clientX,
        y: dets.clientY,
        duration: 1.5,
        ease: "power2.out",
        scaleX: xscale,
        scaleY: yscale,
        overwrite: "auto"
       });
    });
}

circleChapta();
circleMousefollower();
firstPageAnimation();


document.querySelectorAll(".elem").forEach(function(elem){

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(details){
        var differ = details.clientY-elem.getBoundingClientRect().top;
       diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3",
            top: differ,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.3)
        });  
    });
     
   elem.addEventListener("mouseleave", function()
    {

       gsap.to(elem.querySelector("img"),
        {
            opacity: 0,
            ease: "power3",
           duration: 2, 
        });
    });
});