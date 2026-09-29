"use strict";

// Generic text-adventure runtime. All Demon-specific text, items, art, and routes
// live in content/demon.json.
let game;
let state;
let resumeState;
let splashTimer;
let choosing = false;

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function defaultState() { return clone(game.playerStart); }

function saveState() { localStorage.setItem(game.meta.saveKey, JSON.stringify(state)); }

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(game.meta.saveKey));
    return { ...defaultState(), ...saved, inventory: saved.inventory ?? defaultState().inventory, flags: saved.flags ?? {} };
  } catch { return defaultState(); }
}

function validateGame(definition) {
  if (!definition?.meta?.saveKey || !definition?.playerStart || !definition?.screens || !definition?.items) {
    throw new Error("The game definition is missing meta, playerStart, items, or screens.");
  }
  if (!definition.screens[definition.playerStart.screen]) throw new Error("The starting screen does not exist.");
  for (const itemId of definition.playerStart.inventory ?? []) {
    if (!definition.items[itemId]) throw new Error(`The starting inventory references an unknown item: '${itemId}'.`);
  }
  const validateEffects = (effects, context) => {
    for (const effect of effects ?? []) {
      if (!["add-item", "remove-item", "change-gold", "change-health", "set-flag"].includes(effect.type)) {
        throw new Error(`${context} uses an unknown effect type.`);
      }
      if (["add-item", "remove-item"].includes(effect.type) && !definition.items[effect.item]) {
        throw new Error(`${context} references an unknown item.`);
      }
    }
  };
  for (const [screenId, screen] of Object.entries(definition.screens)) {
    if (!screen.art?.src || !Array.isArray(screen.text) || !Array.isArray(screen.choices)) {
      throw new Error(`Screen '${screenId}' is incomplete.`);
    }
    for (const choice of screen.choices) {
      if (choice.destination !== "@resume" && !definition.screens[choice.destination]) {
        throw new Error(`Choice '${choice.label}' on '${screenId}' points to an unknown screen.`);
      }
      for (const itemId of choice.requires?.items ?? []) {
        if (!definition.items[itemId]) throw new Error(`Choice '${choice.label}' requires an unknown item.`);
      }
      if (choice.blockedHint !== undefined && typeof choice.blockedHint !== "string") {
        throw new Error(`Choice '${choice.label}' on '${screenId}' has an invalid blocked hint.`);
      }
      validateEffects(choice.effects, `Choice '${choice.label}'`);
    }
    validateEffects(screen.onEnter, `Screen '${screenId}'`);
  }
  return definition;
}

function applyEffects(effects = []) {
  for (const effect of effects) {
    switch (effect.type) {
      case "add-item":
        if (!state.inventory.includes(effect.item)) state.inventory.push(effect.item);
        break;
      case "remove-item":
        state.inventory = state.inventory.filter(item => item !== effect.item);
        break;
      case "change-gold":
        state.gold += effect.amount;
        break;
      case "change-health":
        state.health = Math.max(0, state.health + effect.amount);
        break;
      case "set-flag":
        state.flags[effect.flag] = effect.value;
        break;
      default:
        throw new Error(`Unknown effect type: ${effect.type}`);
    }
  }
}

function meetsRequirements(requires = {}) {
  return (requires.items ?? []).every(item => state.inventory.includes(item)) &&
    (requires.flags ?? []).every(({ flag, value = true }) => state.flags[flag] === value) &&
    (requires.goldAtLeast === undefined || state.gold >= requires.goldAtLeast) &&
    (requires.healthAtLeast === undefined || state.health >= requires.healthAtLeast);
}

function goTo(destination, effects = []) {
  if (destination === "@resume") {
    state = { ...resumeState, screen: ["splash", "introduction"].includes(resumeState.screen) ? game.playerStart.screen : resumeState.screen };
  } else {
    applyEffects(effects);
    state.screen = destination;
    applyEffects(game.screens[state.screen].onEnter);
  }
  choosing = false;
  resumeState = clone(state);
  saveState();
  render();
}

function displayInventory() {
  return state.inventory.map(itemId => game.items[itemId]?.name ?? itemId).join(" · ");
}

function render() {
  window.clearTimeout(splashTimer);
  const screen = game.screens[state.screen];
  const isSplash = state.screen === "splash";
  document.querySelector(".game-shell").classList.toggle("is-splash", isSplash);
  document.querySelector(".game-shell").classList.toggle("is-choosing", choosing && !isSplash);
  const artwork = document.querySelector("#art");
  artwork.src = screen.art.src;
  artwork.alt = screen.art.alt;
  document.querySelector("#location").textContent = screen.location ? `You are standing at ${screen.location}` : "";
  document.querySelector("#narrative").innerHTML = screen.text.map(paragraph => `<p>${paragraph}</p>`).join("");
  document.querySelector("#gold").textContent = state.gold;
  document.querySelector("#health").textContent = "♥ ".repeat(state.health).trim();
  document.querySelector("#inventory").textContent = displayInventory();
  const choices = screen.choices;
  const availableChoices = choices.filter(choice => meetsRequirements(choice.requires));
  const choicePreview = document.querySelector("#choice-preview");
  const firstAvailableChoice = availableChoices[0];
  const firstAvailableNumber = choices.indexOf(firstAvailableChoice) + 1;
  choicePreview.hidden = isSplash || !firstAvailableChoice;
  choicePreview.textContent = firstAvailableChoice
    ? `${firstAvailableNumber}. ${firstAvailableChoice.label}${choices.length > 1 ? " (+ more)" : ""}`
    : "";
  choicePreview.setAttribute("aria-expanded", String(choosing));
  const choiceList = document.querySelector("#choices");
  choiceList.innerHTML = "";
  choices.forEach(choice => {
    const available = meetsRequirements(choice.requires);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = available ? choice.label : `${choice.label} — ${choice.blockedHint ?? "Something is still missing."}`;
    button.disabled = !available;
    if (available) button.addEventListener("click", () => goTo(choice.destination, choice.effects));
    const item = document.createElement("li");
    item.classList.toggle("is-blocked", !available);
    item.append(button);
    choiceList.append(item);
  });
  const choiceToggle = document.querySelector("#choice-toggle");
  choiceToggle.textContent = choosing ? "Read story" : "Choices";
  choiceToggle.setAttribute("aria-expanded", String(choosing));
  if (screen.autoAdvance) {
    splashTimer = window.setTimeout(() => {
      state = { ...resumeState, screen: screen.autoAdvance };
      render();
    }, game.meta.splashDurationMs);
  }
}

function showLoadError(error) {
  document.querySelector("#location").textContent = "Unable to load the adventure";
  document.querySelector("#narrative").innerHTML = `<p>${error.message}</p><p>Run the game through a local web server rather than opening index.html directly.</p>`;
}

async function start() {
  try {
    const response = await fetch("content/demon.json");
    if (!response.ok) throw new Error("The game content file could not be loaded.");
    game = validateGame(await response.json());
    resumeState = loadState();
    state = { ...resumeState, screen: "splash" };
    document.querySelector("#restart").addEventListener("click", () => {
      resumeState = defaultState();
      state = { ...resumeState, screen: "splash" };
      choosing = false;
      render();
    });
    render();
  } catch (error) {
    console.error(error);
    showLoadError(error);
  }
}

document.addEventListener("keydown", event => {
  if (event.target.matches("button")) return;
  const choice = Number(event.key);
  const buttons = document.querySelectorAll("#choices button");
  if (choice < 1 || choice > buttons.length) return;
  if (window.matchMedia("(max-width: 44rem)").matches && !choosing) {
    choosing = true;
    render();
    return;
  }
  if (!buttons[choice - 1].disabled) buttons[choice - 1].click();
});

const mapDialog = document.querySelector("#map-dialog");
document.querySelector("#map-button").addEventListener("click", () => mapDialog.showModal());
document.querySelector("#close-map").addEventListener("click", () => mapDialog.close());
document.querySelector("#choice-toggle").addEventListener("click", () => {
  choosing = !choosing;
  render();
});
document.querySelector("#choice-preview").addEventListener("click", () => {
  choosing = true;
  render();
});

start();
