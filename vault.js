
const SECRET_SHA256_HEX = "e3fab2d48d860ed2f78b00ac367362b749e561f06010a1ff246fcc003bf1e9fb";

async function sha256hex(text){
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const bytes = Array.from(new Uint8Array(buf));
  return bytes.map(b=>b.toString(16).padStart(2,"0")).join("");
}

function elt(sel){ return document.querySelector(sel); }
function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function initVault(){
  const form = elt("#vault-form");
  const out = elt("#vault-out");
  const pwdInput = elt("#pwd");

  const qpwd = getQueryParam("pwd");
  const lpwd = (function(){ try{ return localStorage.getItem('skatt_pwd'); }catch(e){ return null; } })();
  if(qpwd) pwdInput.value = qpwd;
  else if(lpwd) pwdInput.value = lpwd;

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    out.innerHTML = "";
    const name = (elt("#name").value || "").trim();
    const pwd = (pwdInput.value || "").trim();
    const hash = await sha256hex(pwd);
    if(hash === SECRET_SHA256_HEX){
      document.body.insertAdjacentHTML("afterbegin", '<div class="vault-bg"></div>');
      out.innerHTML = `
        <div class="modal">
          <h2>Bra jobbat${name ? ", "+name : ""}!</h2>
          <p class="notice">Skattkammaren är upplåst.</p>
          <div class="actions">
            <button class="btn btn-primary" id="close">Stäng</button>
          </div>
        </div>`;
      document.querySelector("#close").onclick = ()=> location.replace('index.html');
    }else{
      out.innerHTML = `<p class="notice" style="border-color:#ff9d9d;color:#ffdede">Tyvärr var det fel, försök igen.</p>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", initVault);
