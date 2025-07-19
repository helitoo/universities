import { subjectGroups } from "./score_convert_model.js";

export default class queryModel {
  main = new Map([
    ["thpt", -1],
    ["thhb", -1],
    ["dgsg", -1],
    ["dghn", -1],
    ["vsat", -1],
    ["dgsp", -1],
    ["dgcb", -1],
    ["dgca", -1],
    ["K00", -1],
    ["K01", -1],
    ["qsb", -1],
  ]);

  extra = new Map([
    ["kk", 0],
    ["ut", 0],
    ["nn", 0],
    ["thpt", null],
  ]);

  supabase = window.supabase.createClient(
    "https://djwhdufsuqhkmlysnqmc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqd2hkdWZzdXFoa21seXNucW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzczMDQsImV4cCI6MjA2NzgxMzMwNH0.4Y0xbucX14ln9Q11H5VUv9_bHgvfiNNqxXdUMWbHoFg"
  );

  applyGroups = [];

  // applySubjects : map

  getApplyGroups(applySubjects) {
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

  updateOnPlace(keyOfScore, score, keyOfName, name) {
    if (this.main.get(keyOfScore) > score) {
      this.main.set(keyOfScore, score);

      if (keyOfName !== null) this.extra.set(keyOfName, name);
    }

    return score;
  }

  calcKK(ttcn) {
    let kk_ps = [
      [0.25, 0.5, 0.75, 1],
      [1.25, 2, 2, 2],
      [2, 2, 2, 2],
    ];

    for (let i = 0; i < ttcn.get("level").length; i++) {
      let row = ttcn.get("level")[i];
      let col = ttcn.get("type")[i];

      this.extra.set("kk", kk_ps[row][col]);
    }

    return this.extra.get("kk");
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

    return this.extra.get("ut");
  }

  calcNN(ielts) {
    if (ielts < 5) this.extra.set("nn", 0);
    else if (ielts == 5) this.extra.set("nn", 8.5);
    else if (ielts == 5.5) this.extra.set("nn", 9);
    else if (ielts == 6) this.extra.set("nn", 9.5);
    else this.extra.set("nn", 10);

    return this.extra.get("nn");
  }
}
