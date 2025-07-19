import filterModel from "./filter_model.js";

import { getData } from "./code_model.js";

import {
  round2,
  getInRangeVal,
  getConvertedScore,
  getAddScore,
  getCompleteScore,
  getGroupDist,
  getDist,
  subjectGroups,
  isApplySubject,
  hasScoreGroup,
  getGroupScore,
} from "./score_convert_model.js";

import queryModel from "./query_model.js";

import { showLoading, hideLoading } from "./loading.js";

showLoading();

document.addEventListener("DOMContentLoaded", async () => {
  // const cooldown = 5000;
  // const lastRun = localStorage.getItem("lastRun");

  // if (lastRun && Date.now() - parseInt(lastRun) < cooldown) {
  //   alert(
  //     `Chỉ có thể xem trang này sau mỗi ${
  //       cooldown / 1000
  //     } s. Dữ liệu của bạn đã được lưu lại. Hãy quay lại sau.`
  //   );
  //   return;
  // }

  // localStorage.setItem("lastRun", Date.now().toString());

  let user = getData(new filterModel(), "Filter");

  let querier = new queryModel();
  querier.getApplyGroups(user.applySubject);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC KK
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if (user.ttcn.get("level").length != 0) {
    let kk = querier.calcKK(user.ttcn);

    if (kk == 2) {
      document.getElementById("tt-result").innerHTML =
        "Tuyển thẳng theo quy định của Bộ GDĐT";

      document.getElementById("utxt-result").innerHTML = "--";

      return;
    } else {
      document.getElementById("tt-result").innerHTML = "Không có";

      document.getElementById("utxt-result").innerHTML =
        "Có thể có theo quy định riêng của các trường Đại học";

      document.getElementById("kk-p-result").innerHTML = kk;
    }
  } else {
    document.getElementById("tt-result").innerHTML = "Không có";
    document.getElementById("utxt-result").innerHTML = "Không có";
    document.getElementById("kk-p-result").innerHTML = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC UT
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById("ut-p-result").innerHTML = querier.calcUT(
    user.priority
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC NN
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  querier.calcNN(user.ielts_P);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // COMPLETE THHB
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  for (let [subject, scores] of user.thhb_P.entries()) {
    if (!isApplySubject(user.applySubject, subject)) continue;

    if (scores[0] === null)
      switch (subject) {
        case "nv":
          scores[0] = 7;
          break;
        case "to":
        case "vl":
        case "hh":
        case "sh":
        case "nn":
          scores[0] = 8.5;
          break;
        default:
          scores[0] = 9.5;
      }

    if (scores[1] === null) scores[1] = round2(0.9 * scores[0], 2);

    for (let i = 2; i < scores.length; i++)
      if (scores[i] === null)
        scores[i] = round2((scores[i - 1] + scores[i - 2]) / 2, 2);
  }

  if (querier.extra.get("nn") > 0) {
    let convertedNN = false;

    for (let i = 0; i < user.thhb_P.get("nn"); i++)
      if (user.thhb_P.get("nn")[i] < querier.extra.get("nn")) {
        user.thhb_P.get("nn")[i] = querier.extra.get("nn");
        convertedNN = true;
      }

    document.getElementById("thhb-nn-convert-res").innerHTML = convertedNN
      ? `Điểm ngoại ngữ sau quy đổi: <strong>${querier.extra.get(
          "nn"
        )}</strong>.`
      : "Không quy đổi điểm ngoại ngữ.";
  }

  for (let scores of user.thhb_P.values()) {
    // index 6 : 6 HK
    scores.push(
      (scores[0] + scores[1] + scores[2] + scores[3] + scores[4] + scores[5]) /
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // COMPLETE THPT
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  for (let [subject, score] of user.thpt_P.entries()) {
    if (!isApplySubject(user.applySubject, subject)) continue;

    if (score == null) {
      if (subject == "c1" || subject == "c2") subject = "cn";

      let thptDist = await getDist(
        querier.supabase,
        "thpt",
        subject,
        new Date().getFullYear() - 1,
        10
      );

      user.thpt_P.set(
        subject,
        round2(
          getConvertedScore(
            user.thhb_P.get(subject)[5],
            { dist: [1, 1.5, 4, 4, 1], min: 6, max: 10 },
            thptDist
          ),
          2
        )
      );
    }
  }

  if (isApplySubject(user.applySubject, "nn") && querier.extra.get("nn") > 0) {
    if (querier.extra.get("nn") > user.thpt_P.get("nn")) {
      user.thpt_P.set("nn", querier.extra.get("nn"));
      document.getElementById(
        "thpt-nn-convert-res"
      ).innerHTML = `Điểm ngoại ngữ sau quy đổi: <strong>${querier.extra.get(
        "nn"
      )}</strong>.`;
    } else
      document.getElementById("thpt-nn-convert-res").innerHTML =
        "Không quy đổi điểm ngoại ngữ.";
  }

  user.thpt_P.set("cn", Math.max(user.thpt_P.get("c1"), user.thpt_P.get("c2")));

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC THHB CALC THPT
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if ([...user.thpt_P.values()].some((score) => score !== null)) {
    let thhbThptRes = "";

    for (let subjectGroup of querier.applyGroups) {
      thhbThptRes += `
    <tr>
      <td class="text-center fw-bold">${subjectGroup}</td>
      <td class="text-center">${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.thhb_P, 6, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</td>
      <td class="text-center">${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.thhb_P, 7, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</td>
      <td class="text-center">${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.thhb_P, 8, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</td>
      <td class="text-center">${querier.updateOnPlace(
        "thhb",
        round2(
          getCompleteScore(
            getGroupScore(subjectGroup, user.thhb_P, 9, {}),
            querier.extra.get("ut"),
            30
          ),
          2
        ),
        null,
        null
      )}</td>
      <td class="text-center">${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.thhb_P, 10, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</td>
      <td class="text-center">${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.thhb_P, 11, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</td>
      <td class="text-center">${querier.updateOnPlace(
        "thpt",
        round2(
          getCompleteScore(
            getGroupScore(subjectGroup, user.thpt_P, null, {}),
            querier.extra.get("ut"),
            30
          ),
          2
        ),
        "thpt",
        subjectGroup
      )}</td>
    </tr>
    `;
    }

    if (thhbThptRes.length > 0)
      document.getElementById("thhb-thpt-res").innerHTML = `
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Tổ hợp</th>
              <th>6 HK</th>
              <th>5 HK</th>
              <th>3 HK</th>
              <th>3 năm</th>
              <th>2 năm 1 HK</th>
              <th>1 năm</th>
              <th>TN</th>
            </tr>
          </thead>
          <tbody>
          ${thhbThptRes}
          </tbody>
        </table>
      </div>`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // GET A00
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let a00Dist = await getGroupDist(
    querier.supabase,
    "thpt",
    "G001",
    new Date().getFullYear() - 1,
    10,
    {}
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC HUST
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let hustRes = ``;

  if (user.dgtd_P !== null) {
    let hust_nn_add_p = 0;

    if (user.ielts_P == 5) hust_nn_add_p = 1;
    else if (user.ielts_P == 5.5) hust_nn_add_p = 2;
    else if (user.ielts_P == 6) hust_nn_add_p = 3;
    else if (user.ielts_P == 6.5) hust_nn_add_p = 4;
    else if (user.ielts_P == 7) hust_nn_add_p = 5;
    else if (user.ielts_P == 7.5) hust_nn_add_p = 6;
    else if (user.ielts_P >= 8) hust_nn_add_p = 7;

    hust_nn_add_p = (hust_nn_add_p * 3) / 10;

    let convertedScore = getConvertedScore(
      user.dgtd_P,
      await getDist(
        querier.supabase,
        "dgtd",
        "al",
        new Date().getFullYear() - 1,
        100
      ),
      a00Dist
    );

    hustRes += `<li><strong>K00</strong> (ĐGTD - TSA): <strong>${querier.updateOnPlace(
      "K00",
      round2(
        getCompleteScore(
          convertedScore + hust_nn_add_p,
          querier.extra.get("ut"),
          30
        ),
        2
      ),
      null,
      null
    )}</strong>. Trong đó, điểm cộng ngoại ngữ là <i>${hust_nn_add_p}</i>, điểm ưu tiên là <i>${getAddScore(
      convertedScore + hust_nn_add_p,
      querier.extra.get("ut"),
      30
    )}</i>.</li>`;
  }

  async function calcK01(subjectGroup, coefs, subjectGroupMsg) {
    let ans = "";

    if (!querier.applyGroups.includes(subjectGroup)) return ans;

    let thptDist = await getGroupDist(
      querier.supabase,
      "thpt",
      subjectGroup,
      new Date().getFullYear() - 1,
      10,
      coefs
    );

    let rawScore = getGroupScore(subjectGroup, user.thpt_P, null, coefs);

    let convertedScore = getConvertedScore(rawScore, thptDist, a00Dist);

    ans += `
    <li><strong>K01</strong> ${subjectGroup} ${subjectGroupMsg}: <strong>${querier.updateOnPlace(
      "K01",
      round2(getCompleteScore(convertedScore, querier.extra.get("ut"), 30), 2),
      null,
      null
    )}</strong>. Trong đó, điểm ưu tiên là <i>${getAddScore(
      convertedScore,
      querier.extra.get("ut"),
      30
    )}</i>.</li>`;

    return ans;
  }

  hustRes += await calcK01(
    "G003",
    { to: 3, nv: 1, vl: 2 },
    "Toán x3 + Văn + Lý x2"
  );

  hustRes += await calcK01(
    "G011",
    { to: 3, nv: 1, hh: 2 },
    "Toán x3 + Văn + Hóa x2"
  );

  hustRes += await calcK01(
    "G018",
    { to: 3, nv: 1, sh: 2 },
    "Toán x3 + Văn + Sinh x2"
  );

  hustRes += await calcK01(
    "G029",
    { to: 3, nv: 1, th: 2 },
    "Toán x3 + Văn + Tin x2"
  );

  if (hustRes.length > 0)
    document.getElementById("hust-res").innerHTML =
      `<div class="row fw-bold">Đại học Bách khoa Hà Nội:</div>
        <div class="row">
          <ul>` +
      hustRes +
      `
        </ul>
      </div>`;

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC DGHN
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if (user.dghn_P !== null) {
    let score = getConvertedScore(
      user.dghn_P,
      await getDist(
        querier.supabase,
        "dghn",
        "al",
        new Date().getFullYear() - 1,
        150
      ),
      a00Dist
    );

    document.getElementById(
      "dghn-res"
    ).innerHTML = `Điểm xét tuyển ĐGNL-ĐHQG-HN (HSA): <strong>${querier.updateOnPlace(
      "dghn",
      round2(getCompleteScore(score, querier.extra.get("ut"), 30), 2),
      null,
      null
    )}</strong>. Trong đó, điểm ưu tiên là <i>${getAddScore(
      score,
      querier.extra.get("ut"),
      30
    )}</i>`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC DGSG
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if ([...user.dgsg_P.values()].every((score) => score !== null)) {
    let convertedScore = getConvertedScore(
      user.dgsg_P.get("nn") + user.dgsg_P.get("to") + user.dgsg_P.get("kh"),
      await getDist(
        querier.supabase,
        "dgsg",
        "al",
        new Date().getFullYear() - 1,
        1200
      ),
      a00Dist
    );

    document.getElementById(
      "dgsg-res"
    ).innerHTML = `Điểm xét tuyển ĐGNL-ĐHQG-HCM (V-ACT): <strong>${querier.updateOnPlace(
      "dgsg",
      round2(getCompleteScore(convertedScore, querier.extra.get("ut"), 30), 2),
      null,
      null
    )}</strong>. Trong đó, điểm ưu tiên là <i>${getAddScore(
      convertedScore,
      querier.extra.get("ut"),
      30
    )}</i>`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC VSAT
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let haveVsat = false;

  for (let [subject, score] of user.vsat_P.entries())
    if (isApplySubject(user.applySubject, subject) && score !== null) {
      haveVsat = true;

      let thptDist = await getDist(
        querier.supabase,
        "thpt",
        subject,
        new Date().getFullYear() - 1,
        10
      );

      user.vsat_P.set(
        subject,
        round2(
          getConvertedScore(
            score,
            { dist: [0, 1, 5, 0], min: 0, max: 150 },
            thptDist
          ),
          2
        )
      );
    }

  if (haveVsat) {
    let vsatRes = `
    <div class="row fw-bold">Kỳ thi V-SAT:</div>
    <div class="row">
      <ul>`;

    for (let subjectGroup of querier.applyGroups) {
      if (!hasScoreGroup(subjectGroup, user.vsat_P)) continue;

      vsatRes += `
      <li><strong>${subjectGroup}</strong>: ${round2(
        getCompleteScore(
          getGroupScore(subjectGroup, user.vsat_P, null, {}),
          querier.extra.get("ut"),
          30
        ),
        2
      )}</li>`;
    }

    vsatRes += `
      </ul>
    </div>`;

    document.getElementById("vsat-res").innerHTML = vsatRes;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC DGCA
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if ([...user.dgca_P.values()].some((score) => score !== null)) {
    let dgcaScore = Math.max(
      user.dgca_P.get("ca1"),
      user.dgca_P.get("ca2"),
      user.dgca_P.get("ca3"),
      user.dgca_P.get("ca4")
    );

    let subjectGroupNames = new Map([
      ["A00", "G001"],
      ["A01", "G004"],
      ["B00", "G010"],
      ["B08", "G019"],
      ["C00", "G136"],
      ["C03", "G026"],
      ["D01", "G025"],
      ["D07", "G012"],
      ["D09", "G031"],
      ["D10", "G032"],
      ["K01", "G034"],
      ["K20", "G035"],
      ["K21", "G029"],
      ["K22", "G030"],
    ]);

    let dgcaRes = "";

    for (let [aliasSubjectGroup, subjectGroup] of subjectGroupNames.entries()) {
      if (!querier.applyGroups.includes(subjectGroup)) continue;

      let thptScore = getGroupScore(subjectGroup, user.thpt_P, null, {});

      let rawScore = 0.4 * thptScore + 0.18 * dgcaScore;

      dgcaRes += `
      <li><strong>${aliasSubjectGroup}</strong> - ${subjectGroup}: <strong>${querier.updateOnPlace(
        "dgca",
        round2(getCompleteScore(rawScore, querier.extra.get("ut"), 30), 2),
        null,
        null
      )}</strong>. Trong đó, điểm ưu tiên là <i>${getAddScore(
        rawScore,
        querier.extra.get("ut"),
        30
      )}</i></li>`;
    }

    if (dgcaRes.length > 0)
      document.getElementById(
        "dgca-res"
      ).innerHTML = `<div class="row fw-bold">Kỳ thi ĐGTSĐH CAND - Bộ Công an:</div>
      <div class="row">
        <ul>
        ${dgcaRes}
      </ul>
    </div>`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC DGSP
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if ([...user.dgsp_P.values()].some((score) => score !== null)) {
    const subjectGroupNames = new Map([
      ["A00", ["G001", {}, null, null, null]],
      ["A01", ["G004", {}, null, null, null]],
      ["B00", ["G046", {}, null, null, null]],
      ["B03", ["G002", {}, null, null, null]],
      ["C00", ["G136", {}, null, { nv: 2 }, null]],
      ["C03", ["G026", {}, null, null, null]],
      ["C04", ["G027", {}, null, null, null]],
      ["D01", ["G025", {}, { to: 2 }, { nv: 2 }, { an: 2 }]],
      ["D07", ["G012", {}, null, null, null]],
      ["D08", ["G019", {}, null, null, null]],
      ["D15", ["G132", {}, null, null, null]],
    ]);

    let dgspRes = "";

    for (let [aliasSubjectGroup, subjectGroup] of subjectGroupNames.entries()) {
      if (
        !querier.applyGroups.includes(subjectGroup[0]) ||
        !hasScoreGroup(subjectGroup[0], user.dgsp_P)
      )
        continue;

      let row = "<tr>";

      row += `<td class="text-center"><strong>${aliasSubjectGroup}</strong> - ${subjectGroup[0]}</td>`;

      for (let i = 1; i < 5; i++)
        if (subjectGroup[i] === null) row += `<td class="text-center">--</td>`;
        else
          row += `<td class="text-center">${querier.updateOnPlace(
            "dgsp",
            round2(
              getCompleteScore(
                getGroupScore(
                  subjectGroup[0],
                  user.dgsp_P,
                  null,
                  subjectGroup[i]
                ),
                querier.extra.get("ut"),
                30
              ),
              2
            ),
            null,
            null
          )}</td>`;

      dgspRes += row + "</tr>";
    }

    if (dgspRes.length > 0)
      document.getElementById("dgsp-res").innerHTML = `
    <div class="row fw-bold">Kỳ thi ĐGNL (SPT) - HNUE:</div>
    <div class="row">
      <table class="table table-bordered result-table">
        <thead>
          <th>Tổ hợp \\ Môn chính</th>
          <th>Không</th>
          <th>Toán</th>
          <th>Văn</th>
          <th>Anh</th>
        </thead>
        <tbody>
          ${dgspRes}
        </tbody>
      </table>
    </div>`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALC DGCB
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  if ([...user.dgcb_P.values()].some((score) => score !== null)) {
    let subjectGroupNames = new Map([
      ["A00", "G001"],
      ["A01", "G004"],
      ["A02", "G002"],
      ["B00", "G010"],
      ["B08", "G019"],
      ["C00", "G136"],
      ["C03", "G026"],
      ["C04", "G027"],
      ["D01", "G025"],
      ["D07", "G012"],
      ["D08", "G019"],
      ["D14", "G131"],
      ["D15", "G132"],
      ["X01", "G028"],
      ["X06", "G008"],
      ["X26", "G034"],
      ["X70", "G137"],
      ["X74", "G140"],
      ["X78", "G133"],
      ["X79", "G134"],
    ]);

    let dgcbRes = "";

    for (let [aliasSubjectGroup, subjectGroup] of subjectGroupNames.entries()) {
      if (!querier.applyGroups.includes(subjectGroup)) continue;

      let row = "<tr>";

      row += `<td class="text-center"><strong>${aliasSubjectGroup}</strong> - ${subjectGroup}</td>`;

      function getSubject(subjectGroup, index) {
        let ans = subjectGroups.get(subjectGroup)[index];
        if (ans == "nn") ans = "an";
        return ans;
      }

      for (let i = 0; i < 3; i++) {
        let subject = subjectGroups.get(subjectGroup)[i];

        if (subject == "nn") subject = "an";

        if (user.dgcb_P.get(subject) === null)
          row += `<td class="text-center">--</td>`;
        else
          row += `<td class="text-center">${querier.updateOnPlace(
            "dgcb",
            round2(
              getCompleteScore(
                0.5 * user.dgcb_P.get(getSubject(subjectGroup, i)) +
                  0.25 *
                    user.dgcb_P.get(getSubject(subjectGroup, (i + 1) % 3)) +
                  0.25 * user.dgcb_P.get(getSubject(subjectGroup, (i + 2) % 3)),
                querier.extra.get("ut"),
                30
              ),
              2
            ),
            null,
            null
          )}</td>`;
      }

      row += "</tr>";

      dgcbRes += row;
    }

    if (dgcbRes.length > 0)
      document.getElementById("dgcb-res").innerHTML = `
    <div class="row fw-bold">Kỳ thi ĐGNLCB (H-SCA) - HCMUE:</div>
    <div class="row">
      <table class="table table-bordered result-table">
        <thead>
          <th>Tổ hợp \\ Môn thi</th>
          <th>Môn 1</th>
          <th>Môn 2</th>
          <th>Môn 3</th>
        </thead>
        <tbody>
          ${dgcbRes}
        </tbody>
      </table>
    </div>`;
  }

  hideLoading();
});
