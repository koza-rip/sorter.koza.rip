// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';

var ary_TitleDataBands = [];
var ary_TitleDataCardTypes = ["Costume Shop", "Crystal Shop", "Event", "Limited Event", "Premium Gift Gacha", "Premium Mission Pass", "Men", "Ladies"];
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

  ary_TitleDataBands.push("No Unit");

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
var costumeData = [];

Papa.parse("https://sorter.koza.rip/csv/proseka_costumes.csv", {
	download: true,
	complete: function(results) {
    console.log(results);
    for (var i = 1; i < results.data.length; i++) {
      var costumeData = [];
      var ary_CardData1 = [];

      for (var j = 1; j < 16; j++) {
        costumeData.push(parseInt(results.data[i][j]));
      }
      //costumeData.push(costumeData1);
      ary_CardData1.push(0, results.data[i][0], costumeData, results.data[i][16]);

      ary_CardData.push(ary_CardData1);
    }
    console.log(costumeData);
    console.log(ary_CardData);
	}
});

async function cardData() {
  shuffle(ary_CardData);
  return ary_CardData;
}
