// to circumvent CORS restrictions, cors-anywhere proxy hosted on heroku is used to access API

// fetch sekai viewer API for all JP cards
async function getSekaiViewerAllJPCardsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://sekai-world.github.io/sekai-master-db-diff/cards.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch sekai viewer API for all EN cards
async function getSekaiViewerAllENCardsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://sekai-world.github.io/sekai-master-db-en-diff/cards.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch sekai viewer API for all characters
async function getSekaiViewerAllCharsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://sekai-world.github.io/sekai-master-db-en-diff/gameCharacters.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch sekai viewer API for all units
async function getSekaiViewerAllUnitsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://sekai-world.github.io/sekai-master-db-en-diff/unitProfiles.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch sekai viewer API for all card skills
async function getSekaiViewerAllSkillsAPI() {
  let url = 'https://koza-rip.herokuapp.com/https://sekai-world.github.io/sekai-master-db-diff/skills.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// fetch all units
async function getAllUnits() {
  let units = await getSekaiViewerAllUnitsAPI();
  return units;
}

// fetch all characters
async function getAllChars() {
  let chars = await getSekaiViewerAllCharsAPI();
  return chars;
}

// fetch all JP cards
async function getAllJPCards() {
  let cards = await getSekaiViewerAllJPCardsAPI();
  return cards;
}

// fetch all EN cards
async function getAllENCards() {
  let cards = await getSekaiViewerAllENCardsAPI();
  return cards;
}

// fetch all card skills
async function getAllSkills() {
  let skills = await getSekaiViewerAllSkillsAPI();
  return skills;
}
