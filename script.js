function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior:'smooth' });
}

document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  alert("Booking Submitted Successfully!");
  e.target.reset();
});

new Typed('#typed-text',{
  strings:["Books...","Gifts...","Printing...","Events...","Decorations..."],
  typeSpeed:90,
  backSpeed:50,
  loop:true
});

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("section").forEach(sec=>{
  gsap.from(sec,{
    opacity:0,
    y:60,
    duration:1,
    scrollTrigger:{ trigger:sec, start:"top 80%" }
  });
});

