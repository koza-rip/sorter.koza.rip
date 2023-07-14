// variables
// 0:� �番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 5;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;
var bln_ProgessBar = 1;

// * タイトル情� �（編集可能。最後の行に”,”を付けないようにしてく�� さい）
var int_Colspan = 3;

var isBandori = false;
var isProseka = false;

// bands
var popipa = [1,0,0,0,0,0,0];
var aglow = [0,1,0,0,0,0,0];
var hhw = [0,0,1,0,0,0,0];
var pasupare = [0,0,0,1,0,0,0];
var roselia = [0,0,0,0,1,0,0];
var ras = [0,0,0,0,0,1,0];
var monica = [0,0,0,0,0,0,1];

// units
var vs = [1,0,0,0,0,0];
var vs_leoni = [1,1,0,0,0,0];
var vs_mmj = [1,0,1,0,0,0];
var vs_vbs = [1,0,0,1,0,0];
var vs_wxs = [1,0,0,0,1,0];
var vs_niigo = [1,0,0,0,0,1];

var leoni = [0,1,0,0,0,0];
var mmj = [0,0,1,0,0,0];
var vbs = [0,0,0,1,0,0];
var wxs = [0,0,0,0,1,0];
var niigo = [0,0,0,0,0,1];

// special cards
var bandoriCollabCards = [467, 468, 469, 470, 471, 802, 803, 804, 805, 806, 976, 977, 978, 979, 980, 1061, 1062, 1063, 1064, 1065, 1205, 1206, 1207, 1208, 1209, 1514, 1515, 1516, 1517, 1518, 1597, 1598, 1599, 1634, 1635, 1636, 1637, 1638];
var prosekaCollabCards = [];
var prosekaLimitedCards = [180, 181, 212, 213, 227, 228, 259, 260, 274, 275, 291, 292, 293, 307, 308, 324, 325, 335, 336, 337, 338, 339, 350, 351, 352, 368, 369, 370, 385, 386, 387, 404, 405, 406, 407, 422, 423, 424, 440, 441, 442, 458, 459, 460, 475, 476, 477, 493, 494, 495, 511, 512, 513, 514, 528, 529, 530, 545, 546, 547, 565, 566, 567, 583, 584, 585, 600, 601, 602];
var prosekaColofesCards = [195, 196, 242, 243, 289, 290, 348, 349, 402, 403, 456, 457, 509, 510, 563, 564];

// img paths
var bandoriCardImgPath = "/i/bandori/card/";
var bandoriCharImgPath = "/i/bandori/character/";
var prosekaCardImgPath = "/i/proseka/card/";
var prosekaCharImgPath = "/i/proseka/character/";

// functions
function getCharBandData(id) {
  switch(id) {
    case 1:
      charBandData = popipa;
      break;
    case 2:
      charBandData = aglow;
      break;
    case 3:
      charBandData = hhw;
      break;
    case 4:
      charBandData = pasupare;
      break;
    case 5:
      charBandData = roselia;
      break;
    case 18:
      charBandData = ras;
      break;
    case 21:
      charBandData = monica;
      break;
  }
  return charBandData;
}

function getCardUnitData(id) {
  switch(id) {
    case "light_sound":
      cardUnitData = leoni;
      break;
    case "idol":
      cardUnitData = mmj;
      break;
    case "street":
      cardUnitData = vbs;
      break;
    case "theme_park":
      cardUnitData = wxs;
      break;
    case "school_refusal":
      cardUnitData = niigo;
      break;
    case "piapro":
      cardUnitData = vs;
      break;
  }
  return cardUnitData;
}

function getCardSupportUnitData(id) {
  switch(id) {
    case "light_sound":
      cardUnitData = vs_leoni;
      break;
    case "idol":
      cardUnitData = vs_mmj;
      break;
    case "street":
      cardUnitData = vs_vbs;
      break;
    case "theme_park":
      cardUnitData = vs_wxs;
      break;
    case "school_refusal":
      cardUnitData = vs_niigo;
      break;
    case "piapro":
      cardUnitData = vs;
      break;
  }
  return cardUnitData;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
