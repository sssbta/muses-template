"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  data: [],
  displayedData: [],
  isShowingFavorites: false,
  buttonText: "お気に入りのみ表示",

  async init() {
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    if (!username) {
      /*ユーザーネームが入力されていない場合*/
      window.alert("ログインしてください"); /*アラートで警告*/
      location.href = "login.html"; /*ログインページを表示する*/
    }
    this.username = username; /*ユーザーネームの反映*/

    const news = await fetch("data.json"); /*ニュースのデータ取得*/
    const objc = await news.json(); /*ニュースのデータの読み込み処理*/
    this.unread = objc.list.length; /*ニュースデータを未読リストに追加*/

    const res = await fetch("memodata.json");
    const obj = await res.json();
    this.data = obj.list.map((item) => {
      if (item.text.length > 16) {
        item.shortText = item.text.substring(0, 16) + "……";
      } else {
        item.shortText = item.text;
      }
      return item;
    });
    this.displayedData = this.data;
  },

  toggleFavorite() {
    this.isShowingFavorites = !this.isShowingFavorites;
    if (this.isShowingFavorites) {
      this.displayedData = this.data.filter((item) => item.favo == "★");
      this.buttonText = "お気に入り以外も表示";
    } else {
      this.displayedData = this.data;
      this.buttonText = "お気に入りのみ表示";
    }
  },

  showItemDetails(item) {
    const { shortText, ...details } = {
      企業名: item.name,
      記入日: item.date,
      お気に入り: item.favo,
      メモ内容: item.text,
    };
    alert(JSON.stringify(details, null, 2));
  },
}).mount();
