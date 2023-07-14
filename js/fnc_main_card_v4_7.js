// 2008/7/3 Scripted by K-Factory@migiwa
// 2008/7/19 Modified by  K-Factory@migiwa
// ・イラストのランダム化
// ・BugFix
// 2008/7/25 Modified by  K-Factory@migiwa
// ・ランキングにイラスト表示
// ・メンテナンス用PG追加
// ・BugFix
// 2009/1/27 Modified by  K-Factory@migiwa
// ・絵の表示ON/OFF追加
// ・高速化処理追加
// 2009/9/8 Modified by  K-Factory@migiwa
// ・タイトル分類の変更
// 2013/1/22 Modified by Anonymous
// added undo function (requires minor changes in index.html and fnc_data.js)

// 実行コードです。
// 修正する場合は気をつけてください。
var ary_TempData   = new Array();
var ary_SortData   = new Array();
var ary_ParentData = new Array();
var ary_EqualData  = new Array();
var int_LeftList,  int_LeftID;
var int_RightList, int_RightID;
var ary_RecordData = new Array();
var int_RecordID = 0;

var csort = new Array();
var csort2 = new Array();
var csort3 = new Array();
var csort4 = new Array();
var csort5 = new Array();
var csort6 = new Array();

var int_Count = 0;
var int_Total = 0;
var int_Completed = 0;
var int_Status = 0;
var sID = 'GaGprog';
var iGM = 100;

var back_ary_SortData = new Array();
var back_ary_EqualData = new Array();
var back_ary_RecordData = new Array();
var back_int_RecordID = 0;
//var back_ary_TempData = new Array();
var back_ary_ParentData = new Array();

var back_int_Completed = 0;
var back_int_Total = 0;
var back_int_RightList = int_RightList;
var back_int_RightID = int_RightID;
var back_int_LeftList = int_LeftList;
var back_int_LeftID = int_LeftID;

var optSelArr = [];
var totalCards = 0;

// *****************************************************************************
// * StartUp
// * <BODY>タグの読み込み終了時に実行。
async function startup() {
  const loader = document.querySelector('#loader');

  loader.style.display = 'block';
  await titleData();
  loader.style.display = 'none';

   var tbl_Select = gID('optTable');
   var tbl_body_Select = cE('tbody');
   tbl_Select.appendChild(tbl_body_Select);

   // band header row
   var new_row = tbl_body_Select.insertRow(tbl_body_Select.rows.length);
   var new_cell = new_row.insertCell(new_row.childNodes.length);
   new_cell.className = 'optTableHeaders';
   new_cell.setAttribute('colspan', int_Colspan, 0);
   var new_span = cE('span');
   new_span.class = 'optTableHeaders';
   if (isProseka) {
     new_span.appendChild(cT("Units"));
   } else {
     new_span.appendChild(cT("Bands"));
   }
   new_cell.appendChild(new_span);

   // タイトルから選択用チェックボックスに変換
   for (i=0; i<ary_TitleDataBands.length; i++) {
      // Row[i]
      if ((i % int_Colspan) == 0) {
         var new_row = tbl_body_Select.insertRow(tbl_body_Select.rows.length);
         new_row.id = 'optSelRowBands' + i;
      }
      // Col[0]
      var new_cell = new_row.insertCell(new_row.childNodes.length);
      new_cell.className = 'optSelCol';
      var new_CheckBox = cE('input');
      new_CheckBox.setAttribute('type', 'checkbox', 0);
      new_CheckBox.setAttribute('checked', 'true', 0);
      new_CheckBox.value = ary_TitleDataBands[i];
      new_CheckBox.title = ary_TitleDataBands[i];
      new_CheckBox.id = 'optSelect' + i;
      optSelArr.push('optSelect' + i);
      new_cell.appendChild(new_CheckBox);

      var new_span = cE('span');
      new_span.appendChild(cT(ary_TitleDataBands[i]));
      new_span.title = ary_TitleDataBands[i];
      new_span.id = i;
      sC(new_span, 'cbox');
      new_span.onclick = function() {chgFlag(this.id);}
      new_cell.appendChild(new_span);
   }

   // card type header row
   var new_row = tbl_body_Select.insertRow(tbl_body_Select.rows.length);
   var new_cell = new_row.insertCell(new_row.childNodes.length);
   new_cell.className = 'optTableHeaders';
   new_cell.setAttribute('colspan', int_Colspan, 0);
   var new_span = cE('span');
   new_span.class = 'optTableHeaders';
   if (isProseka) {
     new_span.appendChild(cT("Costume Types"));
   } else {
     new_span.appendChild(cT("Card Types"));
   }
   new_cell.appendChild(new_span);

   for (i=0; i<ary_TitleDataCardTypes.length; i++) {
      // Row[i]
      if ((i % int_Colspan) == 0) {
         var new_row = tbl_body_Select.insertRow(tbl_body_Select.rows.length);
         new_row.id = 'optSelRowBands' + (i + ary_TitleDataBands.length);
      }
      // Col[0]
      var new_cell = new_row.insertCell(new_row.childNodes.length);
      new_cell.className = 'optSelCol';
      var new_CheckBox = cE('input');
      new_CheckBox.setAttribute('type', 'checkbox', 0);
      new_CheckBox.setAttribute('checked', 'true', 0);
      new_CheckBox.value = ary_TitleDataCardTypes[i];
      new_CheckBox.title = ary_TitleDataCardTypes[i];
      new_CheckBox.id = 'optSelect' + (i + ary_TitleDataBands.length);
      optSelArr.push('optSelect' + (i + ary_TitleDataBands.length));
      new_cell.appendChild(new_CheckBox);

      var new_span = cE('span');
      new_span.appendChild(cT(ary_TitleDataCardTypes[i]));
      new_span.title = ary_TitleDataCardTypes[i];
      new_span.id = (i + ary_TitleDataBands.length);
      sC(new_span, 'cbox');
      new_span.onclick = function() {chgFlag(this.id);}
      new_cell.appendChild(new_span);
   }

   gID('optImage').disabled = false;

   var tbl_foot_Select = cE('tfoot');
   tbl_Select.appendChild(tbl_foot_Select);

   // Row[0]
   new_row = tbl_foot_Select.insertRow(tbl_foot_Select.rows.length);
   sC(new_row, "opt_foot");

   new_cell = new_row.insertCell(new_row.childNodes.length);
   new_cell.className = 'optTableSelectAll';
   new_cell.setAttribute('colspan', int_Colspan, 0);
   var new_CheckBox = cE('input');
   new_CheckBox.setAttribute('type', 'checkbox', 0);
   new_CheckBox.setAttribute('checked', 'true', 0);
   new_CheckBox.value = "All";
   new_CheckBox.title = "All boxes are checked/unchecked at the same time.";
   new_CheckBox.id = 'optSelect_all';
   new_CheckBox.onclick = function() {chgAll();}
   new_cell.appendChild(new_CheckBox);

   new_span = cE('span');
   new_span.appendChild(cT("Select All"));
   new_cell.appendChild(new_span);


   if (!bln_ProgessBar) fCG(sID, iGM, iGM);
}

function chgAll() {
  for (i=0; i<ary_TitleDataBandsAndCardTypes.length; i++) {
     gID('optSelect' + i).checked = gID('optSelect_all').checked;
  }
}

// *****************************************************************************
// * chgFlag
// * タイトル名がクリックされてもチェックボックスを変更する。
function chgFlag(int_id) {
   var obj_Check = gID('optSelect' + int_id);
   if (!obj_Check.disabled) {
      obj_Check.checked = (obj_Check.checked) ? false :true;
   }

   //var obj_Check_Card_Type = gID('optSelectCardType' + int_id);
   //if (!obj_Check_Card_Type.disabled) {
      //obj_Check_Card_Type.checked = (obj_Check_Card_Type.checked) ? false :true;
   //}
}

// *****************************************************************************
// * Initialize
// * 使用する配列や、カウンターを初期化する
// * 初回のみ動作。
async function init(){
   int_Total = 0;
   int_RecordID = 0;

   await cardData();
   ary_TitleDataBandsAndCardTypes = ary_TitleDataBands.concat(ary_TitleDataCardTypes);
   //console.log(optSelArr);
   //console.log(ary_TitleDataBandsAndCardTypes);

   //console.log(ary_CardData);

   // ソート対象のみを抽出
   for (i=0; i<ary_CardData.length; i++) {
      for (j=0; j<ary_TitleDataBandsAndCardTypes.length; j++) {
        //console.log(gID(optSelArr[j]));
         if (gID('optSelect' + j).checked && (ary_CardData[i][2][j] == 1)) {
            ary_TempData[int_Total] = ary_CardData[i];
            int_Total++;
            totalCards++;
            break;
         }
      }
   }

   if (int_Total == 0) {
      alert("Please make a selection.");
      return;
   } else {
      for (i=0; i<ary_TitleDataBandsAndCardTypes.length; i++) {
        gID('optSelect' + i).disabled = true;
        gID('optSelect' + i).style.dsiplay = 'none';
      }
      gID('optImage').disabled = true;
      gID('optAgony').disabled = true;
   }

   int_Total = 0;

   // ソート配列にIDを格納する
   ary_SortData[0] = new Array();
   for (i=0; i<ary_TempData.length; i++) {
      ary_SortData[0][i] = i;

      // 保存用配列
      ary_RecordData[i] = 0;
   }

   var int_Pointer = 1;
   for (i=0; i<ary_SortData.length; i++) {
      // #ソートは基本ロジックを流用
      // 要素数が２以上なら２分割し、
      // 分割された配列をary_SortDataの最後に加える
      if (ary_SortData[i].length >= 2) {
         var int_Marker = Math.ceil(ary_SortData[i].length / 2);
         ary_SortData[int_Pointer] = ary_SortData[i].slice(0, int_Marker);
         int_Total += ary_SortData[int_Pointer].length;
         ary_ParentData[int_Pointer] = i;
         int_Pointer++;

         ary_SortData[int_Pointer] = ary_SortData[i].slice(int_Marker, ary_SortData[i].length);
         int_Total += ary_SortData[int_Pointer].length;
         ary_ParentData[int_Pointer] = i;
         int_Pointer++;
      }
   }

   // 引き分けの結果を保存するリスト
   // キー：リンク始点の値
   // 値 ：リンク終点の値
   for (i=0; i<=ary_TempData.length; i++) {
      ary_EqualData[i] = -1;
   }

   int_LeftList  = ary_SortData.length - 2;
   int_RightList = ary_SortData.length - 1;
   int_LeftID    = 0;
   int_RightID   = 0;
   int_Count     = 1;
   int_Completed = 0;

   // イニシャライズが終了したのでステータスを1に変更
   int_Status    = 1;

   if (gID('optAgony').checked) {
      gID('fldMiddleT').onclick = '';
      gID('fldMiddleT').className = 'disabled';
      gID('fldMiddleB').onclick = '';
      gID('fldMiddleB').className = 'disabled';
   }

   gID('fldMiddleT').innerHTML = str_CenterT;
   gID('fldMiddleB').innerHTML = str_CenterB;

   fnc_ShowData();
}

// *****************************************************************************
// * Image Initialize
// * メンテナンス用リスト
function imginit() {
   var int_ImgCount = 0;
   var int_ImgValue = 0;
   var int_ImgMax = 0;

   var tbl_Image_body = gID('imgTable');

   for (i=0; i<ary_CardData.length; i++) {
      new_row = tbl_Image_body.insertRow(tbl_Image_body.rows.length);

      // Col[0]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      new_cell.appendChild(cT(i));
      sC(new_cell, 'resTableL');

      // Col[1]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      new_cell.appendChild(cT(ary_CardData[i][1]));
      sC(new_cell, 'resTableR');

      // Col[3]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      for (j=0; j<ary_TitleDataBandsAndCardTypes.length; j++) {
         if (ary_CardData[i][3][j] == 1) {
         new_cell.appendChild(cT(ary_TitleDataBandsAndCardTypes[j]));
         new_cell.appendChild(cE('br'));
         }
      }
      sC(new_cell, 'resTableR');

      // Col[4]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      sC(new_cell, 'resTableR');

      if (ary_CardData[i][4].length > 0) {
         //for (j=4; j<ary_CardData[i].length;j++) {
            var new_img = cE('img');
            new_img.src = str_ImgPath + ary_CardData[i][4];
            new_cell.appendChild(new_img);
            int_ImgCount++;
         //}
         int_ImgValue++;
      }
      int_ImgMax++;
   }

   gID("lbl_imgCount").innerHTML = int_ImgCount;
   gID("lbl_imgParcent").innerHTML = Math.floor((int_ImgValue / int_ImgMax) * 100);
   gID("lbl_imgValue").innerHTML = int_ImgValue;
   gID("lbl_imgMax").innerHTML = int_ImgMax;
}

// Undo previous choice (

function fnc_Undo() {
   if (int_Status == 0) {
      fnc_Sort(0);
	  return;
   }

   if(int_Count > 2 && int_Completed != back_int_Completed){

   	//ary_TempData = back_ary_TempData.slice(0);
	ary_SortData = back_ary_SortData.slice(0);
	ary_RecordData = back_ary_RecordData.slice(0);
	int_RecordID = back_int_RecordID;
	ary_EqualData = back_ary_EqualData.slice(0);
	ary_ParentData = back_ary_ParentData.slice(0);

	int_Completed = back_int_Completed;
	int_Count = int_Count - 2;
	int_Total = back_int_Total;
	int_RightList = back_int_RightList;
	int_RightID = back_int_RightID;
	int_LeftList = back_int_LeftList;
	int_LeftID = back_int_LeftID;
	int_Status = (int_LeftList < 0) ? 2 : 1;

   fnc_ShowData();
   }
}

/* Debugging purposes (simulates choosing Tie until completion)

function fnc_TieRest(){
	while(int_Status < 2){
		fnc_Sort(0);
	}
}
*/

// *****************************************************************************
// * Sort (-1:左側, 0:引き分け, 1:右側)

function fnc_Sort(int_SelectID) {

	//back_ary_TempData = ary_TempData.slice(0);
	back_ary_SortData = ary_SortData.slice(0);
	back_ary_RecordData = ary_RecordData.slice(0);
	back_int_RecordID = int_RecordID;
	back_ary_EqualData = ary_EqualData.slice(0);
	back_ary_ParentData = ary_ParentData.slice(0);

	back_int_Completed = int_Completed;
	back_int_Total = int_Total;
	back_int_RightList = int_RightList;
	back_int_RightID = int_RightID;
	back_int_LeftList = int_LeftList;
	back_int_LeftID = int_LeftID;

   // ステータスにより処理を分岐
   switch (int_Status) {
      case 0:
         // 初回クリック時、ソート情報を初期化する。
         init();
      case 2:
         // ソートが終了していた場合、ソート処理は行わない。
         return;
      default:
   }

   // ary_RecordDataに保存
   // 左側Count
   if (int_SelectID != 1) {
      fnc_CountUp(0);
      while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1) {
         fnc_CountUp(0);
      }
   }

   // 引き分けの場合のみ
   if (int_SelectID == 0) {
      ary_EqualData[ary_RecordData[int_RecordID-1]] = ary_SortData[int_RightList][int_RightID];
   }

   // 右側Count
   if (int_SelectID != -1) {
      fnc_CountUp(1);
      while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1) {
         fnc_CountUp(1);
      }
   }

   // 片方のリストを走査し終えた後の処理
   if (int_LeftID < ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length) {
      // リストint_RightListが走査済 - リストint_LeftListの残りをコピー
      while (int_LeftID < ary_SortData[int_LeftList].length){
         fnc_CountUp(0);
      }
   } else if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID < ary_SortData[int_RightList].length) {
      // リストint_LeftListが走査済 - リストint_RightListの残りをコピー
      while (int_RightID < ary_SortData[int_RightList].length){
         fnc_CountUp(1);
      }
   }

   //両方のリストの最後に到達した場合は
   //親リストを更新する
   if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length) {
      for (i=0; i<ary_SortData[int_LeftList].length + ary_SortData[int_RightList].length; i++) {
         ary_SortData[ary_ParentData[int_LeftList]][i] = ary_RecordData[i];
      }

      ary_SortData.pop();
      ary_SortData.pop();
      int_LeftList  = int_LeftList - 2;
      int_RightList = int_RightList - 2;
      int_LeftID    = 0;
      int_RightID   = 0;

      //新しい比較を行う前にary_RecordDataを初期化
      if (int_LeftID == 0 && int_RightID == 0) {
         for (i=0; i<ary_TempData.length; i++) {
            ary_RecordData[i] = 0;
         }
         int_RecordID = 0;
      }
   }

   // 終了チェック
   int_Status = (int_LeftList < 0) ? 2 : 1;

   fnc_ShowData();
}

// *****************************************************************************
// * CountUp(0:左側 1:右側)
// * 選択された方をカウントアップする。
function fnc_CountUp(int_Select) {
   ary_RecordData[int_RecordID] = ary_SortData[((int_Select == 0) ? int_LeftList : int_RightList)][((int_Select == 0) ? int_LeftID : int_RightID)];

   if (int_Select == 0) {
      int_LeftID++;
   } else {
      int_RightID++;
   }

   int_RecordID++;
   int_Completed++;
}

// *****************************************************************************
// * ShowData
// * 進捗率と名前を表示する。
function fnc_ShowData() {

   gID("lblCount").innerHTML = int_Count;
   gID("lblTotalCards").innerHTML = totalCards;
   gID("lblProgress").innerHTML = Math.floor(int_Completed * 100 / int_Total);
   if (!bln_ProgessBar) eGR(sID, Math.floor(int_Completed * 100 / int_Total));

   if (int_Status == 2) {
      // 判定が終了していた場合、結果表示。
      var mainTable = gID('mainTable');
      mainTable.parentNode.removeChild(mainTable);
      var int_Result = 1;

      var div_result = cE('div');
      div_result.className = 'result box';

	  var div_idol_container = cE('div');
	  div_idol_container.className = 'idol-flex';
	  var div_card_container = cE('div');
	  div_card_container.className = 'card-flex';
	  var div_card_text_container = cE('div');
	  div_card_text_container.className = 'card-text-flex';

	  div_result.appendChild(div_idol_container);
	  div_result.appendChild(div_card_container);
	  div_result.appendChild(div_card_text_container);

      var int_Same = 1;

      for (i=0; i<ary_TempData.length; i++) {
         var new_div = cE('div');
         //div_result.appendChild(new_div);

	 csort2[i] = int_Result; // v2a

         var bln_imgFlag = false;
         if ((int_ResultImg != 0) && (i < int_ResultRank)) {
			div_idol_container.appendChild(new_div);
            new_div.className = 'idol idol-result';

            var div_number = cE('div');
            div_number.className = 'number';
            div_number.appendChild(cT('#' + int_Result));
            new_div.appendChild(div_number);

            var new_img = cE('img');
            var obj_TempData = ary_TempData[ary_SortData[0][i]];

            if (obj_TempData[2].length > 0) {
               new_img.src = str_ImgPath + obj_TempData[Math.floor(Math.random() * (obj_TempData.length -3)) + 3];
               new_div.appendChild(new_img);
               new_div.appendChild(cE('br'));
               bln_imgFlag = true;
            }

            var div_name = cE('div');
            div_name.className = 'name';
            new_div.appendChild(div_name);

            var div_span = cE('span');
            div_span.appendChild(cT(ary_TempData[ary_SortData[0][i]][1]));
            div_name.appendChild(div_span);

         } else if ((i >= int_ResultRank) && (i < 20)) {
			div_card_container.appendChild(new_div);
			new_div.className = 'card';

            var div_number = cE('div');
            div_number.className = 'number';
			div_number.appendChild(cT('#' + int_Result));
            new_div.appendChild(div_number);

			var new_img = cE('img');
            var obj_TempData = ary_TempData[ary_SortData[0][i]];

            if (obj_TempData[2].length > 0) {
               new_img.src = str_ImgPath + obj_TempData[Math.floor(Math.random() * (obj_TempData.length -3)) + 3];
               new_div.appendChild(new_img);
               new_div.appendChild(cE('br'));
               bln_imgFlag = true;
            }

			var div_name = cE('div');
            div_name.className = 'name';
            new_div.appendChild(div_name);

            var div_span = cE('span');
            div_span.appendChild(cT(ary_TempData[ary_SortData[0][i]][1]));
            div_name.appendChild(div_span);
		} else {
            div_card_text_container.appendChild(new_div);
			new_div.className = 'card-text';

            var div_number = cE('div');
            div_number.className = 'number';
            div_number.appendChild(cT(int_Result));
            new_div.appendChild(div_number);

            var div_span = cE('span');
            div_span.appendChild(cT(ary_TempData[ary_SortData[0][i]][1]));
            new_div.appendChild(div_span);
         }

         if (i == int_ResultRank - 1) {
            var div_break = cE('div');
            div_break.className = 'title';
            div_result.appendChild(div_break);
         }

         if ((int_ResultImg == 2) || (!bln_imgFlag)) {
            csort4[i] = ary_TempData[ary_SortData[0][i]][1]; // v2a
            csort6[i] = ary_TempData[ary_SortData[0][i]][1]; // v2a
         }

         if (i < ary_TempData.length - 1) {
            if (bln_ResultMode == 0) {
               if (ary_EqualData[ary_SortData[0][i]] == ary_SortData[0][i + 1]) {
                  int_Result++;
               }
            } else {
               if (ary_EqualData[ary_SortData[0][i]] == ary_SortData[0][i + 1]) {
                  int_Same++;
               } else {
                  int_Result += int_Same;
                  int_Same = 1;
               }
            }
         }
      }
      var obj_SelectItem = gID("resultField");
      obj_SelectItem.innerHTML = "";
      obj_SelectItem.appendChild(div_result);

      if (bln_ResultStyle == 1) {
         gID("mainTable").style.display = 'none';
      }
	  if (bln_ResultStyle == 0) {
         gID("ranTable").style.display = 'inline';
      } // v2a

	  // v2a start

	  for (i=0; i<10; i++)
		{
		if(csort4[i] == undefined)
			{
			break;
			}
		else
			{
			csort +=  csort2[i];
			csort += '位： ';
			csort4[i] = csort4[i].replace(/・(.*)/g, "");
			csort +=  csort4[i];
			csort += '　';
			}
		}

		for (i=0; i<ary_TempData.length+1; i++)
		{
		if(csort2[i] == undefined || csort6[i] == undefined)
			{
			break;
			}
		else
			{
			csort5 +=  csort2[i];
			csort5 += '. ';
			csort5 +=  csort6[i];
			csort5 += '<br>';
			}
		}

	  // v2a end

   } else {
      // 判定が終了していない場合、選択肢を更新。
      for (i=0; i<2; i++) {
         var obj_SelectItem = gID((i == 0) ? "fldLeft" : "fldRight");
         var obj_TempData = ary_TempData[ary_SortData[(i == 0)  ? int_LeftList : int_RightList][(i == 0)  ? int_LeftID : int_RightID]];
         if ((obj_TempData[3].length > 0) && gID('optImage').checked) {
            var obj_Item = cE("img");
            obj_Item.src = str_ImgPath + obj_TempData[Math.floor(Math.random() * (obj_TempData.length - 3)) + 3];
            obj_Item.title = obj_TempData[1];
         } else {
            var obj_Item = cE("span");
            obj_Item.appendChild(cT(obj_TempData[1]));
         }
         obj_Item.title = obj_TempData[1];
         obj_SelectItem.replaceChild(obj_Item, obj_SelectItem.firstChild);
      }

      int_Count++;
   }
}

function fnc_CC(sID, sClass) {

   sC(gID(sID), sClass);
}

function OpenWnd() {
      var oWindow = window.open("", "");
      with (oWindow.document) {
            write("<html>");
            write("<head>");
            write("<title>Idolsort: Raw Text Results<\/title>");
            write("<\/head>");
            write("<body bgcolor=\"#ffffff\">");
            write(csort5);
            write("<hr>");
            write("<input type='button' value='Close' onclick='window.close()'>");
            write("<hr>");
			write("<\/body>");
            write("<\/html>");
            close();
      }
}