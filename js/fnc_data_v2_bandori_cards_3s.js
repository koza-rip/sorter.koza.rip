// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';

var ary_TitleDataBands = [];
var ary_TitleDataCardTypes = ["Permanent", "Limited", "Event", "Collab"];
var ary_TitleDataBandsAndCardTypes = [];

async function titleData() {
  isBandori = true;

  var bands = await getAllBands();
  let bandsID = Object.keys(bands);

  for (var i = 0; i < bandsID.length; i++) {
    var bandName = bands[bandsID[i]].bandName[1];
    ary_TitleDataBands.push(bandName);
  }

  ary_TitleDataBandsAndCardTypes = ary_TitleDataBands.concat(ary_TitleDataCardTypes);

  return ary_TitleDataBandsAndCardTypes;
}

// * キャラクター情� �（編集可能。最後の行に”,”を付けないようにしてく�� さい）
// * 使用フラグ（0にするとソートに入りません）,
//   "タイトルID"（先� �から0, 0, 2...）,
//   {タイトル別参�� フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の� �合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,

var ary_CardData = [];

// card types
var permanent = [1,0,0,0];
var limited = [0,1,0,0];
var eventCard = [0,0,1,0];
var collab = [0,0,0,1];

async function cardData() {
  var characters = await getAllChars();
  var cards = await getAllCards();
  var cardsPerm = await getAll3sPermCards();
  var cardsEvent = await getAll3sEventCards();
  var cardsLim = await getAll3sLimCards();

  // fetch all 3s permanent cards
  async function getAll3sPermCards() {
    let charsID = Object.keys(characters);
    let cardsID = Object.keys(cards);
    let cardsArr = [];

    for (var i = 0; i < cardsID.length; i++) {
      var cardID = cardsID[i];
      var characterID = cards[cardsID[i]].characterId;
      var cardRarity = cards[cardsID[i]].rarity;
      var cardType = cards[cardsID[i]].type;

      if (cards[cardsID[i]].prefix[1]) {
        var cardTitle = "\"" + cards[cardsID[i]].prefix[1] + "\"";
      } else {
        var cardTitle = "「" + cards[cardsID[i]].prefix[0] + "」";
      }

      var card = [];

      if (cardRarity === 3 && cardType === "permanent") {
        card.push(cardID, characterID, cardRarity, cardTitle, cardType);
        cardsArr.push(card);
      }
    }

    for (var i = 0; i < cardsArr.length; i++) {
      var cardID = parseInt(cardsArr[i][0]);
      var characterID = cardsArr[i][1];
      var cardTitle = cardsArr[i][3];

      var character = characters[characterID];

      var charName = character.characterName[1];

      var charNickname;

      if (character.nickname[1]) {
        charNickname = character.nickname[1];
      }

      var charBandID = character.bandId;
      var charBandData = getCharBandData(charBandID);

      var bandAndCardTypeData = charBandData.concat(permanent);

      if (character.nickname[1]) {
        var cardItem = [0, charNickname + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      } else {
        var cardItem = [0, charName + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      }
    }
    return shuffle(ary_CardData);
  }

  // fetch all 3s limited cards
  async function getAll3sLimCards() {
    let charsID = Object.keys(characters);
    let cardsID = Object.keys(cards);
    let cardsArr = [];

    for (var i = 0; i < cardsID.length; i++) {
      var cardID = cardsID[i];
      var characterID = cards[cardsID[i]].characterId;
      var cardRarity = cards[cardsID[i]].rarity;
      var cardType = cards[cardsID[i]].type;

      if (cards[cardsID[i]].prefix[1]) {
        var cardTitle = "\"" + cards[cardsID[i]].prefix[1] + "\"";
      } else {
        var cardTitle = "「" + cards[cardsID[i]].prefix[0] + "」";
      }

      var card = [];

      if (cardRarity === 3 && cardType === "limited") {
        card.push(cardID, characterID, cardRarity, cardTitle, cardType);
        cardsArr.push(card);
      }
    }

    for (var i = 0; i < cardsArr.length; i++) {
      var cardID = parseInt(cardsArr[i][0]);
      var characterID = cardsArr[i][1];
      var cardTitle = cardsArr[i][3];

      var character = characters[characterID];

      var charName = character.characterName[1];

      var charNickname;

      if (character.nickname[1]) {
        charNickname = character.nickname[1];
      }

      var charBandID = character.bandId;
      var charBandData = getCharBandData(charBandID);

      if (bandoriCollabCards.includes(cardID)) {
        var bandAndCardTypeData = charBandData.concat(collab);
      } else {
        var bandAndCardTypeData = charBandData.concat(limited);
      }

      if (character.nickname[1]) {
        var cardItem = [0, charNickname + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      } else {
        var cardItem = [0, charName + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      }
    }
    return shuffle(ary_CardData);
  }

  // fetch all 3s event cards
  async function getAll3sEventCards() {
    let charsID = Object.keys(characters);
    let cardsID = Object.keys(cards);
    let cardsArr = [];

    for (var i = 0; i < cardsID.length; i++) {
      var cardID = cardsID[i];
      var characterID = cards[cardsID[i]].characterId;
      var cardRarity = cards[cardsID[i]].rarity;
      var cardType = cards[cardsID[i]].type;

      if (cards[cardsID[i]].prefix[1]) {
        var cardTitle = "\"" + cards[cardsID[i]].prefix[1] + "\"";
      } else {
        var cardTitle = "「" + cards[cardsID[i]].prefix[0] + "」";
      }

      var card = [];

      if (cardRarity === 3 && cardType === "event") {
        card.push(cardID, characterID, cardRarity, cardTitle, cardType);
        cardsArr.push(card);
      }
    }

    for (var i = 0; i < cardsArr.length; i++) {
      var cardID = parseInt(cardsArr[i][0]);
      var characterID = cardsArr[i][1];
      var cardTitle = cardsArr[i][3];

      var character = characters[characterID];

      var charName = character.characterName[1];

      var charNickname;

      if (character.nickname[1]) {
        charNickname = character.nickname[1];
      }

      var charBandID = character.bandId;
      var charBandData = getCharBandData(charBandID);

      if (bandoriCollabCards.includes(cardID)) {
        var bandAndCardTypeData = charBandData.concat(collab);
      } else {
        var bandAndCardTypeData = charBandData.concat(eventCard);
      }

      if (character.nickname[1]) {
        var cardItem = [0, charNickname + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      } else {
        var cardItem = [0, charName + " - " + cardTitle, bandAndCardTypeData, bandoriCardImgPath + cardID + ".webp"];
        ary_CardData.push(cardItem);
      }
    }
    return shuffle(ary_CardData);
  }
}
