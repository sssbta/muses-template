/*金澤雅*/

"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  year: "" /*カレンダー　年 */,
  month: "" /*カレンダー　月 */,
  today: "" /*カレンダー　日 */,

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
    const calendarTable = document.getElementById("calendar_table");
    const calendarHeader = document.getElementById("calendar_header");
    const today = new Date();
    console.log(today);
    const year = today.getFullYear();
    this.year = year; //表題の年
    const month = today.getMonth() + 1;
    this.month = month; //表題の年
    console.log(this.year, this.month, month);
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month, 0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
    const text = "キャリアセミナー";
    const monthNames = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    function createCalendar(year, month) {
      calendarHeader.innerText = `${year}年${monthNames[month]}`;
      let html = "<tr>";

      // 空白のセルを追加
      for (let i = 0; i < startDay; i++) {
        html += "<td></td>";
      }

      // 日にちを追加
      for (let i = startDay; i < 7; i++) {
        html += `<td>${dayCount}</td>`;
        dayCount++;
      }
      html += "</tr>";

      while (dayCount <= endDayCount) {
        html += "<tr>";
        for (let i = 0; i < 7; i++) {
          if (dayCount <= endDayCount) {
            html += `<td id="day-${year}-${month}-${dayCount}">${dayCount}</td>`;
            dayCount++;
          } else {
            html += "<td></td>";
          }
          console.log(this.dayCount);
        }
        html += "</tr>";
      }

      calendarTable.innerHTML += html;
    }

    function insertText(year, month, day, text) {
      const cell = document.getElementById(`day-${year}-${month}-${day}`);
      if (cell) {
        cell.innerHTML += `<div>${text}</div>`;
      }
      console.log(cell);
    }
    createCalendar(year, month - 1);

    insertText(year, month, 15, "イベント");
    console.log(this.dayCount);
    const todayId = `day-${year}-${month}-${today.getDate()}`;
    const todayCell = document.getElementById(todayId);

    if (todayCell) {
      console.log(`Today's cell id: ${todayId}`);
      console.log(todayCell);
    } else {
      console.log(`No cell found with id: ${todayId}`);
    }
  },
}).mount();
