'use strict';

PetiteVue.createApp({
  username: '',
  unread: '',
  data: [],
  async init() {
    const username = sessionStorage.username;
    if (!username) {
      window.alert('ログインしてください');
      location.href = 'login.html';
    }
    this.username = username;

    const res = await fetch('data.json');
    const obj = await res.json();
    this.data = obj.list;
    console.log(this.data);

    this.unread = this.data.length;
  }
}).mount();
