"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  data: [],
  name: "",
  url: "",
  text: "",

  async init() {
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    if (!username) {
      /*ユーザーネームが入力されていない場合*/
      window.alert("ログインしてください"); /*アラートで警告*/
      location.href = "login.html"; /*ログインページを表示する*/
    }
    this.username = username; /*ユーザーネームの反映*/

    const res = await fetch("memodata.json");
    const obj = await res.json();
    this.data = obj.list;
    console.log(this.data);
    this.unread = this.data.length;
  },
}).mount();
