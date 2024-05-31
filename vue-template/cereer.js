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
    const today = new Date();
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
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const firstDayIndex = firstDay.getDay();
      const lastDayIndex = lastDay.getDate();
      let calendarHTML = `<table>
        <tr class="header">
            <th colspan="7">${monthNames[month]} ${year}</th>
        </tr>
        <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
        </tr>
        <tr>`;

      // 前月の日付を空白で埋める
      for (let i = 0; i < firstDayIndex; i++) {
        calendarHTML += `<td></td>`;
      }

      // カレンダーの日付を生成
      for (let day = 1; day <= lastDayIndex; day++) {
        const isToday =
          today.getFullYear() === year &&
          today.getMonth() === month &&
          today.getDate() === day;
        calendarHTML += `<td class="${isToday ? "today" : ""}">${day}</td>`;

        if ((day + firstDayIndex) % 7 === 0 && day !== lastDayIndex) {
          calendarHTML += `</tr><tr>`;
        }
      }

      // 次月の日付を空白で埋める
      for (let i = (firstDayIndex + lastDayIndex) % 7; i < 7 && i !== 0; i++) {
        calendarHTML += `<td></td>`;
      }

      calendarHTML += `</tr></table>`;
      calendar.innerHTML = calendarHTML;
    }

    createCalendar(today.getFullYear(), today.getMonth());
  },
}).mount();
