import filterModel from "./filter_model.js";
import queryModel from "./query_model.js";

import {
  resBox,
  ttcn_selectpicker,
  cerf_selectpicker,
} from "./html_code_consts.js";

import { getValidScore, getValidValue } from "./score_validator_model.js";

import {
  exportCode,
  importCode,
  importCodeFromRaw,
  removeCode,
  refreshCode,
  getData,
  saveData,
} from "./code_model.js";

import { showLoading, hideLoading } from "./loading.js";

import { getGroupName, getMethodeName } from "./score_convert_model.js";

function getRandColor() {
  const h = Math.floor(Math.random() * 23) * 15;
  const s = Math.floor(Math.random() * 40) + 40;
  const l = Math.floor(Math.random() * 40) + 40;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getHtmlTableBody(data) {
  let ans = "";

  for (let [group, scores] of data.entries()) {
    let row = "<tr>";

    row += `
        <td class="text-center">
          <strong>${getGroupName(group)}</strong>
        </td>`;

    if (Array.isArray(scores[0])) {
      for (let score of scores)
        row += `<td class="text-center"><strong>${score[0]}</strong> - ${score[1]}</td>`;
    } else
      row += `<td class="text-center"><strong>${scores[0]}</strong> - ${scores[1]}</td>`;

    row += "</tr>";
    ans += row;
  }

  return ans;
}

function addScoreBox(data, replacement, template) {
  if (data.size > 0)
    document.getElementById(replacement).innerHTML = template.replace(
      replacement,
      getHtmlTableBody(data)
    );
}

document.addEventListener("DOMContentLoaded", () => {
  let filterData = getData(new filterModel(), "Filter");

  // POINTER MOVING ON TABLE

  document.querySelectorAll(".thhb-p").forEach((elm) => {
    elm.addEventListener("keydown", (event) => {
      function moveX(subject, index) {
        let currElm = document.querySelector(
          `.thhb-p[data-subject="${subject}"][data-index="${index}"]`
        );

        currElm.focus();
        setTimeout(() => currElm.select(), 0);
      }

      function moveY(currRow, direction, index) {
        let currElm = document.querySelector(
          `.thhb-p[data-row="${currRow}"][data-index="${index}"]`
        );

        if (currElm.closest("tr").classList.contains("hidden"))
          moveY((currRow + direction) % 11, direction, index);
        else {
          currElm.focus();
          setTimeout(() => currElm.select(), 0);
        }
      }

      switch (event.key) {
        case "ArrowUp":
          moveY(
            (Number(event.target.dataset.row) - 1 + 11) % 11,
            -1 + 11,
            event.target.dataset.index
          );
          break;
        case "ArrowDown":
          moveY(
            (Number(event.target.dataset.row) + 1) % 11,
            1,
            event.target.dataset.index
          );
          break;
        case "ArrowLeft":
          moveX(
            event.target.dataset.subject,
            (Number(event.target.dataset.index) - 1 + 6) % 6
          );
          break;
        case "ArrowRight":
          moveX(
            event.target.dataset.subject,
            (Number(event.target.dataset.index) + 1) % 6
          );
          break;
      }
    });
  });

  document.querySelectorAll(`input[type="text"]`).forEach((elm) => {
    elm.addEventListener("focus", (event) => {
      event.target.select();
    });
  });

  // DATA INPUT DISPLAY STATUS

  document.querySelectorAll(".apply-subject").forEach((elm) => {
    elm.addEventListener("change", (event) => {
      function updateInputDisplayStatus(slt, isChecked) {
        document.querySelectorAll(slt).forEach((input) => {
          if (isChecked) input.classList.remove("hidden");
          else input.classList.add("hidden");
        });
      }

      updateInputDisplayStatus(
        `.thhb-input-${elm.dataset.subject}`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.thpt-input-${elm.dataset.subject}`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.dgsp-input-${elm.dataset.subject}`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.dgcb-input-${elm.dataset.subject}`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.vsat-input-${elm.dataset.subject}`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.dgca-input-${elm.dataset.subject}`,
        elm.checked
      );
    });
  });

  document.querySelectorAll(".apply-subject").forEach((elm) => {
    elm.dispatchEvent(new Event("change"));
  });

  // DATA VALIDATIONS

  function scoreValidate(elmSlt, exam) {
    document
      .querySelectorAll(elmSlt)
      .forEach((elm) =>
        elm.addEventListener(
          "blur",
          (event) =>
            (event.target.value = getValidScore(event.target.value, exam, 2))
        )
      );
  }

  scoreValidate(".thhb-p", "thhb");
  scoreValidate(".thpt-p", "thpt");
  scoreValidate("#dgtd-p", "dgtd");
  scoreValidate("#dghn-p", "dghn");
  scoreValidate(".dgsg-p", "dgsg");
  scoreValidate(".dgsp-p", "dgsp");
  scoreValidate(".dgcb-p", "dgcb");
  scoreValidate(".vsat-p", "vsat");
  scoreValidate(".dgca-p", "dgca");
  // scoreValidate(".thnk-p", "thnk");

  document.querySelectorAll(".dgsg-p").forEach((input) =>
    input.addEventListener("blur", (event) => {
      const subject = event.target.dataset.subject;
      let score = event.target.value;

      switch (subject) {
        case "nn":
          event.target.value = getValidValue(score, true, 0, 600, 2);
          break;
        case "to":
        case "kh":
          event.target.value = getValidValue(score, true, 0, 300, 2);
          break;
      }
    })
  );

  // document.querySelectorAll(".point-range-p").forEach((input) => {
  //   input.addEventListener("blur", (event) => {
  //     let value = parseFloat(
  //       event.target.value.replace(",", ".").replace(/[^0-9\.]/g, "")
  //     );

  //     if (isNaN(value)) {
  //       if (event.target.dataset.subject == "min") value = 15;
  //       else value = 1;
  //     }

  //     event.target.value = value;
  //   });
  // });

  document.getElementById("ielts-p").addEventListener("blur", (event) => {
    let value = parseFloat(
      event.target.value.replace(",", ".").replace(/[^0-9\.]/g, "")
    );

    if (isNaN(value)) value = 0;

    value = Math.max(value, 0);
    value = Math.min(value, 9);

    let decimal = value - Math.floor(value);
    if (decimal < 0.25) decimal = 0;
    else if (decimal <= 0.5) decimal = 0.5;
    else decimal = 1;

    value = Math.floor(value) + decimal;

    event.target.value = value;
  });

  // SELECTPICKER

  // document
  //   .getElementById("show-school-id")
  //   .addEventListener("click", (event) =>
  //     filterData.addSlpk(
  //       schoolId_selectpicker,
  //       [],
  //       "#hide-school-id",
  //       "school-id-replacement",
  //       "school_id"
  //     )
  //   );

  // document
  //   .getElementById("show-major-1")
  //   .addEventListener("click", (event) =>
  //     filterData.addSlpk(
  //       major1Id_selectpicker,
  //       [],
  //       "#hide-major-1",
  //       "major-1-replacement",
  //       "major_1"
  //     )
  //   );

  // document
  //   .getElementById("show-major-3")
  //   .addEventListener("click", (event) =>
  //     filterData.addSlpk(
  //       major3Id_selectpicker,
  //       [],
  //       "#hide-major-3",
  //       "major-3-replacement",
  //       "major_3"
  //     )
  //   );

  document
    .getElementById("show-ttcn")
    .addEventListener("click", (event) =>
      filterData.addSlpk(
        ttcn_selectpicker,
        [],
        "#hide-ttcn",
        "ttcn-replacement",
        "acv"
      )
    );

  document
    .getElementById("show-cerf")
    .addEventListener("click", (event) =>
      filterData.addSlpk(
        cerf_selectpicker,
        [],
        "#hide-cerf",
        "cerf-replacement",
        "cerf"
      )
    );

  // Calc dxt

  document
    .getElementById("calc-dxt")
    .addEventListener("click", async (event) => {
      showLoading();

      filterData.updateAtt();

      document.getElementById("dxt-res").innerHTML = resBox.get("dxt-res");

      let querier = new queryModel();

      await querier.calcExtra(filterData, new Date().getFullYear() - 1);

      await querier.calcMain(filterData, new Date().getFullYear() - 1);

      // Render data box

      addScoreBox(querier.main.get("thhb"), "thhb-res", resBox.get("thhb"));

      addScoreBox(querier.main.get("thpt"), "thpt-res", resBox.get("thpt"));

      addScoreBox(querier.main.get("dghn"), "dghn-res", resBox.get("dghn"));

      addScoreBox(querier.main.get("dgsg"), "dgsg-res", resBox.get("dgsg"));

      addScoreBox(querier.main.get("vsat"), "vsat-res", resBox.get("vsat"));

      addScoreBox(querier.main.get("dgca"), "dgca-res", resBox.get("dgca"));

      addScoreBox(querier.main.get("dgsp"), "dgsp-res", resBox.get("dgsp"));

      addScoreBox(querier.main.get("dgcb"), "dgcb-res", resBox.get("dgcb"));

      addScoreBox(querier.main.get("dgtd"), "dgtd-res", resBox.get("dgtd"));

      addScoreBox(querier.main.get("k01"), "k01-res", resBox.get("k01"));

      addScoreBox(querier.main.get("QSB"), "QSB-res", resBox.get("QSB"));

      // Render extra data

      document.getElementById("tt-res").innerHTML =
        querier.extra.get("kk") > 1
          ? "<strong>Tuyển thẳng</strong> theo quy định Bộ GDĐT"
          : "<strong>Không có</strong>";

      document.getElementById("ut-res").innerHTML =
        querier.extra.get("kk") > 0
          ? "<strong>Tùy</strong> vào chính sách các trường"
          : "<strong>Không có</strong>";

      document.getElementById("ut-p-res").innerHTML = `<strong>
            ${querier.extra.get("ut")}
          </strong> (thang 30)`;

      document.getElementById("kk-p-res").innerHTML = `<strong>
            ${querier.extra.get("kk")}
          </strong> (thang 30)`;

      // Render chart

      let { methodAvg, groupAvg } = querier.calcAvgField();

      new Chart("method-avg-chart", {
        type: "bar",
        data: {
          labels: [...methodAvg.keys()].map((methodId) =>
            getMethodeName(methodId)
          ),
          datasets: [
            {
              data: [...methodAvg.values()],
              backgroundColor: [...methodAvg.keys()].map((methodId) => {
                switch (methodId) {
                  case "thhb":
                    return "#007bff";
                  case "thpt":
                    return "#0463c8ff";
                  case "dghn":
                    return "#30ab4d";
                  case "dgsg":
                    return "#292f69";
                  case "dgca":
                    return "#006635";
                  case "vsat":
                    return "#007bff";
                  case "dgsp":
                    return "#183885";
                  case "dgcb":
                    return "#0053a6";
                  case "dgtd":
                    return "#db3545";
                  case "k01":
                    return "#b82d3bff";
                  case "QSB":
                    return "#042b94";
                }
              }),
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              color: "#333",
              title: {
                display: true,
                text: "Điểm trung bình",
              },
            },
            y: {
              beginAtZero: true,
              color: "#333",
              title: {
                display: true,
                text: "Các phương thức",
              },
            },
          },
        },
      });

      new Chart("group-avg-chart", {
        type: "bar",
        data: {
          labels: [...groupAvg.keys()]
            .slice(0, 10)
            .map((groupId) => getGroupName(groupId)),
          datasets: [
            {
              data: [...groupAvg.values()].slice(0, 10),
              backgroundColor: [...groupAvg.keys()]
                .slice(0, 10)
                .map(() => getRandColor()),
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              color: "#333",
              title: {
                display: true,
                text: "Điểm trung bình",
              },
            },
            y: {
              beginAtZero: true,
              color: "#333",
              title: {
                display: true,
                text: "Các tổ hợp",
              },
            },
          },
        },
      });

      hideLoading();
    });

  exportCode(filterData);
  importCode();
  importCodeFromRaw(filterData);
  refreshCode(filterData);

  saveData(filterData, "Filter");
  removeCode("Filter");
});
