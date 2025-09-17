// Samma funktionalitet som original-quizet: timer, progress, skyddad facit-knapp
const SHUFFLE_OPTIONS = false;              // sätt true om du vill blanda
const SECRET_PASSWORD = "FYSIKVALVET2025XYZQ"; // behåll samma hemliga lösenord (19 tecken) så funkar samma valv
const NQ = 19;
const SHOW_KEY = "FysikForLife";            // kod för att visa facit

const QUESTIONS = [
  {text:"1. Vilken är enheten för spänning?", options:[
    "Watt (W)",
    "Volt (V)",
    "Ampere (A)",
    "Ohm (Ω)"
  ], correct:1},
  {text:"2. Vilka ämnen är goda ledare av elektrisk ström?", options:[
    "Plast och gummi",
    "Glas och keramik",
    "Metaller",
    "Trä och luft"
  ], correct:2},
  {text:"3. Vad kallas ämnen som inte leder elektrisk ström?", options:[
    "Ledare",
    "Generatorer",
    "Isolatorer",
    "Resistanser"
  ], correct:2},
  {text:"4. Vilken är enheten för strömstyrka?", options:[
    "Ohm (Ω)",
    "Ampere (A)",
    "Volt (V)",
    "Joule (J)"
  ], correct:1},
  {text:"5. Hur ska en ledare vara för att den ska ha liten resistans?", options:[
    "Lång och tunn",
    "Kort och tjock",
    "Kort och tunn",
    "Lång och tjock"
  ], correct:1},
  {text:"6. Vilken är enheten för resistans?", options:[
    "Volt (V)",
    "Ampere (A)",
    "Ohm (Ω)",
    "Watt (W)"
  ], correct:2},
  {text:"7. Vad händer med resistansen i en ledning om den kyls ner?", options:[
    "Den ökar kraftigt",
    "Den minskar",
    "Den blir oändligt stor",
    "Den påverkas inte alls"
  ], correct:1},
  {text:"8. Vilken var Ørsteds viktiga upptäckt?", options:[
    "Att magneter kan flytta föremål på avstånd",
    "Att elektricitet kan skapa magnetism",
    "Att batterier kan lagra energi",
    "Att ljus kan brytas i olika färger"
  ], correct:1},
  {text:"9. Vad är en elektromagnet?", options:[
    "En permanent magnet som alltid är magnetisk",
    "En spole som blir magnetisk när ström går genom den",
    "En magnet som förlorar sin kraft över tid",
    "En magnet som används i kompasser"
  ], correct:1},
  {text:"10. Hur ökar man elektromagnetens styrka?", options:[
    "Använda en kopparplatta i stället för en järnkärna",
    "Göra spolen kortare",
    "Lägga in en järnkärna eller öka ström/antal varv",
    "Använda tunnare tråd"
  ], correct:2},
  {text:"11. Hur ska fem lampor kopplas ihop så att om en av dem går sönder ska de andra fyra slockna?", options:[
    "Som en parallellkoppling",
    "Som en seriekoppling",
    "Kopplas till olika batterier",
    "Med en strömbrytare till varje lampa"
  ], correct:1},
  {text:"12. Hur ska två identiska lampor kopplas till ett batteri så att båda lamporna lyser så starkt som möjligt?", options:[
    "I serie",
    "Med olika batterier",
    "I parallellkoppling",
    "Endast en åt gången"
  ], correct:2},
  {text:"13. Vad vinner man på att parallellkoppla batterier?", options:[
    "Batterierna varar längre",
    "Spänningen blir högre",
    "Strömmen blir svagare",
    "De laddar upp varandra"
  ], correct:0},
  {text:"14. Vad vinner man på att seriekoppla batterier?", options:[
    "Batterierna varar längre",
    "Spänningen blir högre",
    "Strömmen blir svagare",
    "De laddar upp varandra"
  ], correct:1},
  {text:"15. Vad heter instrumentet som mäter ström?", options:[
    "Termometer",
    "Amperemeter",
    "Barometer",
    "Voltmeter"
  ], correct:1},
  {text:"16. Hur visade Faraday att ett magnetfält skapade el?", options:[
    "Han slog två magneter mot varandra",
    "Han använde en järnring med spolar och mätte en ström",
    "Han la en magnet i vatten",
    "Han kopplade en magnet till ett batteri"
  ], correct:1},
  {text:"17. Vad är induktion?", options:[
    "När en magnet tappar sin kraft",
    "När elektroner hoppar mellan två atomer",
    "När rörliga magnetfält skapar elektrisk ström i en ledning",
    "När elektricitet omvandlas till värme"
  ], correct:2},
  {text:"18. Vad heter den apparat som ger elektrisk ström?", options:[
    "Generator",
    "Transformator",
    "Elektromagnet",
    "Kondensator"
  ], correct:0},
  {text:"19. Vilka delar finns i en transformator?", options:[
    "En magnetnål och en spole",
    "En elektromagnet och en induktionsspole",
    "En voltmeter och en amperemeter",
    "En järnkärna och ett batteri"
  ], correct:1},
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
    const t = elt("#timer"); if(t) t.textContent = `${m.toString().padStart(2,"0")}:${ss}`;
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
    const txt = elt("#progtext"); if (txt) txt.textContent = `${answered}/${NQ} besvarade`;
    const pct = Math.round((answered/NQ)*100);
    const bar = elt("#prg"); if (bar) bar.style.width = pct + "%";
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
    document.querySelector("#finish").onclick = ()=>{ const res = computePassword(answers); showResult(res.password, res.correct); };

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
          <a class="btn btn-ghost" href="vault.html">🔒 Gå till valvet</a>
          <button class="btn" id="copy">Kopiera</button>
        </div>
      </div>`;
    const copy = document.querySelector("#copy");
    if(copy) copy.onclick = async ()=>{
      try{ await navigator.clipboard.writeText(password); alert("Kopierat!"); }catch(e){ alert(password); }
    };
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
