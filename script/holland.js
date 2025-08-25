import hollandModel from "./holland_model.js";
import queryModel from "./query_model.js";

import { resBox } from "./html_code_consts.js";

import { showLoading, hideLoading } from "./loading.js";

import { getIndustry1Name } from "./score_convert_model.js";

import {
  getData,
  exportCode,
  importCode,
  importCodeFromRaw,
  removeCode,
  saveData,
  refreshCode,
} from "./code_model.js";

function getRandColor() {
  const h = Math.floor(Math.random() * 23) * 15;
  const s = Math.floor(Math.random() * 40) + 40;
  const l = Math.floor(Math.random() * 40) + 40;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  let hollandData = getData(new hollandModel(), "Holland");

  exportCode(hollandData);
  importCode();
  importCodeFromRaw(hollandData);
  removeCode(hollandData);
  refreshCode(hollandData);
  saveData(hollandData, "Holland");

  document.getElementById("show-res").addEventListener("click", () => {
    showLoading();

    let querier = new queryModel();

    hollandData.updateAtt();

    querier.calcHolland(hollandData);

    document.getElementById("holland-res").innerHTML =
      resBox.get("holland-res");

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

    hideLoading();
  });
});
