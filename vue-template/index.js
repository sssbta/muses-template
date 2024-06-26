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
}).mount();
