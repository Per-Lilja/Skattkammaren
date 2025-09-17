
const SHUFFLE_OPTIONS = false;
const SECRET_PASSWORD = "FYSIKVALVET2025XYZQ";
const NQ = 19;
const SHOW_KEY = "FysikForLife";
// Frågor definieras här
const QUESTIONS = [
  {text:"1. Vilken är enheten för spänning?", options:["Watt (W)","Volt (V)","Ampere (A)","Ohm (Ω)"], correct:1},
  {text:"2. Vilka ämnen är goda ledare av elektrisk ström?", options:["Plast och gummi","Glas och keramik","Metaller","Trä och luft"], correct:2},
  {text:"3. Vad kallas ämnen som inte leder elektrisk ström?", options:["Ledare","Generatorer","Isolatorer","Resistanser"], correct:2},
  {text:"4. Vilken är enheten för strömstyrka?", options:["Ohm (Ω)","Ampere (A)","Volt (V)","Joule (J)"], correct:1},
  {text:"5. Hur ska en ledare vara för att den ska ha liten resistans?", options:["Lång och tunn","Kort och tjock","Kort och tunn","Lång och tjock"], correct:1},
  {text:"6. Vilken är enheten för resistans?", options:["Volt (V)","Ampere (A)","Ohm (Ω)","Watt (W)"], correct:2},
  {text:"7. Vad händer med resistansen i en ledning om den kyls ner?", options:["Den ökar kraftigt","Den minskar","Den blir oändligt stor","Den påverkas inte alls"], correct:1},
  {text:"8. Vilken var Ørsteds viktiga upptäckt?", options:["Att magneter kan flytta föremål på avstånd","Att elektricitet kan skapa magnetism","Att batterier kan lagra energi","Att ljus kan brytas i olika färger"], correct:1},
  {text:"9. Vad är en elektromagnet?", options:["En permanent magnet som alltid är magnetisk","En spole som blir magnetisk när ström går genom den","En magnet som förlorar sin kraft över tid","En magnet som används i kompasser"], correct:1},
  {text:"10. Hur ökar man elektromagnetens styrka?", options:["Använda en kopparplatta i stället för en järnkärna","Göra spolen kortare","Lägga in en järnkärna eller öka ström/antal varv","Använda tunnare tråd"], correct:2},
  {text:"11. Hur ska fem lampor kopplas ihop så att om en av dem går sönder ska de andra fyra slockna?", options:["Som en parallellkoppling","Som en seriekoppling","Kopplas till olika batterier","Med en strömbrytare till varje lampa"], correct:1},
  {text:"12. Hur ska två identiska lampor kopplas till ett batteri så att båda lamporna lyser så starkt som möjligt?", options:["I serie","Med olika batterier","I parallellkoppling","Endast en åt gången"], correct:2},
  {text:"13. Vad vinner man på att parallellkoppla batterier?", options:["Batterierna varar längre","Spänningen blir högre","Strömmen blir svagare","De laddar upp varandra"], correct:0},
  {text:"14. Vad vinner man på att seriekoppla batterier?", options:["Batterierna varar längre","Spänningen blir högre","Strömmen blir svagare","De laddar upp varandra"], correct:1},
  {text:"15. Vad heter instrumentet som mäter ström?", options:["Termometer","Amperemeter","Barometer","Voltmeter"], correct:1},
  {text:"16. Hur visade Faraday att ett magnetfält skapade el?", options:["Han slog två magneter mot varandra","Han använde en järnring med spolar och mätte en ström","Han la en magnet i vatten","Han kopplade en magnet till ett batteri"], correct:1},
  {text:"17. Vad är induktion?", options:["När en magnet tappar sin kraft","När elektroner hoppar mellan två atomer","När rörliga magnetfält skapar elektrisk ström i en ledning","När elektricitet omvandlas till värme"], correct:2},
  {text:"18. Vad heter den apparat som ger elektrisk ström?", options:["Generator","Transformator","Elektromagnet","Kondensator"], correct:0},
  {text:"19. Vilka delar finns i en transformator?", options:["En magnetnål och en spole","En elektromagnet och en induktionsspole","En voltmeter och en amperemeter","En järnkärna och ett batteri"], correct:1}
];
// Resten av quiz-logik återanvänds från tidigare quiz (timer, render, computePassword, showResult, facit)
