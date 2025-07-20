import { getScore, round2 } from "./score_convert_model.js";

import queryModel from "./query_model.js";

import { showLoading, hideLoading } from "./loading.js";

function getRandColor() {
  const h = Math.floor(Math.random() * 23) * 15;
  const s = Math.floor(Math.random() * 40) + 40;
  const l = Math.floor(Math.random() * 40) + 40;
  return { h, s, l };
}

document.addEventListener("DOMContentLoaded", (event) => {
  let chart = new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [],
    },
    options: {
      animation: {},
      responsive: true,
      scales: {
        x: {
          type: "linear",
          color: "#333",
          title: {
            display: true,
            text: "Mốc điểm",
          },
        },
        y: {
          beginAtZero: true,
          color: "#333",
          title: {
            display: true,
            text: "Số thí sinh",
          },
        },
      },
    },
  });

  let querier = new queryModel();

  let distInfoIds = []; // Each element is `${exam}-${subject}-${year}`

  let stdBase = null;

  document
    .getElementById("add-dist")
    .addEventListener("click", async (event) => {
      // Get querry info

      let info = {
        exam: document.getElementById("exam").value,
        subject: document.getElementById("subject").value,
        year: document.getElementById("year").value,
        base: null,
      };

      switch (info.exam) {
        case "thpt":
        case "dgcb":
          info.base = 10;
          break;
        case "dgtd":
          info.base = 100;
          break;
        case "dghn":
          info.base = 150;
          break;
        case "dgsg":
          info.base = 1200;
          break;
      }

      let infoId = `${info.exam}-${info.subject}-${info.year.slice(2, 4)}`;

      if (distInfoIds.includes(infoId)) {
        alert("Phổ điểm đã được thêm rồi.");
        return;
      }

      distInfoIds.push(infoId);

      // Quering

      showLoading();

      let { data, error } = await querier.supabase
        .from("exam_distribution")
        .select("distribution, min, max, base")
        .eq("method_id", info.exam)
        .eq("subject_id", info.subject)
        .eq("year", info.year);

      hideLoading();

      if (error || data.length == 0) {
        alert("Hiện không có phổ điểm này. Hãy quay lại sau.");
        return;
      }

      if (distInfoIds.length == 1) stdBase = info.base;

      // Calc chart attributes

      let label = null;
      switch (info.exam) {
        case "thpt":
          label = "TN";
          break;
        case "dgtd":
          label = "TSA";
          break;
        case "dghn":
          label = "HSA";
          break;
        case "dgsg":
          label = "V-ACT";
          break;
        case "dgcb":
          label = "H-SCA";
          break;
      }
      label += `-${info.subject}-${info.year.slice(2, 4)}`;

      let rsl = getRandColor();
      let backgroundColor = `hsla(${rsl.h}, ${rsl.s}%, ${rsl.l}%, 0.3)`;
      let borderColor = `hsl(${rsl.h}, ${rsl.s}%, ${rsl.l - 30}%)`;

      let dataset = [];
      for (let i = 0; i < data[0].distribution.length; i++)
        dataset.push({
          x: round2(
            (getScore(
              i,
              data[0].min,
              data[0].max,
              data[0].distribution.length
            ) /
              data[0].base) *
              stdBase,
            2
          ),
          y: data[0].distribution[i],
        });

      chart.data.datasets.push({
        label: label,
        data: dataset,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
        tension: 0,
        showLine: true,
      });

      chart.update();
    });
});
