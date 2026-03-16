const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

const windowHeight = window.innerHeight;

reveals.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){

el.classList.add("active");

}else{

el.classList.remove("active");

}

});

}

window.addEventListener("scroll", revealOnScroll);



/* Animacion fondo */
const bg = document.querySelector(".animated-bg");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {

mouseX = (e.clientX / window.innerWidth - 0.5) * 200;
mouseY = (e.clientY / window.innerHeight - 0.5) * 200;

});

function animateBg(){

currentX += (mouseX - currentX) * 0.05;
currentY += (mouseY - currentY) * 0.05;

bg.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;

requestAnimationFrame(animateBg);

}

animateBg();



/* HERO STATS COUNTER */

const counters = document.querySelectorAll(".stat-number");

function animateCounters(){

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");

let current = 0;

const increment = target / 300;

const updateCounter = () => {

current += increment;

if(current < target){

counter.innerText = Math.floor(current);

requestAnimationFrame(updateCounter);

}else{

counter.innerText = target;

if(target === 12000){
counter.innerText = "+12K";
}

if(target === 8){
counter.innerText = "8 años";
}

}

};

updateCounter();

});

}

animateCounters();



/* SUPABASE */

const supabaseUrl = "https://dmgepzbmqcnjlsuaygzh.supabase.co";
const supabaseKey = "sb_publishable_tYEjwFsq_Y5p5QYMu6wCRg_TP-dR1J8";

const supabaseClient =
supabase.createClient(supabaseUrl,supabaseKey);

/* MENU MOBILE */

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

if(hamburger){
hamburger.addEventListener("click",()=>{
menu.classList.toggle("active");
});
}

/* AUTH MODAL */

const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeAuth = document.getElementById("closeAuth");

if(loginBtn){
loginBtn.addEventListener("click", ()=>{
authModal.style.display = "flex";
openTab("loginTab");
});
}

if(registerBtn){
registerBtn.addEventListener("click", ()=>{
authModal.style.display = "flex";
openTab("registerTab");
});
}

if(closeAuth){
closeAuth.addEventListener("click", ()=>{
authModal.style.display = "none";
});
}

/* cerrar clickeando afuera */

window.addEventListener("click",(e)=>{
if(e.target === authModal){
authModal.style.display="none";
}
});

/* REGISTER */

const signupForm =
document.getElementById("signupForm");

signupForm?.addEventListener("submit",async(e)=>{

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const { error } =
await supabaseClient.auth.signUp({
email,
password
});

if(error){
alert(error.message);
return;
}

alert("Cuenta creada");

window.location.href="perfil.html";

});

/* LOGIN */

const loginForm =
document.getElementById("loginForm");

loginForm?.addEventListener("submit",async(e)=>{

e.preventDefault();

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const { error } =
await supabaseClient.auth.signInWithPassword({
email,
password
});

if(error){
alert(error.message);
return;
}

window.location.href="perfil.html";

});

/* CHECK USER */

async function checkUser(){

const { data:{user} } =
await supabaseClient.auth.getUser();

if(user){

document.getElementById("loginBtn").style.display="none";
document.getElementById("registerBtn").style.display="none";

}

}

checkUser();

/* AUTH TABS */

const tabs = document.querySelectorAll(".auth-tab");
const contents = document.querySelectorAll(".auth-content");

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));

tab.classList.add("active");

document
.getElementById(tab.dataset.tab)
.classList.add("active");

});

});

function openTab(tabId){

tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));

document
.querySelector(`[data-tab="${tabId}"]`)
.classList.add("active");

document
.getElementById(tabId)
.classList.add("active");

}
