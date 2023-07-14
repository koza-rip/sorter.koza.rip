// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';

var ary_TitleDataBands = [];
var ary_TitleDataCardTypes = ["Permanent"];
var ary_TitleDataBandsAndCardTypes = [];

async function titleData() {
  isProseka = true;

  var units = await getAllUnits();
  let unitsID = Object.keys(units);
  let unitsArr = [];
  for (var i = 0; i < unitsID.length; i++) {
    var unitID = parseInt(units[i].seq);
    var unitName = units[i].unitName;
    unitsArr.push([unitID, unitName]);
  }
  unitsArr.sort((a, b) => a[0] - b[0]);

  for (var i = 0; i < unitsID.length; i++) {
    var unitName = unitsArr[i][1];
    ary_TitleDataBands.push(unitName);
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
var permanent = [1];

async function cardData() {
  var characters = await getAllChars();
  var cardsJP = await getAllJPCards();
  var cardsEN = await getAllENCards();
  var cards2s = getAll2sCards();

  // fetch all 4s permanent cards
  function getAll2sCards() {
    let charsID = Object.keys(characters);
    let cardsJPArr = Object.keys(cardsJP);

    var cardsJPID = [];
    for (var i = 0; i < cardsJPArr.length; i++) {
      cardsJPID.push(cardsJP[i].id);
    }

    let cardsENArr = Object.keys(cardsEN);
    var cardsENID = [];
    for (var i = 0; i < cardsENArr.length; i++) {
      cardsENID.push(cardsEN[i].id);
    }

    let cardsArr = [];

    for (var i = 0; i < cardsJPID.length; i++) {
      var cardID = cardsJP[i].id;
      var characterID = cardsJP[i].characterId;
      var cardRarity = cardsJP[i].cardRarityType;
      var cardType = "permanent";

      var cardUnit = characters[characterID - 1].unit;
      var cardSupportUnit = cardsJP[i].supportUnit;

      try {
        if (cardsENID.includes(cardID)) {
          var cardTitle = "\"" + cardsEN[i].prefix + "\"";
        } else {
          var cardTitle = "「" + cardsJP[i].prefix + "」";
        }
      } catch {
        var cardTitle = "「" + cardsJP[i].prefix + "」";
      }

      //if (cardsENID.includes(cardID)) {
      //console.log(cardsEN[i].prefix);
      //var cardTitle = "\"" + cardsEN[i].prefix + "\"";
      //} else {
      //var cardTitle = "「" + cardsJP[i].prefix + "」";
      //}

      var card = [];

      if (cardRarity === "rarity_2") {
        card.push(cardID, characterID, cardRarity, cardTitle, cardType, cardUnit, cardSupportUnit);
        cardsArr.push(card);
      }
    }

    for (var i = 0; i < cardsArr.length; i++) {
      var cardID = parseInt(cardsArr[i][0]);
      var characterID = cardsArr[i][1];
      var cardTitle = cardsArr[i][3];
      var cardUnit = cardsArr[i][5];
      var cardSupportUnit = cardsArr[i][6]

      var character = characters[characterID - 1];

      var charFirstName = character.givenName;
      if (character.firstName) {
        var charLastName = character.firstName;
        var charName = charFirstName + " " + charLastName;
      } else {
        var charName = charFirstName;
      }

      if (cardSupportUnit === "none") {
        var cardUnitData = getCardUnitData(cardUnit);
      } else {
        var cardUnitData = getCardSupportUnitData(cardSupportUnit);
      }

      var unitAndCardTypeData = cardUnitData.concat(permanent);

      var cardItem = [0, charName + " - " + cardTitle, unitAndCardTypeData, prosekaCardImgPath + cardID + ".webp"];
      ary_CardData.push(cardItem);
    }
    return shuffle(ary_CardData);
  }
}
