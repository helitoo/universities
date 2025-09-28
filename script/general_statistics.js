const topMethod = [
  {
    id: "TN",
    quan: "31628",
  },
  {
    id: "HB",
    quan: "24187",
  },
  {
    id: "V-SAT",
    quan: "3163",
  },
  {
    id: "V-ACT",
    quan: "2546",
  },
  {
    id: "Khác",
    quan: "2248",
  },
  {
    id: "SPT",
    quan: "1707",
  },
  {
    id: "HSA",
    quan: "1504",
  },
];
const topSubjectGroup = [
  {
    id: "Khác",
    quan: "35115",
  },
  {
    id: "Tổng hợp",
    quan: "7184",
  },
  {
    id: "Toán-Văn-Anh",
    quan: "6983",
  },
  {
    id: "Toán-Lý-Hóa",
    quan: "6318",
  },
  {
    id: "Toán-Lý-Anh",
    quan: "5646",
  },
  {
    id: "Toán-Hóa-Anh",
    quan: "3322",
  },
  {
    id: "Toán-Lý-Tin",
    quan: "2415",
  },
];

const topSchool = [
  {
    id: "Khác",
    quan: "55048",
  },
  {
    id: "SGU",
    quan: "2532",
  },
  {
    id: "VAA",
    quan: "2444",
  },
  {
    id: "UTC2",
    quan: "2280",
  },
  {
    id: "T ĐH Kinh tế - Kỹ thuật Công nghiệp",
    quan: "1912",
  },
  {
    id: "UTT",
    quan: "1468",
  },
  {
    id: "CTU",
    quan: "1299",
  },
];

const topIndustry1 = [
  {
    id: "Khác",
    quan: "23773",
  },
  {
    id: "Công nghệ - Kỹ thuật",
    quan: "16531",
  },
  {
    id: "Kinh doanh - Quản lý",
    quan: "11617",
  },
  {
    id: "KHXH - NV",
    quan: "7237",
  },
];

const topIndustry3 = [
  {
    id: "Khác",
    quan: "60549",
  },
  {
    id: "Quản trị kinh doanh",
    quan: "3065",
  },
  {
    id: "IT",
    quan: "3011",
  },
  {
    id: "Kế toán",
    quan: "2028",
  },
  {
    id: "Tài chính - Ngân hàng",
    quan: "1825",
  },
  {
    id: "Ngôn ngữ Anh",
    quan: "1740",
  },
  {
    id: "Quản trị du lịch & lữ hành",
    quan: "1572",
  },
];

const topSchoolAvg = [
  {
    id: "VUFA",
    quan: 30.93,
  },
  {
    id: "HV Biên phòng",
    quan: 29.07,
  },
  {
    id: "T ĐH Chính trị",
    quan: 27.97,
  },
  {
    id: "MTA",
    quan: 27.75,
  },
  {
    id: "UIT - VNU-HCM",
    quan: 27.75,
  },
  {
    id: "UED - VNU-HN",
    quan: 27.74,
  },
  {
    id: "FTU2",
    quan: 27.68,
  },
  {
    id: "FTU",
    quan: 27.44,
  },
  {
    id: "DAV",
    quan: 26.97,
  },
  {
    id: "HBT",
    quan: 26.85,
  },
  {
    id: "AJC",
    quan: 26.44,
  },
  {
    id: "HUCE",
    quan: 26.31,
  },
  {
    id: "HUC",
    quan: 26.27,
  },
  {
    id: "SP2",
    quan: 26.22,
  },
  {
    id: "NEU",
    quan: 26.19,
  },
  {
    id: "HLU",
    quan: 26.165,
  },
  {
    id: "IUH",
    quan: 26.12,
  },
];

const topIndustry1Avg = [
  {
    id: "Sư phạm",
    quan: 25.9,
  },
  {
    id: "An ninh - Quốc phòng",
    quan: 22.99,
  },
  {
    id: "Toán - Thống kê",
    quan: 22.05,
  },
  {
    id: "KHXH & NV",
    quan: 22,
  },
  {
    id: "Báo chí & thông tin",
    quan: 21.8,
  },
];

const topIndustry3Avg = [
  {
    id: "Biên phòng",
    quan: 29.07,
  },
  {
    id: "Trinh sát",
    quan: 28.69,
  },
  {
    id: "Tình báo",
    quan: 28.69,
  },
  {
    id: "SP Sử",
    quan: 28.25,
  },
  {
    id: "SP Địa",
    quan: 28.08,
  },
  {
    id: "SP T.Êđê",
    quan: 28,
  },
  {
    id: "SP T.XêĐăng",
    quan: 28,
  },
  {
    id: "Nghệ thuật học",
    quan: 27.895,
  },
];

function addDonut(canvasId, dataJson, title) {
  new Chart(canvasId, {
    type: "doughnut",
    data: {
      labels: dataJson.map((item) => item.id),
      datasets: [
        {
          data: dataJson.map((item) => item.quan),
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

function addBar(canvasId, dataJson, title) {
  new Chart(canvasId, {
    type: "bar",
    data: {
      labels: dataJson.map((item) => item.id),
      datasets: [
        {
          data: dataJson.map((item) => item.quan),
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "logarithmic",
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return Number(value.toString());
            },
          },
        },
      },
    },
  });
}

addDonut("top-method", topMethod, "Những phương thức được dùng nhiều nhất");

addDonut(
  "top-subject-group",
  topSubjectGroup,
  "Những tổ hợp được dùng nhiều nhất"
);

addDonut("top-school", topSchool, "Các trường có quy mô tuyển sinh cao nhất");

addDonut(
  "top-industry1",
  topIndustry1,
  "Các nhóm ngành được tuyển sinh nhiều nhất"
);

addDonut("top-industry3", topIndustry3, "Các ngành được tuyển sinh nhiều nhất");

addBar(
  "top-school-avg",
  topSchoolAvg,
  "Các trường có trung vị điểm chuẩn (thang 30) cao nhất"
);

addBar(
  "top-industry1-avg",
  topIndustry1Avg,
  "Các nhóm ngành có trung vị điểm chuẩn (thang 30) cao nhất"
);

addBar(
  "top-industry3-avg",
  topIndustry3Avg,
  "Các ngành có trung vị điểm chuẩn (thang 30) cao nhất"
);
