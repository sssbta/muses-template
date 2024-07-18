"use strict";

PetiteVue.createApp({
  username: "" /*ユーザーネーム*/,
  unread: "" /*未読ニュース*/,
  department: "",
  carrerevent: "",
  gakubuList: [
    "大日",
    "歴文",
    "大英",
    "英G",
    "大教",
    "大健",
    "大心",
    "新教",
    "心理",
    "福祉",
    "新健",
    "健マネ",
    "大環",
    "大食",
    "大情",
    "大築",
    "情報",
    "食栄",
    "食創",
    "建築",
    "景観",
    "大声",
    "大器",
    "大演",
    "大応",
    "大薬",
    "新薬",
    "大康",
    "共生",
    "大護",
    "経営",
    "大教職",
    "大司書",
    "博物館",
    "大司教",
    "大栄教",
    "短日",
    "短英新",
    "短英",
    "短教",
    "短心",
    "短人",
    "短健",
    "短食",
    "短生",
    "短教職",
    "短司書",
    "短栄教",
    "短共通",
    "院日修",
    "院日博",
    "院英修",
    "院英修",
    "院教修",
    "院心修",
    "院臨修",
    "院臨博",
    "院健修",
    "院食修",
    "院食博",
    "院環修",
    "院環博",
    "院築修",
    "院築博",
    "食栄修",
    "食栄博",
    "食創修",
    "食創博",
    "建築修",
    "建築博",
    "景観修",
    "景観博",
    "院薬博",
    "薬科修",
    "薬科博",
    "院薬修",
    "院薬博",
    "院医修",
    "院護修",
    "院護博",
  ],
  eventList: ["インターン", "セミナー"],
  companies: [],
  applicants: [],
  students: [],
  filteredCompanies: [],
  isShow: false,

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

    const res1 = await fetch("data.json"); /*ニュースのデータ取得*/
    const obj1 = await res1.json(); /*ニュースのデータの読み込み処理*/
    this.unread = obj1.list.length; /*ニュースデータを未読リストに追加*/
    const res2 = await fetch("rankingdata.json"); /*ニュースのデータ取得*/
    const obj2 = await res2.json(); /*ニュースのデータの読み込み処理*/
    this.companies = obj2.companieslist;
    this.applicants = obj2.applicantslist;
    this.students = obj2.studentslist;
  },

  filterCompanies() {
    if (this.department && this.carrerevent) {
      const studentNumbers = this.students
        .filter((student) => student.department === this.department)
        .map((student) => student.studentNumber);

      const eventIds = this.companies
        .filter((company) => company.eventMode === this.carrerevent)
        .map((company) => company.eventid);

      const interested = this.applicants
        .filter((applicant) => eventIds.includes(applicant.eventid))
        .filter((applicant) =>
          studentNumbers.includes(applicant.studentNumber)
        );
      // カウントの辞書を作成
      const countMap = {};
      interested.forEach((company) => {
        countMap[company.eventid] = (countMap[company.eventid] || 0) + 1;
      });

      this.filteredCompanies = this.companies
        .filter((company) => eventIds.includes(company.eventid))
        .sort((company) => company.numberOfInterest);
      this.filteredCompanies.forEach((company) => {
        company.numberOfInterest = countMap[company.eventid];
        if (company.numberOfInterest == undefined) {
          company.numberOfInterest = 0;
        }
      });
      this.isShow = true;
    }
  },
}).mount();
