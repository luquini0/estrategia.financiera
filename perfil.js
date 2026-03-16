const supabaseUrl = "https://dmgepzbmqcnjlsuaygzh.supabase.co";
const supabaseKey = "sb_publishable_tYEjwFsq_Y5p5QYMu6wCRg_TP-dR1J8";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

/* =========================
   INIT
========================= */

async function init(){

const { data:{user} } = await supabaseClient.auth.getUser();

if(!user){
window.location.href="index.html";
return;
}

document.getElementById("userEmail").innerText = user.email;

/* buscar perfil */

let { data:profile } = await supabaseClient
.from("profiles")
.select("*")
.eq("id",user.id)
.single();

/* si no existe perfil lo crea */

if(!profile){

await supabaseClient.from("profiles").insert({
id:user.id,
name:"",
country:"",
avatar:""
});

profile = {};
}

/* cargar datos */

document.getElementById("name").value = profile.name || "";
document.getElementById("country").value = profile.country || "";

if(profile.avatar){
document.getElementById("avatar").src = profile.avatar;
}

}

init();

/* =========================
   LOGOUT
========================= */

document
.getElementById("logout")
.addEventListener("click", async ()=>{

await supabaseClient.auth.signOut();

window.location.href="index.html";

});

/* =========================
   GUARDAR PERFIL
========================= */

document
.getElementById("saveProfile")
.addEventListener("click", async ()=>{

const { data:{user} } = await supabaseClient.auth.getUser();

const name = document.getElementById("name").value;
const country = document.getElementById("country").value;

const { error } = await supabaseClient
.from("profiles")
.upsert({
id:user.id,
name,
country
});

if(error){
alert(error.message);
return;
}

alert("Perfil actualizado");

});

/* =========================
   SUBIR AVATAR
========================= */

document
.getElementById("avatarUpload")
.addEventListener("change", async (event)=>{

const file = event.target.files[0];
if(!file) return;

const { data:{user} } = await supabaseClient.auth.getUser();

const filePath = user.id + "/avatar.png";

/* subir imagen */

const { error } = await supabaseClient.storage
.from("avatars")
.upload(filePath, file, {
upsert:true
});

if(error){
alert(error.message);
return;
}

/* obtener url */

const { data } = supabaseClient.storage
.from("avatars")
.getPublicUrl(filePath);

document.getElementById("avatar").src = data.publicUrl;

/* guardar en perfil */

await supabaseClient
.from("profiles")
.upsert({
id:user.id,
avatar:data.publicUrl
});

});

/* =========================
   TABS DASHBOARD
========================= */

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

tab.addEventListener("click", ()=>{

tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));

tab.classList.add("active");

document
.getElementById(tab.dataset.tab)
.classList.add("active");

});

});