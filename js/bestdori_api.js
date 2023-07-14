// to circumvent CORS restrictions, cors-anywhere proxy hosted on heroku is used to access API

// fetch bestdori API for all cards
async function getBestdoriAllCardsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/cards/all.5.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch bestdori API for all characters
async function getBestdoriAllCharsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/characters/main.3.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch bestdori API for all bands
async function getBestdoriAllBandsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/bands/main.1.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch bestdori API for all costumes
async function getBestdoriAllCostumesAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/costumes/all.5.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch bestdori API for a card by ID
async function getBestdoriCardAPI(id) {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/cards/' + id + '.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch bestdori API for a character by ID
async function getBestdoriCharAPI(id) {
  let url = 'https://koza-rip.herokuapp.com/https://bestdori.com/api/characters/' + id + '.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch all bands
async function getAllBands() {
  let bands = await getBestdoriAllBandsAPI();
  //console.log(bands);
  return bands;
}

// fetch all characters
async function getAllChars() {
  let chars = await getBestdoriAllCharsAPI();
  //console.log(chars);
  return chars;
}

// fetch a single character by ID
async function getCharById(id) {
  let char = await getBestdoriCharAPI(id);
  //console.log(char);
  return char;
}

// fetch a single band by ID
async function getBandById(id) {
  let bands = await getBestdoriAllBandsAPI();
  let band = bands[id].bandName[1];

  //console.log(band);
  return band;
}

// fetch all cards
async function getAllCards() {
  let cards = await getBestdoriAllCardsAPI();
  return cards;
}

// fetch all costumes
async function getAllCostumes() {
  let costumes = await getBestdoriAllCostumesAPI();
  return costumes;
}
