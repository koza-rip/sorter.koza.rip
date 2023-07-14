// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';

var ary_TitleData = [];

async function titleData() {
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
    ary_TitleData.push(unitName);
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

var vs_chars = [
  ["Hatsune Miku (Leo/need ver.)", vs, "miku_leoni.webp"],
  ["Megurine Luka (Leo/need ver.)", vs, "luka_leoni.webp"],
  ["Kagamine Rin (Leo/need ver.)", vs, "rin_leoni.webp"],
  ["Kagamine Len (Leo/need ver.)", vs, "len_leoni.webp"],
  ["MEIKO (Leo/need ver.)", vs, "meiko_leoni.webp"],
  ["KAITO (Leo/need ver.)", vs, "kaito_leoni.webp"],
  ["Hatsune Miku (MORE MORE JUMP! ver.)", vs, "miku_mmj.webp"],
  ["Megurine Luka (MORE MORE JUMP! ver.)", vs, "luka_mmj.webp"],
  ["Kagamine Rin (MORE MORE JUMP! ver.)", vs, "rin_mmj.webp"],
  ["Kagamine Len (MORE MORE JUMP! ver.)", vs, "len_mmj.webp"],
  ["MEIKO (MORE MORE JUMP! ver.)", vs, "meiko_mmj.webp"],
  ["KAITO (MORE MORE JUMP! ver.)", vs, "kaito_mmj.webp"],
  ["Hatsune Miku (Vivid BAD SQUAD ver.)", vs, "miku_vbs.webp"],
  ["Megurine Luka (Vivid BAD SQUAD ver.)", vs, "luka_vbs.webp"],
  ["Kagamine Rin (Vivid BAD SQUAD ver.)", vs, "rin_vbs.webp"],
  ["Kagamine Len (Vivid BAD SQUAD ver.)", vs, "len_vbs.webp"],
  ["MEIKO (Vivid BAD SQUAD ver.)", vs, "meiko_vbs.webp"],
  ["KAITO (Vivid BAD SQUAD ver.)", vs, "kaito_vbs.webp"],
  ["Hatsune Miku (Wonderlands x Showtime ver.)", vs, "miku_wxs.webp"],
  ["Megurine Luka (Wonderlands x Showtime ver.)", vs, "luka_wxs.webp"],
  ["Kagamine Rin (Wonderlands x Showtime ver.)", vs, "rin_wxs.webp"],
  ["Kagamine Len (Wonderlands x Showtime ver.)", vs, "len_wxs.webp"],
  ["MEIKO (Wonderlands x Showtime ver.)", vs, "meiko_wxs.webp"],
  ["KAITO (Wonderlands x Showtime ver.)", vs, "kaito_wxs.webp"],
  ["Hatsune Miku (Nightcord at 25:00 ver.)", vs, "miku_niigo.webp"],
  ["Megurine Luka (Nightcord at 25:00 ver.)", vs, "luka_niigo.webp"],
  ["Kagamine Rin (Nightcord at 25:00 ver.)", vs, "rin_niigo.webp"],
  ["Kagamine Len (Nightcord at 25:00 ver.)", vs, "len_niigo.webp"],
  ["MEIKO (Nightcord at 25:00 ver.)", vs, "meiko_niigo.webp"],
  ["KAITO (Nightcord at 25:00 ver.)", vs, "kaito_niigo.webp"],
]

async function characterData() {
  var chars = await getAllChars();
  var charsID = Object.keys(chars);

  for (var i = 0; i < charsID.length; i++) {
    var charFirstName = chars[charsID[i]].givenName;
    if (chars[charsID[i]].firstName) {
      var charLastName = chars[charsID[i]].firstName;
      var charName = charFirstName + " " + charLastName;
    } else {
      var charName = charFirstName;
    }
    var charNameLower = charFirstName.toLowerCase();

    var charUnitID = chars[charsID[i]].unit;
    var charUnitData = getCardUnitData(charUnitID);

    var charItem = [0, charName, charUnitData, prosekaCharImgPath + charNameLower + ".webp"];
      ary_CharacterData.push(charItem);
  }

  for (var i = 0; i < vs_chars.length; i++) {
    var charItem = [0, vs_chars[i][0], vs_chars[i][1], prosekaCharImgPath + vs_chars[i][2]];
      ary_CharacterData.push(charItem);
  }

  return shuffle(ary_CharacterData);
}
