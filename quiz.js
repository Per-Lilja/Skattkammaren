
const SHUFFLE_OPTIONS = false; // sätt true om du vill blanda
const SECRET_PASSWORD = "FYSIKVALVET2025XYZQ"; // 19 tecken
const NQ = 19;
const SHOW_KEY = "FysikForLife"; // kod för 'Visa rätt svar'

const QUESTIONS = [
  {text:"1. Vad är materia?", options:[
    "Något man kan se och ta på",
    "Allt som har en massa och volym",
    "Endast fasta ämnen",
    "Bara det som väger mer än ett kilo"
  ], correct:1},
  {text:"2. Vad är en atom?", options:[
    "Den minsta delen av ett grundämne",
    "Ett ämne som består av flera molekyler",
    "Något som bara finns i rymden",
    "En sorts molekyl"
  ], correct:0},
  {text:"3. Vad är skillnaden mellan ett grundämne och en kemisk förening?", options:[
    "Grundämne kan delas upp i flera ämnen",
    "Grundämne består av ett slags atom, kemisk förening av två eller fler",
    "Kemiska föreningar finns bara i laboratorier",
    "Grundämnen är alltid gaser"
  ], correct:1},
  {text:"4. Vad är en molekyl?", options:[
    "En blandning av olika ämnen",
    "Två eller fler atomer som sitter ihop",
    "Den minsta delen av materia",
    "En atomkärna"
  ], correct:1},
  {text:"5. Av vilka grundämnen består en vattenmolekyl?", options:[
    "En syreatom och en kväveatom",
    "Tre väteatomer",
    "Två väteatomer och en syreatom",
    "Två syreatomer och en väteatom"
  ], correct:2},
  {text:"6. Vad menas med volym?", options:[
    "Hur stor plats något tar upp",
    "Hur mycket något väger",
    "Hur snabbt något rör sig",
    "Hur varmt något är"
  ], correct:0},
  {text:"7. Hur kan du ta reda på volymen av en sten?", options:[
    "Lägga den i ett mätglas med vatten och se hur mycket vattnet stiger",
    "Väg den på en våg",
    "Mäta stenens omkrets",
    "Gissa ungefär storleken"
  ], correct:0},
  {text:"8. Vilka två system finns för volymenheter?", options:[
    "Liter och gallon",
    "Litersystemet och metersystemet",
    "Kilogram och gram",
    "Celsius och Kelvin"
  ], correct:1},
  {text:"9. Vilka enheter i dessa två system är lika mycket värda?", options:[
    "1 liter = 1 cm³",
    "1 liter = 1 dm³ och 1 milliliter = 1 cm³",
    "1 liter = 1 m³",
    "1 liter = 1000 dm³"
  ], correct:1},
  {text:"10. Förklara vad som menas med densitet?", options:[
    "Massan i förhållande till volymen",
    "Hur hårt ett ämne är",
    "Hur mycket plats något tar upp",
    "Hur varmt något är"
  ], correct:0},
  {text:"11. Varför flyter trä på vatten?", options:[
    "För att det är lättare än luft",
    "För att det har lägre densitet än vatten",
    "För att det innehåller luftbubblor",
    "För att det är mjukt"
  ], correct:1},
  {text:"12. Varför kan ett fartyg av järn flyta men en järnspik sjunker?", options:[
    "För att spiken är mindre",
    "För att järn i spikar är tyngre",
    "För att fartygets form gör att det tränger undan mer vatten än det väger",
    "För att fartyget är ihåligt"
  ], correct:2},
  {text:"13. En sten har volymen 12 dm³ och väger 60 kg. Vilken densitet har stenen?", options:[
    "60 kg/dm³",
    "1 kg/dm³",
    "5 kg/dm³",
    "12 kg/dm³"
  ], correct:2},
  {text:"14. Vad mäter man egentligen när man mäter temperaturen i vatten?", options:[
    "Hur mycket syre det finns",
    "Molekylernas rörelse",
    "Vattnets vikt",
    "Hur mycket vatten som finns"
  ], correct:1},
  {text:"15. Varför utvidgar sig ämnen när temperaturen stiger?", options:[
    "Atomerna rör sig snabbare och behöver mer plats",
    "För att massan ökar",
    "För att ämnen blir lättare",
    "För att molekylerna blir fler"
  ], correct:0},
  {text:"16. Vad menas med solkurvor?", options:[
    "När solen värmer havet",
    "När järnvägen expanderar av värme och böjer sig",
    "När solen står lågt vid horisonten",
    "När solens strålar bildar en regnbåge"
  ], correct:1},
  {text:"17. Varför är det livsavgörande för fiskar att vatten har högst densitet vid +4 °C?", options:[
    "För att vattnet då kokar",
    "För att sjöar fryser uppifrån och ned och bottentemperaturen hålls vid +4 °C",
    "För att syret försvinner ur vattnet annars",
    "För att fiskarna får mer mat då"
  ], correct:1},
  {text:"18. Vilka temperaturer är vattnets fryspunkt och kokpunkt?", options:[
    "-100 °C och 0 °C",
    "0 °C och 100 °C",
    "-273 °C och 273 °C",
    "4 °C och 99 °C"
  ], correct:1},
  {text:"19. Vad menas med den absoluta nollpunkten?", options:[
    "-273 °C eller 0 K, när allt står stilla",
    "När vatten fryser",
    "När syre försvinner ur luften",
    "När solen slutar lysa"
  ], correct:0}
];

if(QUESTIONS.length !== NQ) alert("Lärarinfo: Antalet frågor måste vara " + NQ);

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function elt(sel){ return document.querySelector(sel); }

// Timer
let t0 = Date.now(), timerId=null;
function startTimer(){
  function tick(){
    const ms = Date.now() - t0;
    const s = Math.floor(ms/1000), m = Math.floor(s/60), ss = (s%60).toString().padStart(2,"0");
    elt("#timer").textContent = `${m.toString().padStart(2,"0")}:${ss}`;
  }
  timerId = setInterval(tick, 250); tick();
}

function makeQuiz(){
  startTimer();
  const root = elt("#quiz-root");
  let idx = 0;
  const answers = Array(QUESTIONS.length).fill(null);

  function updateProgress(){
    const answered = answers.filter(a=>a!==null).length;
    elt("#progtext").textContent = `${answered}/${NQ} besvarade`;
    const pct = Math.round((answered/NQ)*100);
    elt("#prg").style.width = pct + "%";
  }

  function render(){
    const q = QUESTIONS[idx];
    const indexes = [...q.options.keys()];
    if (SHUFFLE_OPTIONS){
      for(let i=indexes.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [indexes[i],indexes[j]] = [indexes[j],indexes[i]];
      }
    }
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const selected = answers[idx];

    root.innerHTML = `
      <div class="card">
        <div class="badge">Fråga ${idx+1} / ${QUESTIONS.length}</div>
        <div class="quiz-q">${q.text}</div>
        <div class="options"></div>
        <div class="actions">
          <button class="btn" id="prev" ${idx===0?"disabled":""}>◀ Föregående</button>
          <button class="btn" id="next" ${idx===QUESTIONS.length-1?"disabled":""}>Nästa ▶</button>
          <button class="btn btn-primary" id="finish">Slutför & skapa lösenord</button>
        </div>
      </div>
    `;
    const optContainer = elt(".options");
    indexes.forEach((optIdx,i)=>{
      const checked = selected===optIdx ? "checked" : "";
      const label = `${letters[i]}. ${q.options[optIdx]}`;
      optContainer.insertAdjacentHTML("beforeend",
        `<label class="opt"><input type="radio" name="q${idx}" value="${optIdx}" ${checked}>${label}</label>`
      );
    });

    optContainer.addEventListener("change", (e)=>{
      if(e.target && e.target.name===`q${idx}`){
        answers[idx] = parseInt(e.target.value,10);
        updateProgress();
      }
    }, {once:true});
    document.querySelector("#prev").onclick = ()=>{ if(idx>0){ idx--; render(); } };
    document.querySelector("#next").onclick = ()=>{ if(idx<QUESTIONS.length-1){ idx++; render(); } };
    document.querySelector("#finish").onclick = ()=>{
      const res = computePassword(answers);
      showResult(res.password, res.correct);
    };

    updateProgress();
  }

  function computePassword(answers){
    if(SECRET_PASSWORD.length !== NQ) alert("Lärarinfo: Hemligt lösenord måste vara "+NQ+" tecken.");
    const out = []; let allCorrect = true;
    for(let i=0;i<QUESTIONS.length;i++){
      const sel = answers[i];
      if(sel == null){ out.push("*"); allCorrect = false; }
      else if(sel === QUESTIONS[i].correct){ out.push(SECRET_PASSWORD[i]); }
      else{
        const pool = ALPHABET.replaceAll(SECRET_PASSWORD[i], "");
        const ch = pool[i % pool.length]; out.push(ch); allCorrect = false;
      }
    }
    return {password: out.join(""), correct: allCorrect};
  }

  function showResult(password, correct){
    const box = elt("#result");
    box.innerHTML = `
      <div class="card">
        <h2>Lösenord</h2>
        <p><code style="font-weight:800;font-size:20px">${password}</code></p>
        <p class="notice">${correct ? "✅ Helt korrekt! Gå till Valvet." : "⚠️ Inte korrekt. Kontrollera dina svar."}</p>
        <div class="actions">
          <a class="btn btn-ghost" href="vault.html?pwd=${encodeURIComponent(password)}">🔒 Gå till valvet</a>
          <button class="btn" id="copy">Kopiera</button>
        </div>
      </div>`;
    document.querySelector("#copy").onclick = async ()=>{
      try{ await navigator.clipboard.writeText(password); alert("Kopierat!"); }catch(e){ alert(password); }
    };
    try{ localStorage.setItem('skatt_pwd', password); }catch(e){}
    window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
  }

  function showAnswersProtected(){
    const code = prompt("Skriv lärarkoden för att visa facit:");
    if(code !== SHOW_KEY){ alert("Fel kod."); return; }
    const letters = "ABCD";
    let html = "<h2>Facit</h2><ol>";
    for(let i=0;i<QUESTIONS.length;i++){
      html += `<li style="margin-bottom:6px">${QUESTIONS[i].text} – <strong>${letters[QUESTIONS[i].correct]}</strong></li>`;
    }
    html += "</ol>";
    const box = document.createElement("div");
    box.className = "modal";
    box.innerHTML = html + `<div class="actions"><button class="btn" id="closeFacit">Stäng</button></div>`;
    document.body.appendChild(box);
    document.querySelector("#closeFacit").onclick = ()=> box.remove();
  }

  document.getElementById("btnShowAnswers").onclick = showAnswersProtected;

  render();
}

document.addEventListener("DOMContentLoaded", makeQuiz);
