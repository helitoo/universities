import filterModel from "./filter_model.js";
import hollandModel from "./holland_model.js";
import queryModel from "./query_model.js";

import {
  getGroupName,
  getMethodeName,
  getIndustry1Name,
} from "./score_convert_model.js";

import { showLoading, hideLoading } from "./loading.js";
import { getData } from "./code_model.js";

import {
  schoolId_selectpicker,
  major1Id_selectpicker,
  major3Id_selectpicker,
} from "./html_code_consts.js";

const htmlBoxTemplate = new Map([
  [
    "thhb",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-primary">
              <p class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-primary"
                  style="height: 1.3rem; margin-right: 0.2rem"
                >
                  <path
                    d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
                  />
                </svg>
                <strong class="text-primary">Học bạ:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>6 HK</th>
                  <th>5 HK</th>
                  <th>3 HK</th>
                  <th>3 năm</th>
                  <th>2 năm 1 HK</th>
                  <th>1 năm</th>
                </thead>
                <tbody>thhb-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "thpt",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-primary">
              <p class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-primary"
                  style="height: 1.3rem; margin-right: 0.2rem"
                >
                  <path
                    d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"
                  />
                  <path
                    d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z"
                  />
                  <path
                    d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z"
                  />
                </svg>
                <strong class="text-primary">Kỳ thi TN THPT:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp \\ Môn chính</th>
                  <th>Không</th>
                  <th>Môn 1</th>
                  <th>Môn 2</th>
                  <th>Môn 3</th>
                </thead>
                <tbody>thpt-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dghn",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-success">
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Vietnam_National_University_Logo.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong class="text-success">Kỳ thi ĐGNL ĐHQG-HN:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>dghn-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dgsg",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div
              class="col-md-10 rounded-3 p-3"
              style="border: 2px solid #292f69"
            >
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fb/VNUHCM_logo.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong style="color: #292f69">Kỳ thi ĐGNL ĐHQG-HCM:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>dgsg-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "vsat",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-primary">
              <p class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-primary"
                  style="height: 1.3rem; margin-right: 0.2rem"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <strong class="text-primary"
                  >Kỳ thi Đánh giá đầu vào Đại học - V-SAT:</strong
                >
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>vsat-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dgca",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div
              class="col-md-10 rounded-3 p-3"
              style="border: 2px solid #006635"
            >
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Vietnam_People%27s_Public_Security_Emblem.png"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong style="color: #006635"
                  >Kỳ thi Đánh giá tuyển sinh Đại học CAND:</strong
                >
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>dgca-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dgsp",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div
              class="col-md-10 rounded-3 p-3"
              style="border: 2px solid #183885"
            >
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/1/1e/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_S%C6%B0_ph%E1%BA%A1m_H%C3%A0_N%E1%BB%99i.png"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong style="color: #183885"
                  >Kỳ thi Đánh giá năng lực - HNUE:</strong
                >
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp \\ Môn chính</th>
                  <th>Không có</th>
                  <th>Môn 1</th>
                  <th>Môn 2</th>
                  <th>Môn 3</th>
                </thead>
                <tbody>dgsp-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dgcb",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div
              class="col-md-10 rounded-3 p-3"
              style="border: 2px solid #0053a6"
            >
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/9/9e/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_S%C6%B0_ph%E1%BA%A1m_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong style="color: #0053a6"
                  >Kỳ thi Đánh giá năng lực chuyên biệt - HCMUE:</strong
                >
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp \\ Môn thi</th>
                  <th>Môn 1</th>
                  <th>Môn 2</th>
                  <th>Môn 3</th>
                </thead>
                <tbody>dgcb-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "dgtd",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-danger">
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong class="text-danger">Kỳ thi Đánh giá tư duy (K00) - HUST:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>dgtd-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "k01",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div class="col-md-10 rounded-3 p-3 border border-2 border-danger">
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong class="text-danger">Đại học Bách khoa Hà Nội - K01:</strong>
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>k01-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
  [
    "QSB",
    `<div class="container my-4 rounded">
          <div class="row justify-content-center">
            <div
              class="col-md-10 rounded-3 p-3"
              style="border: 2px solid #042b94"
            >
              <p class="mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f0/HCMCUT.svg"
                  style="height: 1.3rem; margin-right: 0.2rem"
                  draggable="false"
                />
                <strong style="color: #042b94"
                  >Trường học Bách khoa - ĐHQG-HCM:</strong
                >
              </p>
              <table class="table table-bordered">
                <thead>
                  <th>Tổ hợp</th>
                  <th>Điểm xét tuyển</th>
                </thead>
                <tbody>QSB-res</tbody>
              </table>
            </div>
          </div>
        </div>`,
  ],
]);

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

function addRcmMajorBox(replacement, schoolName, majors) {
  document.getElementById(replacement).innerHTML += `
    <div class="container my-4 rounded">
      <div class="row justify-content-center">
        <div
          class="rounded-4 p-3 border border-2 border-light-subtle bg-body-tertiary"
        >
          <div class="fw-bold fs-4 my-0">
            ${schoolName}
          </div>
          <ul class="mt-4 mb-0">
          ${majors
            .map(
              (major) =>
                `
                <li class="mt-4"><strong>${major.major_name}</strong></li>
                  <i>${major.major_id}</i>
                  ${major.note ? `<div class="mt-1">${major.note}</div>` : ""}
                  <div class="mt-1">
                    <span
                      class="p-1 rounded border border-success text-success bg-white"
                      >${getMethodeName(major.method_id)}</span
                    >
                    <span
                      class="p-1 rounded border border-warning text-warning bg-white"
                      >${getGroupName(major.subject_group_id)}</span
                    >
                    <span
                      class="p-1 rounded border border-primary text-primary bg-white fw-bold"
                      >${major.score}đ</span
                    >
                  </div>`
            )
            .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  showLoading();

  localStorage.setItem("query-res-lastRun", Date.now().toString());

  // Calc data

  let filterData = getData(new filterModel(), "Filter");
  let hollandData = getData(new hollandModel(), "Holland");

  let querier = new queryModel();

  await querier.calcExtra(filterData, new Date().getFullYear() - 1);

  await querier.calcMain(filterData, new Date().getFullYear() - 1);

  // Render data box

  addScoreBox(
    querier.main.get("thhb"),
    "thhb-res",
    htmlBoxTemplate.get("thhb")
  );

  addScoreBox(
    querier.main.get("thpt"),
    "thpt-res",
    htmlBoxTemplate.get("thpt")
  );

  addScoreBox(
    querier.main.get("dghn"),
    "dghn-res",
    htmlBoxTemplate.get("dghn")
  );

  addScoreBox(
    querier.main.get("dgsg"),
    "dgsg-res",
    htmlBoxTemplate.get("dgsg")
  );

  addScoreBox(
    querier.main.get("vsat"),
    "vsat-res",
    htmlBoxTemplate.get("vsat")
  );

  addScoreBox(
    querier.main.get("dgca"),
    "dgca-res",
    htmlBoxTemplate.get("dgca")
  );

  addScoreBox(
    querier.main.get("dgsp"),
    "dgsp-res",
    htmlBoxTemplate.get("dgsp")
  );

  addScoreBox(
    querier.main.get("dgcb"),
    "dgcb-res",
    htmlBoxTemplate.get("dgcb")
  );

  addScoreBox(
    querier.main.get("dgtd"),
    "dgtd-res",
    htmlBoxTemplate.get("dgtd")
  );

  addScoreBox(querier.main.get("k01"), "k01-res", htmlBoxTemplate.get("k01"));

  addScoreBox(querier.main.get("QSB"), "QSB-res", htmlBoxTemplate.get("QSB"));

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
      labels: [...methodAvg.keys()].map((methodId) => getMethodeName(methodId)),
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

  if (hollandData.apply) {
    querier.calcHolland(hollandData);

    let chartBox = document.getElementById("chart-box");

    // Riasec chart

    let riasecChart = document.createElement("canvas");
    riasecChart.id = "riasec-chart";
    riasecChart.classList.add("mt-5");
    riasecChart.style.width = "100%";
    chartBox.appendChild(riasecChart);

    new Chart("riasec-chart", {
      type: "bar",
      data: {
        labels: [...querier.hollandAns.keys()].map((code) =>
          code.toUpperCase()
        ),
        datasets: [
          {
            data: [...querier.hollandAns.values()],
            backgroundColor: [...querier.hollandAns.keys()].map((code) => {
              switch (code) {
                case "r":
                  return "#004f94";
                case "i":
                  return "#00a6ed";
                case "a":
                  return "#e39b00";
                case "s":
                  return "#ed688c";
                case "e":
                  return "#e03434";
                case "c":
                  return "#5ebd4f";
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
              text: "Điểm số",
            },
          },
          y: {
            beginAtZero: true,
            color: "#333",
            title: {
              display: true,
              text: "Các nhóm tính cách",
            },
          },
        },
      },
    });

    // Major from holland chart

    let majorChart = document.createElement("canvas");
    majorChart.id = "major-chart";
    majorChart.classList.add("mt-5");
    majorChart.style.width = "100%";
    chartBox.appendChild(majorChart);

    new Chart("major-chart", {
      type: "bar",
      data: {
        labels: [...querier.majorFreqs.keys()].map((code) =>
          getIndustry1Name(code)
        ),
        datasets: [
          {
            data: [...querier.majorFreqs.values()],
            backgroundColor: [...querier.majorFreqs.keys()].map(() =>
              getRandColor()
            ),
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
              text: "Mức độ phù hợp với tính cách",
            },
          },
          y: {
            beginAtZero: true,
            color: "#333",
            title: {
              display: true,
              text: "Các nhóm ngành",
            },
          },
        },
      },
    });
  }

  document
    .getElementById("show-school-id")
    .addEventListener("click", (event) =>
      filterData.addSlpk(
        schoolId_selectpicker,
        [],
        "#hide-school-id",
        "school-id-replacement",
        "school_id"
      )
    );

  document
    .getElementById("show-major-1")
    .addEventListener("click", (event) =>
      filterData.addSlpk(
        major1Id_selectpicker,
        [],
        "#hide-major-1",
        "major-1-replacement",
        "major_1"
      )
    );

  document
    .getElementById("show-major-3")
    .addEventListener("click", (event) =>
      filterData.addSlpk(
        major3Id_selectpicker,
        [],
        "#hide-major-3",
        "major-3-replacement",
        "major_3"
      )
    );

  document.getElementById("num-rcm-major").addEventListener("blur", (event) => {
    let value = parseInt(event.target.value);

    if (!isNaN(value)) {
      value = Math.max(1, value);
      value = Math.min(444, value);
    }

    event.target.value = value;
  });

  document.querySelectorAll("input[type='text']").forEach((input) => {
    input.addEventListener("focus", (event) => {
      event.target.select();
    });
  });

  hideLoading();

  document
    .getElementById("search-rcm-major")
    .addEventListener("click", async () => {
      showLoading();

      let queryExtraInfo = new Map();

      function getExtraInfo(key, inputSlt, isNumber, isCheckbox) {
        let values = [];

        document.querySelectorAll(inputSlt).forEach((elm) => {
          if ((isCheckbox && elm.checked) || !isCheckbox)
            values.push(isNumber ? parseFloat(elm.value) : elm.value);
        });

        if (values.length > 0) queryExtraInfo.set(key, values);
      }

      getExtraInfo("school_id", ".school-id", false, false);
      getExtraInfo("industry_l1_id", ".major-1-id", false, false);
      getExtraInfo("major_id", ".major-3-id", false, false);
      getExtraInfo("school_public", ".school-type", true, true);
      getExtraInfo("school_region", ".school-region", false, true);

      let appliedMethods = [];
      document.querySelectorAll(".applied-method").forEach((elm) => {
        if (elm.checked) appliedMethods.push(elm.value);
      });

      let pointRangeData = new Map([
        ["min", document.getElementById("min-score").value],
        ["max", document.getElementById("max-score").value],
      ]);

      let numRcmMajor = parseInt(
        document.getElementById("num-rcm-major").value
      );

      let rcmMajors = await querier.getRcmdMajor(
        queryExtraInfo,
        filterData.cerf,
        pointRangeData,
        appliedMethods,
        numRcmMajor
      );

      if (rcmMajors == null) {
        alert("Không tìm thấy ngành!");
      } else {
        let rcmMajorGroupBySchool = new Map();

        for (let rcmMajor of rcmMajors) {
          if (!rcmMajorGroupBySchool.has(rcmMajor.school_name))
            rcmMajorGroupBySchool.set(rcmMajor.school_name, []);
          rcmMajorGroupBySchool.get(rcmMajor.school_name).push(rcmMajor);
        }

        document.getElementById("rcm-major-replacement").innerHTML = "";

        for (let schoolName of rcmMajorGroupBySchool.keys())
          addRcmMajorBox(
            "rcm-major-replacement",
            schoolName,
            rcmMajorGroupBySchool.get(schoolName)
          );
      }

      hideLoading();
    });
});
