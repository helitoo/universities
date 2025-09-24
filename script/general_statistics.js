const topMethod = [
  {
    id: "TN",
    quan: "23015",
  },
  {
    id: "HB",
    quan: "16146",
  },
  {
    id: "Khác",
    quan: "4073",
  },
  {
    id: "V-ACT",
    quan: "2585",
  },
  {
    id: "V-SAT",
    quan: "2540",
  },
  {
    id: "Kết hợp",
    quan: "2449",
  },
  {
    id: "HSA",
    quan: "1250",
  },
];

const topSubjectGroup = [
  {
    id: "Khác",
    quan: "26303",
  },
  {
    id: "Các kỳ thi riêng",
    quan: "6023",
  },
  {
    id: "Toán-Văn-Anh",
    quan: "5539",
  },
  {
    id: "Toán-Lý-Hóa",
    quan: "4921",
  },
  {
    id: "Toán-Lý-Anh",
    quan: "4541",
  },
  {
    id: "Toán-Hóa-Anh",
    quan: "2804",
  },
  {
    id: "Toán-Lý-Tin",
    quan: "1927",
  },
];

const topSchool = [
  {
    id: "Khác",
    quan: "40302",
  },
  {
    id: "SGU",
    quan: "2532",
  },
  {
    id: "HHK",
    quan: "2444",
  },
  {
    id: "VAA",
    quan: "2280",
  },
  {
    id: "UNETI",
    quan: "1912",
  },
  {
    id: "UTT",
    quan: "1468",
  },
  {
    id: "UEF",
    quan: "1120",
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
    quan: "48263",
  },
  {
    id: "Quản trị kinh doanh",
    quan: "2418",
  },
  {
    id: "IT",
    quan: "2357",
  },
  {
    id: "Kế toán",
    quan: "1702",
  },
  {
    id: "Tài chính - Ngân hàng",
    quan: "1557",
  },
  {
    id: "Ngôn ngữ Anh",
    quan: "1374",
  },
  {
    id: "Quản trị du lịch",
    quan: "1307",
  },
];

const topSchoolAvg = [
  {
    id: "HV Biên phòng",
    quan: 29.07,
  },
  {
    id: "FTU2",
    quan: 28,
  },
  {
    id: "TĐH Chính trị",
    quan: 27.97,
  },
  {
    id: "UIT-VNU",
    quan: 27.81,
  },
  {
    id: "UED-VNU",
    quan: 27.8,
  },
  {
    id: "HV Kỹ thuật quân sự",
    quan: 27.75,
  },
  {
    id: "FTU",
    quan: 27.5,
  },
  {
    id: "DN UED",
    quan: 26.52,
  },
  {
    id: "HV Khoa học quân sự",
    quan: 26.44,
  },
  {
    id: "HUE",
    quan: 26.31,
  },
  {
    id: "HUC",
    quan: 26.27,
  },
  {
    id: "AJC",
    quan: 26.26875,
  },
  {
    id: "NEU",
    quan: 26.25,
  },
  {
    id: "SP2",
    quan: 26.22,
  },
  {
    id: "HLU",
    quan: 26.165,
  },
  {
    id: "UET-VNU",
    quan: 26.15,
  },
  {
    id: "IUH",
    quan: 26.12,
  },
  {
    id: "USSH-VNUHCM",
    quan: 26.1,
  },
];
const topIndustry1Avg = [
  {
    id: "Sư phạm",
    quan: 25.9,
  },
  {
    id: "Toán",
    quan: 23.875,
  },
  {
    id: "Báo chí",
    quan: 23.48,
  },
  {
    id: "An ninh - Quốc phòng",
    quan: 23.05,
  },
  {
    id: "KHXH - NV",
    quan: 23,
  },
  {
    id: "Pháp luật",
    quan: 22.5,
  },
  {
    id: "Khác",
    quan: 21.5,
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
    quan: 28.175,
  },
  {
    id: "SP Tiếng Nhật",
    quan: 28.1,
  },
  {
    id: "SP Địa",
    quan: 28.09,
  },
  {
    id: "Nghệ thuật học",
    quan: 27.895,
  },
  {
    id: "SP Tiếng Hàn",
    quan: 27.81,
  },
  {
    id: "Đồ họa",
    quan: 27.8,
  },
  {
    id: "Tình báo",
    quan: 27.75,
  },
  {
    id: "Chỉ huy kỹ thuật công binh",
    quan: 27.75,
  },
  {
    id: "Quân sự cơ sở",
    quan: 27.75,
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
