"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  department: "",
  gakubuList: ["大情", "大食", "大日", "大環"],
  carrerevent: "",
  eventList: ["インターン", "セミナー"],
  companies: [],

  async init() {
    //const username = "作業中はログインしなくてもいいようにした。後で戻す。";
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    if (!username) {
      /*ユーザーネームが入力されていない場合*/
      window.alert("ログインしてください"); /*アラートで警告*/
      location.href = "login.html"; /*ログインページを表示する*/
    }
    this.username = username; /*ユーザーネームの反映*/

    const res = await fetch("memodata.json"); /*ニュースのデータ取得*/
    const obj = await res.json(); /*ニュースのデータの読み込み処理*/
    this.unread = obj.list.length; /*ニュースデータを未読リストに追加*/
    this.companies = obj.companieslist;
  },
}).mount();
