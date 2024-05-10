/*柴田*/
"use strict";

PetiteVue.createApp({
  /*変数*/
  username: "",
  unread: "" /*メールの数*/,
  data: [],

  /*ページを読み込むとき*/
  async init() {
    /*async：awaitを使うためのキーワード*/
    const username =
      sessionStorage.username; /*セッションストレージからユーザー名を取り出す*/

    /*ユーザー名の値が空っぽだったら*/
    if (!username) {
      window.alert("ログインしてください");
      location.href = "login.html";
      /*ログインページに飛ぶ*/
    }

    this.username = username;

    /*data.jsonのデータを読み込む処理*/
    const res = await fetch("data.json");
    const obj = await res.json();
    this.data = obj.list;
    console.log(this.data);
    /*await を使うのは読み込み処理を同期（完了するまで次の処理が始まらない）にするため*/
    this.unread = this.data.length; /*未読メールの数をunreadという変数に入れる*/
  },
}).mount();
