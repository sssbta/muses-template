"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  department: "",
  carrerevent: "",
  gakubuList: ["大情", "大食", "大日", "大環"],
  eventList: ["インターン", "セミナー"],
  companies: [],
  applicants: [],
  students: [],
  filteredCompanies: [],

  async init() {
    //const username = "作業中はログインしなくてもいいようにした。後で戻す。";
    const username =
      sessionStorage.username; /*セッションごとのユーザーネームを設定*/
    // if (!username) {
    //   /*ユーザーネームが入力されていない場合*/
    //   window.alert("ログインしてください"); /*アラートで警告*/
    //   location.href = "login.html"; /*ログインページを表示する*/
    // }
    this.username = username; /*ユーザーネームの反映*/

    const res1 = await fetch("data.json"); /*ニュースのデータ取得*/
    const obj1 = await res1.json(); /*ニュースのデータの読み込み処理*/
    this.unread = obj1.list.length; /*ニュースデータを未読リストに追加*/
    const res2 = await fetch("rankingdata.json"); /*ニュースのデータ取得*/
    const obj2 = await res2.json(); /*ニュースのデータの読み込み処理*/
    this.companies = obj2.companieslist;
    this.applicants = data.applicantslist;
    this.students = data.studentslist;
    this.filteredCompanies = this.companies;
  },

  filterCompanies() {
    if (this.department && this.carrerevent) {
      const studentNumbers = this.students
        .filter((student) => student.department === this.department)
        .map((student) => student.studentNumber);

      const eventIds = this.applicants
        .filter((applicant) => studentNumbers.includes(applicant.studentNumber))
        .map((applicant) => applicant.eventid);

      this.filteredCompanies = this.companies
        .filter(
          (company) =>
            eventIds.includes(company.eventid) &&
            company.eventMode === this.carrerevent
        )
        .sort((a, b) => b.numberOfInterest - a.numberOfInterest);
    } else {
      this.filteredCompanies = this.companies;
    }
  },
}).mount();
