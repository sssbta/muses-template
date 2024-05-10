/*金澤雅*/

"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読判定*/,

  async init() {
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    if (!username) {
      /*ユーザーネームが入力されていない場合*/
      window.alert("ログインしてください"); /*アラートで警告*/
      location.href = "login.html"; /*ログインページを表示する*/
    }
    this.username = username; /*ユーザーネームの繁栄*/

    const res = await fetch("data.json");
    const obj = await res.json();
    this.unread = obj.list.length;
  },
}).mount();
