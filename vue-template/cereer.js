/*金澤雅*/

"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,

  async init() {
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    if (!username) {
      /*ユーザーネームが入力されていない場合*/
      window.alert("ログインしてください"); /*アラートで警告*/
      location.href = "login.html"; /*ログインページを表示する*/
    }
    this.username = username; /*ユーザーネームの反映*/

    const res = await fetch("data.json"); /*ニュースのデータ取得*/
    const obj = await res.json(); /*ニュースのデータの読み込み処理*/
    this.unread = obj.list.length; /*ニュースデータを未読リストに追加*/
  },
  get calender() {
    const calender = document.getElementById("career_calendar"); //htmlからidを取得
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month, 0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ""; // HTMLを組み立てる変数

    calendarHtml += "<h1>" + year + "/" + month + "</h1>";
    calendarHtml += "<table>";

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
      calendarHtml += "<td>" + weeks[i] + "</td>";
    }

    for (let w = 0; w < 6; w++) {
      calendarHtml += "<tr>";

      for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
          // 1行目で1日の曜日の前
          calendarHtml += "<td></td>";
        } else if (dayCount > endDayCount) {
          // 末尾の日数を超えた
          calendarHtml += "<td></td>";
        } else {
          calendarHtml += "<td>" + dayCount + "</td>";
          dayCount++;
        }
      }
      calendarHtml += "</tr>";
    }
    calendarHtml += "</table>";

    document.querySelector("#calendar").innerHTML = calendarHtml;
  },
}).mount();
