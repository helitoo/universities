import {
  subjectGroups,
  round2,
  getInRangeVal,
  getGroupScore,
  hasScoreGroup,
  getAddScore,
  getCompleteScore,
  getGroupDist,
  getDist,
  getConvertedScore,
  getSort,
  getAvg,
} from "./score_convert_model.js";

export default class queryModel {
  main = new Map([
    ["thpt", new Map()],
    ["thhb", new Map()],
    ["dgsg", new Map()],
    ["dghn", new Map()],
    ["vsat", new Map()],
    ["dgsp", new Map()],
    ["dgcb", new Map()],
    ["dgca", new Map()],
    ["dgtd", new Map()],
    ["k01", new Map()],
    ["QSB", new Map()],
  ]);

  extra = new Map([
    ["kk", 0],
    ["ut", 0],
    ["an", 0],
    ["thpt", null],
  ]);

  supabase = window.supabase.createClient(
    "https://djwhdufsuqhkmlysnqmc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqd2hkdWZzdXFoa21seXNucW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzczMDQsImV4cCI6MjA2NzgxMzMwNH0.4Y0xbucX14ln9Q11H5VUv9_bHgvfiNNqxXdUMWbHoFg"
  );

  /////////////////////////////////////////////////////////////////////
  // Calc extra data
  /////////////////////////////////////////////////////////////////////

  async calcExtra(filterData, year) {
    this.calcApplyGroups(filterData.applySubject);

    await this.calcApplyGroupDists("thpt", year, 10, {});

    this.calcKK(filterData.ttcn);

    this.calcUT(filterData.priority);

    this.calcNN(filterData.ielts_P);
  }

  applyGroups = [];
  applyGroupDists = new Map();

  // applySubjects : map

  calcApplyGroups(applySubjects) {
    for (let [group, subjects] of subjectGroups.entries()) {
      let isApplyGroup = true;

      for (let subject of subjects)
        if (!applySubjects.get(subject)) {
          isApplyGroup = false;
          break;
        }

      if (isApplyGroup) this.applyGroups.push(group);
    }
  }

  async calcApplyGroupDists(exam, year, eachBase, coefs) {
    for (let group of this.applyGroups)
      this.applyGroupDists.set(
        group,
        await getGroupDist(this.supabase, exam, group, year, eachBase, coefs)
      );
  }

  calcKK(ttcn) {
    let kk_ps = [
      [0.01, 0.08, 0.1, 0.3],
      [0.51, 1, 1, 1],
      [1, 1, 1, 1],
    ];

    for (let i = 0; i < ttcn.get("level").length; i++) {
      let row = ttcn.get("level")[i];
      let col = ttcn.get("type")[i];

      this.extra.set("kk", this.extra.get("kk") + kk_ps[row][col]);
    }

    this.extra.set("kk", getInRangeVal(this.extra.get("kk") * 3, 0, 3));
  }

  calcUT(priority) {
    switch (priority.get("dtut")) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.extra.set("ut", this.extra.get("ut") + 2);
        break;
      case 5:
      case 6:
      case 7:
        this.extra.set("ut", this.extra.get("ut") + 1);
        break;
    }

    switch (priority.get("kvut")) {
      case 1:
        this.extra.set("ut", this.extra.get("ut") + 0.75);
        break;
      case 2:
        this.extra.set("ut", this.extra.get("ut") + 0.25);
        break;
      case 3:
        this.extra.set("ut", this.extra.get("ut") + 0.5);
        break;
    }
  }

  calcNN(ielts) {
    if (ielts < 5) this.extra.set("an", 0);
    else if (ielts == 5) this.extra.set("an", 8.5);
    else if (ielts == 5.5) this.extra.set("an", 9);
    else if (ielts == 6) this.extra.set("an", 9.5);
    else this.extra.set("an", 10);

    return this.extra.get("an");
  }

  /////////////////////////////////////////////////////////////////////
  // Calc main data
  /////////////////////////////////////////////////////////////////////

  async calcMain(filterData, year) {
    this.completeThhbThpt(filterData.thhb_P, filterData.thpt_P);

    // Các pt có bảng quy đổi ngoại ngữ riêng

    await Promise.all([
      this.calcDgca(filterData.dgca_P, filterData.thpt_P, filterData.ielts_P),
      this.calcHcmut(
        filterData.dgsg_P,
        filterData.thpt_P,
        filterData.thhb_P,
        filterData.ielts_P
      ),
    ]);

    this.thhbThptAnConvert(filterData.thhb_P, filterData.thpt_P);

    // Các pt có bản quy đổi ngoại ngữ chung
    await Promise.all([
      this.calcThhb(filterData.thhb_P),
      this.calcThpt(filterData.thpt_P),
      this.calcDghn(filterData.dghn_P, year),
      this.calcDgsg(filterData.dgsg_P, year),
      this.calcVsat(filterData.vsat_P, year),
      this.calcDgsp(filterData.dgsp_P),
      this.calcDgcb(filterData.dgcb_P, filterData.thhb_P),
      this.calcK00(filterData.dgtd_P, filterData.ielts_P, year),
      this.calcK01(filterData.thpt_P),
    ]);
  }

  completeThhbThpt(thhb_P, thpt_P) {
    const convertCoefs = new Map([
      ["to", [6.7, [1.028, -0.99], [1.09, -1.0], [4.2, -24.78]]],
      ["nv", [6.93, [1.017, -0.83], [1.018, -0.74], [2.5, -10.5]]],
      ["vl", [7.05, [1.026, -0.64], [1.106, -0.67], [5.24, -30.87]]],
      ["hh", [7.08, [1.025, -0.56], [1.07, -0.99], [5.48, -27.45]]],
      ["sh", [7.28, [1.064, -0.39], [1.053, -0.37], [4.69, -24.23]]],
      ["ls", [7.37, [1.038, -0.41], [1.039, -0.45], [4.41, -26.04]]],
      ["dl", [7.12, [1.036, -0.39], [1.05, -0.57], [4.47, -25.96]]],
      ["gd", [7.45, [1.078, -1.29], [1.026, -0.01], [2.97, -15.2]]],
      ["th", [7.62, [1.038, -1.09], [1.063, -0.92], [3.89, -19.66]]],
      ["c1", [7.8, [1.026, -0.42], [1.045, -1.06], [3.61, -18.58]]],
      ["c2", [7.74, [1.033, -0.55], [1.026, -0.56], [2.97, -13.17]]],
      ["an", [6.55, [1.058, -1.26], [1.065, -1.23], [3.63, -18.15]]],
    ]);

    const getScoreFromCoefs = (score, subject, coefIndex) => {
      let coefs = convertCoefs.get(subject)[coefIndex];

      return getInRangeVal(round2(coefs[0] * score + coefs[1], 2), 0, 10);
    };

    const getYearScore = (hk1Score, hk2Score) => {
      return round2((hk1Score + 2 * hk2Score) / 3, 2);
    };

    for (let [subject, scores] of thhb_P.entries()) {
      // Hoàn thiện điểm Lớp 10
      if (scores[0] == null) scores[0] = convertCoefs.get(subject)[0];

      if (scores[1] == null) scores[1] = scores[0];

      // Hoàn thiện điểm Lớp 11
      if (scores[2] == null)
        scores[2] = getScoreFromCoefs(
          getYearScore(scores[0], scores[1]),
          subject,
          1
        );

      if (scores[3] == null) scores[3] = scores[2];

      // Hoàn thiện điểm Lớp 12
      if (scores[4] == null)
        scores[4] = getScoreFromCoefs(
          getYearScore(scores[2], scores[3]),
          subject,
          2
        );

      if (scores[5] == null) scores[5] = scores[4];

      // Hoàn thiện điểm TN

      if (thpt_P.get(subject) == null)
        thpt_P.set(
          subject,
          getScoreFromCoefs(
            (getYearScore(scores[0], scores[1]) +
              getYearScore(scores[2], scores[3]) +
              getYearScore(scores[4], scores[5])) /
              3,
            subject,
            3
          )
        );
    }
  }

  thhbThptAnConvert(thhb_P, thpt_P) {
    for (let i = 0; i < thhb_P.get("an").length; i++)
      if (this.extra.get("an") > thhb_P.get("an")[i])
        thhb_P.get("an")[i] = this.extra.get("an");

    if (this.extra.get("an") > thpt_P.get("an"))
      thpt_P.set("an", this.extra.get("an"));
  }

  async calcThhb(thhb_P) {
    for (let scores of thhb_P.values()) {
      // index 6 : 6 HK
      scores.push(
        (scores[0] +
          scores[1] +
          scores[2] +
          scores[3] +
          scores[4] +
          scores[5]) /
          6
      );

      // index 7 : 5 HK
      scores.push(
        (scores[0] + scores[1] + scores[2] + scores[3] + scores[4]) / 5
      );

      // index 8 : 3 HK
      scores.push((scores[2] + scores[3] + scores[4]) / 3);

      // index 9 : 3 nam
      scores.push(
        (round2((scores[0] + 2 * scores[1]) / 3, 2) +
          round2((scores[2] + 2 * scores[3]) / 3, 2) +
          round2((scores[4] + 2 * scores[5]) / 3, 2)) /
          3
      );

      // index 10 : 2 nam 1 HK
      scores.push(
        (round2((scores[0] + 2 * scores[1]) / 3, 2) +
          round2((scores[2] + 2 * scores[3]) / 3, 2) +
          scores[4]) /
          3
      );

      // index 11 : 1 nam
      scores.push(round2((scores[4] + 2 * scores[5]) / 3, 2));
    }

    for (let group of this.applyGroups) {
      let scores = [];

      for (let i = 6; i < 12; i++) {
        let rawScore = getGroupScore(group, thhb_P, i, {});

        let addScore = round2(
          getAddScore(rawScore, this.extra.get("ut"), 30),
          4
        );

        let completeScore = round2(
          getCompleteScore(rawScore, this.extra.get("ut"), 10),
          2
        );

        scores.push([completeScore, addScore]);
      }

      this.main.get("thhb").set(group, scores);
    }
  }

  async calcDghn(dghn_P, year) {
    if (dghn_P != null) {
      const groups = ["G001", "G056", "G165", "G034", "G010"];

      const dghnDist = await getDist(this.supabase, "dghn", "al", year);

      this.main
        .get("dghn")
        .set("root", [
          round2(getCompleteScore(dghn_P, this.extra.get("ut"), 150), 2),
          round2(getAddScore(dghn_P, this.extra.get("ut"), 150), 4),
        ]);

      for (let group of groups)
        if (this.applyGroups.includes(group)) {
          let rawScore = getConvertedScore(
            dghn_P,
            dghnDist,
            this.applyGroupDists.get(group)
          );

          let addScore = round2(
            getAddScore(rawScore, this.extra.get("ut"), 30),
            4
          );

          let completeScore = round2(
            getCompleteScore(rawScore, this.extra.get("ut"), 30),
            2
          );

          this.main.get("dghn").set(group, [completeScore, addScore]);
        }
    }

    if (this.main.get("dghn").size > 1)
      this.main.set("dghn", getSort(this.main.get("dghn"), 0, false));
  }

  async calcDgsg(dgsg_P, year) {
    if ([...dgsg_P.values()].every((score) => score != null)) {
      const groups = ["G001", "G056", "G165", "G034", "G010"];

      const dgsgDist = await getDist(this.supabase, "dgsg", "al", year, 1200);

      dgsg_P = [...dgsg_P.values()].reduce((acc, val) => acc + val, 0);

      this.main
        .get("dgsg")
        .set("root", [
          round2(getCompleteScore(dgsg_P, this.extra.get("ut"), 1200), 2),
          round2(getAddScore(dgsg_P, this.extra.get("ut"), 1200), 4),
        ]);

      for (let group of groups)
        if (this.applyGroups.includes(group)) {
          let rawScore = getConvertedScore(
            dgsg_P,
            dgsgDist,
            this.applyGroupDists.get(group)
          );

          let addScore = round2(
            getAddScore(rawScore, this.extra.get("ut"), 30),
            4
          );

          let completeScore = round2(
            getCompleteScore(rawScore, this.extra.get("ut"), 30),
            2
          );

          this.main.get("dgsg").set(group, [completeScore, addScore]);
        }
    }

    if (this.main.get("dgsg").size > 1)
      this.main.set("dgsg", getSort(this.main.get("dgsg"), 0, false));
  }

  async calcVsat(vsat_P, year) {
    const vsatDist = {
      dist: [0, 1, 5, 0],
      min: 0,
      max: 150,
    };

    // Quy đổi

    for (let [subject, score] of vsat_P.entries())
      if (score != null)
        vsat_P.set(
          subject,
          getConvertedScore(
            score,
            vsatDist,
            await getDist(this.supabase, "thpt", subject, year, 10)
          )
        );

    // Tính tổ hợp

    for (let group of this.applyGroups)
      if (hasScoreGroup(group, vsat_P)) {
        let rawScore = getGroupScore(group, vsat_P, null, {});

        let addScore = round2(
          getAddScore(rawScore, this.extra.get("ut"), 30),
          4
        );

        let completeScore = round2(
          getCompleteScore(rawScore, this.extra.get("ut"), 30),
          2
        );

        this.main.get("vsat").set(group, [completeScore, addScore]);
      }

    if (this.main.get("vsat").size > 1)
      this.main.set("vsat", getSort(this.main.get("vsat"), 0, false));
  }

  async calcDgca(dgca_P, thpt_P, ielts_P) {
    if ([...dgca_P.values()].every((score) => score != null)) {
      let groups = [
        "G001",
        "G010",
        "G011",
        "G027",
        "G165",
        "G028",
        "G034",
        "G019",
        "G040",
        "G045",
        "G052",
        "G054",
        "G031",
        "G032",
        "G033",
      ];

      let nn_p = 0;

      if (ielts_P >= 4 && ielts_P <= 4.5) nn_p = 7.5;
      else if (ielts_P >= 5 && ielts_P <= 5.5) nn_p = 8;
      else if (ielts_P >= 6 && ielts_P <= 6.5) nn_p = 9;
      else if (ielts_P >= 7 && ielts_P <= 7.5) nn_p = 9.5;
      else if (ielts_P >= 8) nn_p = 10;

      thpt_P = new Map(thpt_P);
      thpt_P.set("an", Math.max(thpt_P.get("an"), nn_p));

      for (let group of groups)
        if (this.applyGroups.includes(group)) {
          let rawScore =
            0.4 * getGroupScore(group, thpt_P, null, {}) +
            0.18 * Math.max(...dgca_P.values());

          let addScore = round2(
            getAddScore(rawScore, this.extra.get("ut"), 30),
            4
          );

          let completeScore = round2(
            getCompleteScore(rawScore, this.extra.get("ut"), 30),
            2
          );

          this.main.get("dgca").set(group, [completeScore, addScore]);
        }

      if (this.main.get("dgca").size > 1)
        this.main.set("dgca", getSort(this.main.get("dgca"), 0, false));
    }
  }

  async calcDgsp(dgsp_P) {
    for (let group of this.applyGroups)
      if (hasScoreGroup(group, dgsp_P)) {
        let scores = [];

        for (let subject of ["al", ...subjectGroups.get(group)]) {
          let rawScore = getGroupScore(group, dgsp_P, null, { [subject]: 2 });

          let addScore = round2(
            getAddScore(rawScore, this.extra.get("ut"), 30),
            4
          );

          let completeScore = round2(
            getCompleteScore(rawScore, this.extra.get("ut"), 30),
            2
          );

          scores.push([completeScore, addScore]);
        }

        if (scores.length > 0) this.main.get("dgsp").set(group, scores);
      }
  }

  async calcThpt(thpt_P) {
    for (let group of this.applyGroups) {
      let scores = [];

      for (let subject of ["al", ...subjectGroups.get(group)]) {
        let rawScore = getGroupScore(group, thpt_P, null, { [subject]: 2 });

        let addScore = round2(
          getAddScore(rawScore, this.extra.get("ut"), 30),
          4
        );

        let completeScore = round2(
          getCompleteScore(rawScore, this.extra.get("ut"), 30),
          2
        );

        scores.push([completeScore, addScore]);
      }

      this.main.get("thpt").set(group, scores);
    }
  }

  async calcDgcb(dgcb_P, thhb_P) {
    for (let group of this.applyGroups) {
      let subjects = subjectGroups.get(group);

      if (
        [
          dgcb_P.get(subjects[0]),
          dgcb_P.get(subjects[1]),
          dgcb_P.get(subjects[2]),
        ].every((score) => score != null)
      ) {
        let scores = [];

        for (let i = 0; i < 3; i++) {
          let dgcbScore = dgcb_P.get(subjects[i % 3]);

          if (dgcbScore != null) {
            let thhb1Score = thhb_P.get(subjects[(i + 1) % 3])[6];
            let thhb2Score = thhb_P.get(subjects[(i + 2) % 3])[6];

            let rawScore = 0.5 * dgcbScore + 0.5 * (thhb1Score + thhb2Score);

            let addScore = round2(
              getAddScore(rawScore, this.extra.get("ut"), 30),
              4
            );

            let completeScore = round2(
              getCompleteScore(rawScore, this.extra.get("ut"), 30),
              2
            );

            scores.push([completeScore, addScore]);
          } else scores.push(["", ""]);

          this.main.get("dgcb").set(group, scores);
        }
      }
    }
  }

  async calcK00(dgtd_P, ielts_P, year) {
    if (dgtd_P != null && this.applyGroups.includes("G001")) {
      // Điểm cộng ngoại ngữ

      let nn_add_p = 0;

      if (ielts_P == 5) nn_add_p = 1;
      else if (ielts_P == 5.5) nn_add_p = 2;
      else if (ielts_P == 6) nn_add_p = 3;
      else if (ielts_P == 6.5) nn_add_p = 4;
      else if (ielts_P == 7) nn_add_p = 5;
      else if (ielts_P == 7.5) nn_add_p = 6;
      else if (ielts_P >= 8) nn_add_p = 7;

      nn_add_p *= 3 / 10;

      let rawScore = getConvertedScore(
        dgtd_P,
        await getDist(this.supabase, "dgtd", "al", year, 100),
        this.applyGroupDists.get("G001")
      );

      let addScore = round2(
        getAddScore(rawScore, nn_add_p + this.extra.get("ut"), 30),
        4
      );

      let completeScore = round2(
        getCompleteScore(rawScore, nn_add_p + this.extra.get("ut"), 30),
        2
      );

      this.main.get("dgtd").set("G001", [completeScore, addScore]);
    }
  }

  async calcK01(thpt_P) {
    const groups = new Map([
      ["G003", { to: 3, nv: 1, vl: 2 }],
      ["G012", { to: 3, nv: 1, hh: 2 }],
      ["G020", { to: 3, nv: 1, sh: 2 }],
      ["G031", { to: 3, nv: 1, th: 2 }],
    ]);

    for (let [group, coefs] of groups)
      if (this.applyGroups.includes(group)) {
        let rawScore = getGroupScore(group, thpt_P, null, coefs);

        let addScore = round2(
          getAddScore(rawScore, this.extra.get("ut"), 30),
          4
        );

        let completeScore = round2(
          getCompleteScore(rawScore, this.extra.get("ut"), 30),
          2
        );

        this.main.get("k01").set(group, [completeScore, addScore]);
      }

    if (this.main.get("k01").size > 1)
      this.main.set("k01", getSort(this.main.get("k01"), 0, false));
  }

  async calcHcmut(dgsg_P, thpt_P, thhb_P, ielts_P) {
    thpt_P = new Map(thpt_P);
    thhb_P = new Map(thhb_P);

    // Quy đổi ngoại ngữ

    let nn_p = 0;
    if (ielts_P == 5) nn_p = 8;
    else if (ielts_P == 5.5) nn_p = 9;
    else if (ielts_P >= 6) nn_p = 10;

    thpt_P.set("an", Math.max(thpt_P.get("an"), nn_p));

    thhb_P.set(
      "an",
      thhb_P.get("an").map((elm) => Math.max(elm, nn_p))
    );

    for (let scores of thhb_P.values())
      scores.push(
        (round2((scores[0] + 2 * scores[1]) / 3, 2) +
          round2((scores[2] + 2 * scores[3]) / 3, 2) +
          round2((scores[4] + 2 * scores[5]) / 3, 2)) /
          3
      );

    // Tính điểm năng lực

    let nlScore = 0;

    if ([...dgsg_P.values()].every((score) => score != null))
      nlScore = [...dgsg_P.values()].reduce((acc, val) => acc + val, 0) / 15;

    for (let group of this.applyGroups) {
      // Điểm thi tốt nghiệp
      let tnScore = (getGroupScore(group, thpt_P, null, {}) / 3) * 10;

      // TH ko thi đgnl
      nlScore = nlScore > 0 ? nlScore : tnScore * 0.75;

      // Điểm học bạ
      let hbScore = getGroupScore(group, thhb_P, 6, {});

      // Điểm thô
      let rawScore = nlScore * 0.7 + tnScore * 0.2 + hbScore * 0.1;

      // Điểm thành tích
      let ttScore = (this.extra.get("kk") / 3) * 10;
      if (rawScore + ttScore >= 100) ttScore = 100 - rawScore;

      // Điểm ưu tiên
      let utScore = round2((this.extra.get("ut") / 2.75) * 9.17, 2);
      if (rawScore + ttScore + utScore >= 75)
        utScore = ((100 - rawScore - ttScore - utScore) / 25) * utScore;

      this.main
        .get("QSB")
        .set(group, [
          round2(rawScore + ttScore + utScore, 2),
          round2(ttScore + utScore, 2),
        ]);
    }

    if (this.main.get("QSB").size > 1)
      this.main.set("QSB", getSort(this.main.get("QSB"), 0, false));
  }

  /////////////////////////////////////////////////////////////////////
  // Calc holland
  /////////////////////////////////////////////////////////////////////

  majorFromHolland = [];

  hollandAns = new Map([
    ["r", 0],
    ["i", 0],
    ["a", 0],
    ["s", 0],
    ["e", 0],
    ["c", 0],
  ]);

  majorFreqs = new Map([
    ["714", 0],
    ["721", 0],
    ["722", 0],
    ["731", 0],
    ["732", 0],
    ["734", 0],
    ["738", 0],
    ["742", 0],
    ["744", 0],
    ["746", 0],
    ["748", 0],
    ["751", 0],
    ["752", 0],
    ["754", 0],
    ["758", 0],
    ["762", 0],
    ["764", 0],
    ["772", 0],
    ["776", 0],
    ["781", 0],
    ["784", 0],
    ["785", 0],
    ["786", 0],
  ]);

  calcHolland(hollandData) {
    const holland2major = new Map([
      [
        "r",
        [
          "748",
          "751",
          "752",
          "754",
          "758",
          "762",
          "764",
          "772",
          "784",
          "785",
          "786",
        ],
      ],
      [
        "i",
        [
          "714",
          "731",
          "732",
          "744",
          "746",
          "748",
          "751",
          "752",
          "742",
          "772",
          "785",
          "738",
        ],
      ],
      ["a", ["721", "722", "732", "758", "776"]],
      ["s", ["714", "731", "732", "772", "776", "781", "786"]],
      ["e", ["734", "738", "751", "758", "772", "781", "785"]],
      ["c", ["714", "732", "734", "746", "751", "754", "781", "784", "786"]],
    ]);

    // Calc single questions

    const hollandSingleQ = new Map([
      ["r", [0, 12, 2]],
      ["i", [1, 13, 2]],
      ["a", [14, 26, 2]],
      ["s", [15, 27, 2]],
      ["e", [28, 40, 2]],
      ["c", [29, 41, 2]],
    ]);

    for (let [code, range] of hollandSingleQ.entries())
      for (let i = range[0]; i <= range[1]; i += range[2])
        this.hollandAns.set(
          code,
          this.hollandAns.get(code) + hollandData.single_p[i]
        );

    // Calc multi q questions

    for (let [code, scores] of hollandData.multi_p.entries())
      for (let score of scores)
        this.hollandAns.set(code, this.hollandAns.get(code) + score);

    // Normalize

    function normalizeMapValuesToPositive(map) {
      const values = [...map.values()];
      const min = Math.min(...values);

      if (min < 0) {
        const offset = Math.abs(min);
        for (let [key, val] of map.entries()) {
          map.set(key, val + offset);
        }
      }

      return map;
    }

    this.hollandAns = normalizeMapValuesToPositive(this.hollandAns);

    // Calc frequencies

    for (let [code, majors] of holland2major.entries())
      for (let major of majors)
        this.majorFreqs.set(
          major,
          this.majorFreqs.get(major) + this.hollandAns.get(code)
        );

    // Get high major from holland ans

    this.hollandAns = [...getSort(this.hollandAns, null, false).entries()];

    for (let i = 0; i < this.hollandAns.length; i++)
      if (this.hollandAns[0][1] - this.hollandAns[i][1] <= 1)
        this.majorFromHolland.push(...holland2major.get(this.hollandAns[i][0]));
      else break;

    this.hollandAns = new Map(this.hollandAns);

    this.majorFreqs = getSort(this.majorFreqs, null, false);
  }

  /////////////////////////////////////////////////////////////////////
  // Calc statistic info
  /////////////////////////////////////////////////////////////////////

  calcAvgField() {
    let methodScores = new Map([
      ["thpt", []],
      ["thhb", []],
      ["dgsg", []],
      ["dghn", []],
      ["vsat", []],
      ["dgsp", []],
      ["dgcb", []],
      ["dgca", []],
      ["dgtd", []],
      ["k01", []],
      ["QSB", []],
    ]);

    let groupScores = new Map();

    for (let group of this.applyGroups) groupScores.set(group, []);

    // Get scores

    for (let [method, groups] of this.main.entries())
      if (groups.size > 0)
        for (let [group, scores] of groups.entries())
          if (this.applyGroups.includes(group)) {
            if (Array.isArray(scores[0])) {
              for (let score of scores)
                if (typeof score[0] == "number") {
                  methodScores.get(method).push(score[0]);
                  groupScores.get(group).push(score[0]);
                }
            } else if (typeof scores[0] == "number") {
              methodScores.get(method).push(scores[0]);
              groupScores.get(group).push(scores[0]);
            }
          }

    for (let i = 0; i < methodScores.get("QSB").length; i++)
      methodScores.get("QSB")[i] = round2(
        (methodScores.get("QSB")[i] / 100) * 30,
        2
      );

    // Get avg

    let methodAvg = new Map();
    let groupAvg = new Map();

    for (let [method, scores] of methodScores.entries())
      if (scores.length > 0) methodAvg.set(method, round2(getAvg(scores), 2));

    for (let [group, scores] of groupScores.entries())
      if (scores.length > 0) groupAvg.set(group, round2(getAvg(scores), 2));

    methodAvg = getSort(methodAvg, null, false);
    groupAvg = getSort(groupAvg, null, false);

    return { methodAvg, groupAvg };
  }

  /////////////////////////////////////////////////////////////////////
  // Get recommended majors
  /////////////////////////////////////////////////////////////////////

  async getRcmdMajor(schoolData, majorData, cerfData, pointRangeData) {
    let queryExtraInfo = new Map();

    // school

    if (schoolData.get("id").length > 0)
      queryExtraInfo.set("school_id", schoolData.get("id"));

    if (schoolData.get("type").some((type) => type == false)) {
      if (schoolData.get("type")[0] == true)
        queryExtraInfo.set("school_public", 1);
      else queryExtraInfo.set("school_public", 0);
    }

    // queryExtraInfo.set("school_region", schoolData.get("region"));

    if (schoolData.get("region").some((region) => region == true)) {
      queryExtraInfo.set("school_region", []);

      if (schoolData.get("region")[0])
        queryExtraInfo.get("school_region").push("HNC");

      if (schoolData.get("region")[1])
        queryExtraInfo.get("school_region").push("HCMC");

      if (schoolData.get("region")[2])
        queryExtraInfo.get("school_region").push("NR");

      if (schoolData.get("region")[3])
        queryExtraInfo.get("school_region").push("CR");

      if (schoolData.get("region")[4])
        queryExtraInfo.get("school_region").push("SR");
    }

    // industry1

    if (this.majorFromHolland.length + majorData.get("1").length > 0)
      queryExtraInfo.set("industry_l1_id", [
        ...this.majorFromHolland,
        ...majorData.get("1"),
      ]);

    if (majorData.get("3").length > 0)
      queryExtraInfo.set("major_id", majorData.get("3"));

    // score

    let queryScoreInfo = new Map();

    // ccqt

    if (cerfData.get("id").length > 0) {
      queryScoreInfo.set("ccqt", 0);

      for (let i = 0; i < cerfData.get("id").length; i++) {
        let base = 0;
        let score = cerfData.get("p")[i];

        switch (cerfData.get("id")[i]) {
          case "SAT":
            base = 1600;
            break;
          case "ACT":
            base = 36;
            break;
          case "IB":
            base = 45;
            break;
          default: // A-level
            base = 48;

            switch (score) {
              case "A":
                score = 48;
                break;
              case "B":
                score = 40;
                break;
              case "C":
                score = 32;
                break;
              case "D":
                score = 24;
                break;
              case "E":
                score = 16;
                break;
              default:
                score = 0;
            }
        }

        queryScoreInfo.set("ccqt", new Map());

        queryScoreInfo
          .get("ccqt")
          .set(
            "A000",
            Math.max(
              queryScoreInfo.get("ccqt"),
              round2((score / base) * 30, 2) + pointRangeData.get("max")
            )
          );
      }
    }

    // other scores

    for (let [method, groupScores] of this.main.entries())
      if (method != "root" && groupScores.size > 0) {
        // groupScores = map  [method, [realScore, addScore]] or [method, [ [realScore, addScore] , [realScore, addScore] , ...]]
        queryScoreInfo.set(method, new Map());

        for (let [group, scores] of groupScores.entries()) {
          if (method == "dgtd" || method == "dghn" || method == "dgsg")
            group = "A000";

          if (typeof scores[0] == "number")
            // groupScores = [realScore, addScore] -> scores = realScore
            queryScoreInfo
              .get(method)
              .set(group, scores[0] + pointRangeData.get("max"));
          else {
            // groupScores = [ [realScore, addScore] , [realScore, addScore] , ...] -> scores = [realScore, addScore] -> need get avg
            let realScores = scores.map((elm) => elm[0]);

            queryScoreInfo
              .get(method)
              .set(
                group,
                round2(
                  realScores.reduce((a, b) => a + b, 0) / realScores.length,
                  2
                ) + pointRangeData.get("max")
              );
          }
        }
      }

    if (queryScoreInfo.has("k01")) queryScoreInfo.delete("k01");
    if (queryScoreInfo.has("QSB")) queryScoreInfo.delete("QSB");

    // query

    let query = this.supabase
      .from("view_score")
      .select(
        "school_name,major_name,major_id,score,method_id,subject_group_id"
      )
      .limit(111);
    // queryExtraInfo;
    for (let [field, value] of queryExtraInfo.entries()) {
      if (Array.isArray(value) && value.length > 0) {
        const uniqueVals = [...new Set(value)];

        if (uniqueVals.length > 0) {
          // Xây dựng filter expression đúng cách
          const filterExpression = uniqueVals
            .map(
              (val) =>
                `${field}.eq.${typeof val === "string" ? `"${val}"` : val}`
            )
            .join(",");

          // Sử dụng .or() đúng cách
          query = query.or(filterExpression);
        }
      } else {
        query = query.eq(field, typeof val === "string" ? `"${value}"` : value);
      }
    }

    // Lọc converted_score >= min
    query = query.gte("converted_score", pointRangeData.get("min"));

    // queryScoreInfo
    let filterGroups = [];

    for (let [method, groupScores] of queryScoreInfo.entries()) {
      for (let [group, score] of groupScores.entries()) {
        filterGroups.push({
          method_id: `eq.${method}`,
          subject_group_id: `eq.${group}`,
          converted_score: `lte.${score}`,
        });
      }
    }

    if (filterGroups.length > 0)
      query = query.or(
        filterGroups
          .map(
            (group) =>
              `and(${Object.entries(group)
                .map(([k, v]) => `${k}.${v}`)
                .join(",")})`
          )
          .join(",")
      );

    // console.log(query);

    let { data, error } = await query;

    console.log(error);

    return error || data.length == 0 ? null : data;
  }
}
