/*金澤雅*/

"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  year: "",
  month: "",
  today: "",

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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month, 0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
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
    }

    createCalendar(today.getFullYear(), today.getMonth());
  },
}).mount();
