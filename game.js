"use strict";

const SAVE_KEY = "demon-style-prototype-v1";
// Adjust this one value to change how long the title splash remains on screen.
const SPLASH_DURATION_MS = 3000;

const scenes = {
  splash: {
    location: "",
    autoAdvance: true,
    art: String.raw``,
    text: [],
    choices: []
  },
  introduction: {
    location: "The King's request",
    art: String.raw``,
    text: [
      "The Princess of Gaalway has been kidnapped by the evil Mario Puzo. The King has selected you for the rescue because you were the only person near the palace who owned a sword.",
      "It is a perfectly adequate reason to begin an adventure."
    ],
    choices: [["Continue the adventure", "resume-game"]]
  },
  "city-gates": {
    location: "City Gates",
    art: String.raw`
       |>>>|          |<<<|
      _|   |__________|   |_
     |   THE CITY OF GAALWAY |
     |_______________________|
          /  /      \  \\
         /__/        \__\\`,
    text: [
      "You are standing at the City Gates of Gaalway. The gate is open, which is a surprisingly generous definition of security.",
      "The King has given you 100 gold pieces and a sword to rescue his daughter from the evil Mario Puzo. The sword looks professionally sharp. The plan does not."
    ],
    choices: [
      ["Go up Market Street", "market-street"],
      ["Go down Low Street", "low-street"],
      ["Go down Harbour Street", "harbour-street"],
      ["Get so confused that you walk into the gate", "gate-failure"]
    ]
  },
  "low-street": {
    location: "Low Street",
    art: String.raw`
       _______      _______
      |  PUB  |    |  SHOP |
      |_______|    |_______|
          ||          ||
     =====||==========||=====`,
    text: [
      "Low Street is named after its low buildings, low prices, and the astonishingly low expectations of its town planner.",
      "A small brass object glints beneath a bench. No one is looking, which is how objects traditionally ask to be collected."
    ],
    choices: [
      ["Pick up the brass key", "low-street-key"],
      ["Return to City Gates", "city-gates"],
      ["Go to the Market", "market-street"]
    ]
  },
  "low-street-key": {
    location: "Low Street",
    art: String.raw`
         .-.
        /   \\____
        \\.-/____/==o`,
    text: [
      "You acquire a small brass key. It is labelled: ‘NOT THE PRINCESS KEY’. This is either helpful or the work of a very organised villain.",
      "From the pub doorway, a man applauds politely. ‘Excellent collection technique,’ he says. ‘Seven out of ten. You bent your knees.’"
    ],
    onEnter(state) { if (!state.inventory.includes("Brass key")) state.inventory.push("Brass key"); },
    choices: [
      ["Ask the man who he is", "market-intro"],
      ["Go to the Market", "market-street"],
      ["Return to City Gates", "city-gates"]
    ]
  },
  "market-street": {
    location: "Market Street",
    art: String.raw`
          /\\     /\\     /\\
         /__\\   /__\\   /__\\
         |()|   |##|   |!!|
      ===|__|===|__|===|__|===`,
    text: [
      "Market Street is busy with traders selling turnips, maps of other streets, and one very determined umbrella.",
      "At the centre stands the Gatekeeper, wearing a helmet, a teapot, and the expression of a man interrupted during both lunch and philosophy."
    ],
    choices: [
      ["Ask the Gatekeeper about Mario Puzo", "market-intro"],
      ["Try the locked road towards Heath Lane", "locked-road"],
      ["Go to Low Street", "low-street"],
      ["Return to City Gates", "city-gates"]
    ]
  },
  "market-intro": {
    location: "Market Street",
    art: String.raw`
        _===_
       ( o o )  __
       /|___|\\ /  \\
        /   \\  \__/`,
    text: [
      "‘Mario Puzo?’ says the Gatekeeper. ‘Terrible fellow. Keeps locking roads and calling it interior design.’",
      "He points north. ‘Heath Lane is closed by a tiny, very important lock. You look like someone carrying a key that has an unnecessary label.’"
    ],
    choices: [
      ["Go to the locked road", "locked-road"],
      ["Thank him and return to the market", "market-street"],
      ["Return to City Gates", "city-gates"]
    ]
  },
  "locked-road": {
    location: "Road to Heath Lane",
    art: String.raw`
       ==================
       ||  NO ENTRY!   ||
       ||  VERY TIDY   ||
       ==================
              [__]`,
    text: ["A petite iron gate blocks the way. Its lock is no bigger than a biscuit, though likely less crumbly."],
    choices: [
      ["Use the brass key", "heath-lane", state => state.inventory.includes("Brass key")],
      ["Return to the market", "market-street"]
    ]
  },
  "heath-lane": {
    location: "Heath Lane",
    art: String.raw`
       ~  *  ~  *  ~  *  ~
          THE ROAD OPENS
       ~  *  ~  *  ~  *  ~`,
    text: [
      "The lock clicks open with theatrical reluctance. Beyond it lies Heath Lane—and, at last, the proper adventure.",
      "This is the end of the first small chapter. Mario Puzo remains at large, presumably arranging something unnecessarily complicated."
    ],
    choices: [["Start the chapter again", "city-gates"]]
  },
  "harbour-street": {
    location: "Harbour Street",
    art: String.raw`
          |    |    |
       ~~~~~~~~~~~~~~~~~
          \  _/\\_  /
           \\|____|/`,
    text: ["The harbour smells of salt, rope, and an argument about haddock. A ferryman waves, then charges you a wave fee."],
    choices: [["Return to City Gates", "city-gates"], ["Go to the Market", "market-street"]]
  },
  "gate-failure": {
    location: "City Gates",
    art: String.raw`
            O
           /|\\
           / \\
       ____/ \____`,
    text: ["You become so confused that you walk directly into the gate. The gate wins decisively.", "The Princess remains kidnapped. The gate has no comment."],
    choices: [["Try again, with less gate", "city-gates"]]
  }
};

const sceneImages = {
  splash: ["assets/scenes/title-splash.png", "The open City Gates of Gaalway at dusk."],
  introduction: ["assets/scenes/city-gates.png", "The open City Gates of Gaalway at dusk."],
  "city-gates": ["assets/scenes/city-gates.png", "The open City Gates of Gaalway at dusk."],
  "gate-failure": ["assets/scenes/city-gates.png", "The City Gates of Gaalway, shortly before an avoidable collision."],
  "low-street": ["assets/scenes/low-street.png", "The crooked shops and bench of Low Street."],
  "low-street-key": ["assets/scenes/low-street.png", "A brass key glinting beneath a bench on Low Street."],
  "market-street": ["assets/scenes/market-street.png", "The bustling Market Street of Gaalway."],
  "market-intro": ["assets/scenes/market-street.png", "The Market Street gatekeeper with a helmet and teapot."],
  "locked-road": ["assets/scenes/locked-road.png", "A tiny locked gate blocking the road to Heath Lane."],
  "heath-lane": ["assets/scenes/locked-road.png", "The now-open gate on the road to Heath Lane."],
  "harbour-street": ["assets/scenes/harbour-street.png", "Gaalway's harbour street, with a boat and tall masts."]
};

const defaultState = () => ({ scene: "city-gates", gold: 100, health: 3, inventory: ["Sword"] });
let resumeState = loadState();
let state = { ...resumeState, scene: "splash" };
let splashTimer;

function loadState() {
  try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(SAVE_KEY)) }; }
  catch { return defaultState(); }
}

function saveState() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

function goTo(sceneId) {
  if (sceneId === "resume-game") {
    state = { ...resumeState, scene: ["splash", "introduction"].includes(resumeState.scene) ? "city-gates" : resumeState.scene };
    saveState();
    render();
    return;
  }
  state.scene = sceneId;
  const scene = scenes[sceneId];
  if (scene.onEnter) scene.onEnter(state);
  resumeState = { ...state };
  saveState();
  render();
}

function render() {
  window.clearTimeout(splashTimer);
  const scene = scenes[state.scene];
  const isSplash = state.scene === "splash";
  document.querySelector(".game-shell").classList.toggle("is-splash", isSplash);
  document.querySelector("#controls-hint").textContent = isSplash ? "The adventure begins shortly" : "Press a number or select a choice";
  const [imageSource, imageAlt] = sceneImages[state.scene];
  const artwork = document.querySelector("#art");
  artwork.src = imageSource;
  artwork.alt = imageAlt;
  document.querySelector("#location").textContent = `You are standing at ${scene.location}`;
  document.querySelector("#narrative").innerHTML = scene.text.map(paragraph => `<p>${paragraph}</p>`).join("");
  document.querySelector("#gold").textContent = state.gold;
  document.querySelector("#health").textContent = "♥ ".repeat(state.health).trim();
  document.querySelector("#inventory").textContent = state.inventory.join(" · ");
  const choices = scene.choices.filter(([, , available]) => !available || available(state));
  document.querySelector("#choices").innerHTML = "";
  choices.forEach(([label, destination]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => goTo(destination));
    const item = document.createElement("li");
    item.append(button);
    document.querySelector("#choices").append(item);
  });
  document.querySelector("#prompt").hidden = isSplash;

  if (scene.autoAdvance) {
    splashTimer = window.setTimeout(() => {
      state = { ...resumeState, scene: "introduction" };
      render();
    }, SPLASH_DURATION_MS);
  }
}

document.addEventListener("keydown", event => {
  if (event.target.matches("button")) return;
  const choice = Number(event.key);
  const buttons = document.querySelectorAll("#choices button");
  if (choice >= 1 && choice <= buttons.length) buttons[choice - 1].click();
});

document.querySelector("#restart").addEventListener("click", () => {
  resumeState = defaultState();
  state = { ...resumeState, scene: "splash" };
  render();
});

const mapDialog = document.querySelector("#map-dialog");
document.querySelector("#map-button").addEventListener("click", () => mapDialog.showModal());
document.querySelector("#close-map").addEventListener("click", () => mapDialog.close());

render();
