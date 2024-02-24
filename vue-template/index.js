'use strict';

PetiteVue.createApp({
  username: '',
  unread: '',

  async init() {
    const username = sessionStorage.username;
    if (!username) {
      window.alert('ログインしてください');
      location.href = 'login.html';
    }
    this.username = username;

    const res = await fetch('data.json');
    const obj = await res.json();
    this.unread = obj.list.length;
  }
}).mount();
