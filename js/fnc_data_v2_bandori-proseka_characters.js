// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo';

str_ImgPath = '';
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
var ary_TitleData = [
   "Poppin'Party",
   "Afterglow",
   "Pastel Palettes",
   "Roselia",
   "Hello, Happy World!",
   "RAISE A SUILEN",
   "Morfonica",
   "Leo/need",
   "MORE MORE JUMP!",
   "Vivid BAD SQUAD",
   "Wonderlands x Showtime",
   "Nightcord at 25:00",
];

async function titleData() {
  return ary_TitleData;
}

// * キャラクター情� �（編集可能。最後の行に”,”を付けないようにしてく�� さい）
// * 使用フラグ（0にするとソートに入りません）,
//   "タイトルID"（先� �から0, 0, 2...）,
//   {タイトル別参�� フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の� �合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [

   [0, "Toyama Kasumi",		[1,0,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/kasumi.webp"],
   [0, "Hanazono Tae",		[1,0,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/tae.webp"],
   [0, "Ushigome Rimi",		[1,0,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/rimi.webp"],
   [0, "Yamabuki Saya",		[1,0,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/saya.webp"],
   [0, "Ichigaya Arisa",	[1,0,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/arisa.webp"],

   [0, "Mitake Ran",		[0,1,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/ran.webp"],
   [0, "Aoba Moca",			[0,1,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/moca.webp"],
   [0, "Uehara Himari",		[0,1,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/himari.webp"],
   [0, "Udagawa Tomoe",		[0,1,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/tomoe.webp"],
   [0, "Hazawa Tsugumi",	[0,1,0,0,0,0,0,0,0,0,0,0], "../i/bandori/character/tsugumi.webp"],

   [0, "Maruyama Aya",		[0,0,1,0,0,0,0,0,0,0,0,0], "../i/bandori/character/aya.webp"],
   [0, "Hikawa Hina",		[0,0,1,0,0,0,0,0,0,0,0,0], "../i/bandori/character/hina.webp"],
   [0, "Shirasagi Chisato",	[0,0,1,0,0,0,0,0,0,0,0,0], "../i/bandori/character/chisato.webp"],
   [0, "Yamato Maya",		[0,0,1,0,0,0,0,0,0,0,0,0], "../i/bandori/character/maya.webp"],
   [0, "Wakamiya Eve",		[0,0,1,0,0,0,0,0,0,0,0,0], "../i/bandori/character/eve.webp"],

   [0, "Minato Yukina",		[0,0,0,1,0,0,0,0,0,0,0,0], "../i/bandori/character/yukina.webp"],
   [0, "Hikawa Sayo",		[0,0,0,1,0,0,0,0,0,0,0,0], "../i/bandori/character/sayo.webp"],
   [0, "Imai Lisa",			[0,0,0,1,0,0,0,0,0,0,0,0], "../i/bandori/character/lisa.webp"],
   [0, "Udagawa Ako",		[0,0,0,1,0,0,0,0,0,0,0,0], "../i/bandori/character/ako.webp"],
   [0, "Shirogane Rinko",	[0,0,0,1,0,0,0,0,0,0,0,0], "../i/bandori/character/rinko.webp"],

   [0, "Tsurumaki Kokoro",	[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/kokoro.webp"],
   [0, "Seta Kaoru",		[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/kaoru.webp"],
   [0, "Kitazawa Hagumi",	[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/hagumi.webp"],
   [0, "Matsubara Kanon",	[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/kanon.webp"],
   [0, "Okusawa Misaki",	[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/misaki.webp"],
   [0, "Michelle",			[0,0,0,0,1,0,0,0,0,0,0,0], "../i/bandori/character/michelle.webp"],

   [0, "Wakana Rei",		[0,0,0,0,0,1,0,0,0,0,0,0], "../i/bandori/character/layer.webp"],
   [0, "Asahi Rokka",		[0,0,0,0,0,1,0,0,0,0,0,0], "../i/bandori/character/lock.webp"],
   [0, "Satou Masuki",		[0,0,0,0,0,1,0,0,0,0,0,0], "../i/bandori/character/masking.webp"],
   [0, "Nyubara Reona",		[0,0,0,0,0,1,0,0,0,0,0,0], "../i/bandori/character/pareo.webp"],
   [0, "Tamade Chiyu",		[0,0,0,0,0,1,0,0,0,0,0,0], "../i/bandori/character/chuchu.webp"],

   [0, "Kurata Mashiro",	[0,0,0,0,0,0,1,0,0,0,0,0], "../i/bandori/character/mashiro.webp"],
   [0, "Kirigaya Toko",		[0,0,0,0,0,0,1,0,0,0,0,0], "../i/bandori/character/toko.webp"],
   [0, "Hiromachi Nanami",	[0,0,0,0,0,0,1,0,0,0,0,0], "../i/bandori/character/nanami.webp"],
   [0, "Futaba Tsukushi",	[0,0,0,0,0,0,1,0,0,0,0,0], "../i/bandori/character/tsukushi.webp"],
   [0, "Yashio Rui",		[0,0,0,0,0,0,1,0,0,0,0,0], "../i/bandori/character/rui.webp"],

   [0, "Hoshino Ichika",	[0,0,0,0,0,0,0,1,0,0,0,0], "../i/proseka/character/ichika.webp"],
   [0, "Tenma Saki",		[0,0,0,0,0,0,0,1,0,0,0,0], "../i/proseka/character/saki.webp"],
   [0, "Mochizuki Honami",	[0,0,0,0,0,0,0,1,0,0,0,0], "../i/proseka/character/honami.webp"],
   [0, "Hinomori Shiho",	[0,0,0,0,0,0,0,1,0,0,0,0], "../i/proseka/character/shiho.webp"],

   [0, "Hanasato Minori",	[0,0,0,0,0,0,0,0,1,0,0,0], "../i/proseka/character/minori.webp"],
   [0, "Kiritani Haruka",	[0,0,0,0,0,0,0,0,1,0,0,0], "../i/proseka/character/haruka.webp"],
   [0, "Momoi Airi",		[0,0,0,0,0,0,0,0,1,0,0,0], "../i/proseka/character/airi.webp"],
   [0, "Hinomori Shizuku",	[0,0,0,0,0,0,0,0,1,0,0,0], "../i/proseka/character/shizuku.webp"],

   [0, "Azusawa Kohane",	[0,0,0,0,0,0,0,0,0,1,0,0], "../i/proseka/character/kohane.webp"],
   [0, "Shiraishi An",		[0,0,0,0,0,0,0,0,0,1,0,0], "../i/proseka/character/an.webp"],
   [0, "Shinonome Akito",	[0,0,0,0,0,0,0,0,0,1,0,0], "../i/proseka/character/akito.webp"],
   [0, "Aoyagi Toya",		[0,0,0,0,0,0,0,0,0,1,0,0], "../i/proseka/character/toya.webp"],

   [0, "Tenma Tsukasa",		[0,0,0,0,0,0,0,0,0,0,1,0], "../i/proseka/character/tsukasa.webp"],
   [0, "Otori Emu",			[0,0,0,0,0,0,0,0,0,0,1,0], "../i/proseka/character/emu.webp"],
   [0, "Kusanagi Nene",		[0,0,0,0,0,0,0,0,0,0,1,0], "../i/proseka/character/nene.webp"],
   [0, "Kamishiro Rui",		[0,0,0,0,0,0,0,0,0,0,1,0], "../i/proseka/character/rui.webp"],

   [0, "Yoisaki Kanade",	[0,0,0,0,0,0,0,0,0,0,0,1], "../i/proseka/character/kanade.webp"],
   [0, "Asahina Mafuyu",	[0,0,0,0,0,0,0,0,0,0,0,1], "../i/proseka/character/mafuyu.webp"],
   [0, "Shinonome Ena",		[0,0,0,0,0,0,0,0,0,0,0,1], "../i/proseka/character/ena.webp"],
   [0, "Akiyama Mizuki",	[0,0,0,0,0,0,0,0,0,0,0,1], "../i/proseka/character/mizuki.webp"],
];

async function characterData() {
  shuffle(ary_CharacterData);
  return ary_CharacterData;
}
