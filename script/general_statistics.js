const topMethod = [
  {
    id: "TN THPT",
    quan: 17731,
  },
  {
    id: "HB",
    quan: 17308,
  },
  {
    id: "V-ACT",
    quan: 2586,
  },
  {
    id: "Kết hợp",
    quan: 2359,
  },
  {
    id: "Ưu tiên xét tuyển",
    quan: 1838,
  },
  {
    id: "Khác",
    quan: 3025,
  },
];

const topSubjectGroup = [
  {
    id: "Các pt riêng không có tổ hợp",
    quan: "12285",
  },
  {
    id: "Toán-Văn-Anh",
    quan: "8391",
  },
  {
    id: "Toán-Lý-Hóa",
    quan: "8052",
  },
  {
    id: "Toán-Lý-Anh",
    quan: "7656",
  },
  {
    id: "Toán-Hóa-Anh",
    quan: "2941",
  },
  {
    id: "Khác",
    quan: "4609",
  },
  {
    id: "Toán-Lý-Văn",
    quan: "1093",
  },
];

const topSchool = [
  {
    id: "Khác",
    quan: "38516",
  },
  {
    id: "HCMUTE",
    quan: "2480",
  },
  {
    id: "CTU",
    quan: "966",
  },
  {
    id: "NEU",
    quan: "853",
  },
  {
    id: "NTH",
    quan: "775",
  },
  {
    id: "FTU",
    quan: "720",
  },
  {
    id: "TMU",
    quan: "717",
  },
];

const topIndustry1 = [
  {
    id: "Khác",
    quan: "31943",
  },
  {
    id: "Kinh doanh & quản lý",
    quan: "16971",
  },
  {
    id: "Công nghệ kỹ thuật",
    quan: "10505",
  },
  {
    id: "Máy tính và CNTT",
    quan: "6339",
  },
  {
    id: "KHXH & hành vi",
    quan: "5992",
  },
  {
    id: "Nhân văn",
    quan: "5783",
  },
  {
    id: "Kỹ thuật",
    quan: "5682",
  },
];

const topIndustry3 = [
  {
    id: "Khác",
    quan: "67420",
  },
  {
    id: "Quản trị kinh doanh",
    quan: "3575",
  },
  {
    id: "CNTT",
    quan: "2975",
  },
  {
    id: "Kế toán",
    quan: "2815",
  },
  {
    id: "Tài chính - Ngân hàng",
    quan: "2503",
  },
  {
    id: "Ngôn ngữ Anh",
    quan: "2289",
  },
  {
    id: "Quản trị dịch vụ du lịch & lữ hành",
    quan: "1638",
  },
];

const topSchoolAvg = [
  {
    id: "FTU2",
    quan: 27.5,
  },
  {
    id: "FTU",
    quan: 27.3,
  },
  {
    id: "UIT",
    quan: 26.5,
  },
  {
    id: "UED",
    quan: 26.4,
  },
  {
    id: "HV Khoa học Quân sự",
    quan: 26.09,
  },
  {
    id: "ULIS",
    quan: 26.07,
  },
  {
    id: "HV Kỹ thuật Quân sự",
    quan: 26.04,
  },
];

const topIndustry1Avg = [
  {
    id: "Sư phạm",
    quan: 21.4,
  },
  {
    id: "An ninh Quốc phòng",
    quan: 21.2,
  },
  {
    id: "Sức khỏe",
    quan: 18.6,
  },
  {
    id: "Khác",
    quan: 18.2,
  },
  {
    id: "Dịch vụ xã hội",
    quan: 17.9,
  },
  {
    id: "Toán & thống kê",
    quan: 17.8,
  },
  {
    id: "KHXH & hành vi",
    quan: 17.7,
  },
];

const topIndustry3Avg = [
  {
    id: "Sư phạm Tiếng Đức",
    quan: 27.7,
  },
  {
    id: "Điều tra hình sự",
    quan: 26.9,
  },
  {
    id: "Quảng cáo",
    quan: 26.8,
  },
  {
    id: "Văn hóa & truyền thông xuyên quốc gia",
    quan: 26.7,
  },
  {
    id: "Biên kịch điện ảnh truyền hình",
    quan: 26.4,
  },
  {
    id: "Giáo dục Quốc phòng - An ninh",
    quan: 25.7,
  },
  {
    id: "Giáo dục Đặc biệt",
    quan: 25.6,
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
  "Các trường có điểm chuẩn trung bình TN THPT (thang 30) cao nhất"
);

addBar(
  "top-industry1-avg",
  topIndustry1Avg,
  "Các nhóm ngành có điểm chuẩn trung bình TN THPT (thang 30) cao nhất"
);

addBar(
  "top-industry3-avg",
  topIndustry3Avg,
  "Các ngành có điểm chuẩn trung bình TN THPT (thang 30) cao nhất"
);
