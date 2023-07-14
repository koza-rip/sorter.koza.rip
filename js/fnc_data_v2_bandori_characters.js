// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';

var ary_TitleData = [];

async function titleData() {
  var bands = await getAllBands();
  let bandsID = Object.keys(bands);
  var bandsArr = [];

  for (var i = 0; i < bandsID.length; i++) {
    var bandName = bands[bandsID[i]].bandName[1];
    ary_TitleData.push(bandName);
  }

  return ary_TitleData;
}

// * キャラクター情� �（編集可能。最後の行に”,”を付けないようにしてく�� さい）
// * 使用フラグ（0にするとソートに入りません）,
//   "タイトルID"（先� �から0, 0, 2...）,
//   {タイトル別参�� フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の� �合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [];

async function characterData() {
  var chars = await getAllChars();
  var charsID = Object.keys(chars);

  for (var i = 0; i < charsID.length; i++) {
    var charName = chars[charsID[i]].characterName[1];
    var charNameLower = chars[charsID[i]].firstName[1].toLowerCase();

    var charNickname;
    var charNicknameLower;
    if (chars[charsID[i]].nickname[1]) {
      charNickname = chars[charsID[i]].nickname[1];
      charNicknameLower = charNickname.toLowerCase();
    }

    var charBandID = chars[charsID[i]].bandId;
    var charBandData = getCharBandData(charBandID);

    if (charNicknameLower) {
      var charItem = [0, charNickname, charBandData, bandoriCharImgPath + charNicknameLower + ".webp"];
      ary_CharacterData.push(charItem);
    } else {
      var charItem = [0, charName, charBandData, bandoriCharImgPath + charNameLower + ".webp"];
      ary_CharacterData.push(charItem);
    }
  }
  return shuffle(ary_CharacterData);
}
