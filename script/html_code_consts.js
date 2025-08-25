export const resBox = new Map([
  [
    "dxt-res",
    `
        <div class="card shadow-sm my-2">
        <div class="card-body">
          <h5 class="card-title">Điểm xét tuyển</h5>
          <div class="container my-4 rounded">
            <div class="row justify-content-center">
              <div
                class="col-md-10 rounded-3 p-3 border border-2 border-success"
              >
                <p class="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6 text-success"
                    style="height: 1.3rem; margin-right: 0.2rem"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <strong class="text-success"
                    >Thông tin Ưu tiên xét tuyển & Tuyển thẳng:</strong
                  >
                </p>
                <ul class="mb-0">
                  <li class="mt-1">
                    Diện tuyển thẳng:
                    <span id="tt-res"></span>.
                  </li>
                  <li class="mt-1">
                    Diện ưu tiên xét tuyển:
                    <span id="ut-res"></span>.
                  </li>
                  <li class="mt-1">
                    Mức điểm cộng ưu tiên :
                    <span id="ut-p-res"></span>.
                  </li>
                  <li class="mt-1">
                    Mức điểm cộng khuyến khích <i>(tham khảo)</i>:
                    <span id="kk-p-res"></span>.
                  </li>
                </ul>
                <p class="mt-3 text-success fw-bold">Chú ý:</p>
                <ul>
                  <li>
                    <i>Mức điểm cộng</i> là điểm cộng tối đa mà bạn có thể nhận
                    được để xét tuyển
                    <i>(bao gồm điểm ưu tiên và điểm khuyến khích)</i>. Điểm thi
                    / HB của bạn càng cao thì điểm cộng thực tế càng giảm so với
                    mức điểm cộng.
                  </li>
                  <li class="mt-2">
                    Ký hiệu điểm <strong>"Điểm xét tuyển - Điểm cộng"</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="thhb-res"></div>
          <div id="thpt-res"></div>
          <div id="dghn-res"></div>
          <div id="dgsg-res"></div>
          <div id="vsat-res"></div>
          <div id="dgca-res"></div>
          <div id="dgsp-res"></div>
          <div id="dgcb-res"></div>
          <div id="dgtd-res"></div>
          <div id="k01-res"></div>
          <div id="QSB-res"></div>
          <div class="container my-4 rounded">
            <div class="row justify-content-center">
              <div
                id="chart-box"
                class="col-md-10 rounded-3 p-3 border border-2 border-info"
              >
                <p class="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 text-info"
                    style="height: 1.3rem; margin-right: 0.2rem"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>
                  <strong class="text-info">Thông tin thống kê:</strong>
                </p>
                <canvas id="method-avg-chart" style="width: 100%"></canvas>
                <canvas
                  id="group-avg-chart"
                  style="width: 100%"
                  class="mt-5"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  ],
  [
    "holland-res",
    `<div class="card shadow-sm my-2">
        <div class="card-body">
          <h5 class="card-title">Kết quả Trắc nghiệm tính cách</h5>
          <canvas class="mt-5 w-100" id="riasec-chart"></canvas>
          <canvas class="mt-5 w-100" id="major-chart"></canvas>
        </div>
      </div>`
  ],
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

export const schoolId_selectpicker = `<select class="selectpicker school-id" data-live-search="true" data-size="5">
    <option data-tokens="QHL UL" value="QHL">
    TĐH Luật, ĐHQG HN
    </option>
    <option data-tokens="QHQ IS QT" value="QHQ">
    T Quốc tế, ĐHQG HN
    </option>
    <option data-tokens="QHY UMP YD" value="QHY">
    TĐH Y Dược, ĐHQG HN
    </option>
    <option data-tokens="QHI UET CN" value="QHI">
    TĐH Công nghệ, ĐHQG HN
    </option>
    <option data-tokens="QHE UEB KT" value="QHE">
    TĐH Kinh tế, ĐHQG HN
    </option>
    <option data-tokens="QHS UED GD" value="QHS">
    TĐH Giáo dục, ĐHQG HN
    </option>
    <option data-tokens="QHT HUS KHTN" value="QHT">
    TĐH Khoa học tự nhiên, ĐHQG HN
    </option>
    <option data-tokens="QHX HUSSH KHXH" value="QHX">
    TĐH Khoa học Xã hội và Nhân văn, ĐHQG HN
    </option>
    <option data-tokens="QHD HSB QTKD" value="QHD">
    T Quản trị và kinh doanh, ĐHQG HN
    </option>
    <option data-tokens="QHF ULIS NN" value="QHF">
    TĐH Ngoại ngữ, ĐHQG HN
    </option>
    <option data-tokens="VJU VJU" value="VJU">
    TĐH Việt Nhật, ĐHQG HN
    </option>
    <option data-tokens="NVH VNAM" value="NVH">
    HV Âm nhạc Quốc gia VN
    </option>
    <option data-tokens="HBT AJC" value="HBT">
    HV Báo chí Tuyên truyền
    </option>
    <option data-tokens="HCP APD" value="HCP">
    HV Chính sách và Phát triển
    </option>
    <option data-tokens="BVH PTIT" value="BVH">
    HV Công nghệ Bưu chính Viễn thông
    </option>
    <option data-tokens="HCH NAPA" value="HCH">
    HV Hành chính Quốc gia
    </option>
    <option data-tokens="KMA KMA" value="KMA">
    HV Kỹ thuật Mật mã
    </option>
    <option data-tokens="NHH BAV" value="NHH">HV Ngân hàng</option>
    <option data-tokens="HQT DAV" value="HQT">HV Ngoại giao</option>
    <option data-tokens="HVN VNUA" value="HVN">
    HV Nông nghiệp VN
    </option>
    <option data-tokens="HPN VWA" value="HPN">
    HV Phụ nữ VN
    </option>
    <option data-tokens="HVQ NAEM" value="HVQ">
    HV Quản lý Giáo dục
    </option>
    <option data-tokens="HTC AOF" value="HTC">HV Tài chính</option>
    <option data-tokens="HTN VYA" value="HTN">
    HV Thanh Thiếu niên VN
    </option>
    <option data-tokens="HTA" value="HTA">HV Tòa án</option>
    <option data-tokens="HYD VUTM" value="HYD">
    HV Y - Dược học cổ truyền VN
    </option>
    <option data-tokens="BKA HUST, BKU" value="BKA">
    ĐH Bách khoa HN
    </option>
    <option data-tokens="LDA TUU" value="LDA">
    TĐH Công đoàn
    </option>
    <option data-tokens="GTA UTT" value="GTA">
    TĐH Công nghệ Giao thông vận tải
    </option>
    <option data-tokens="CCM HICT" value="CCM">
    TĐH Công nghiệp Dệt may HN
    </option>
    <option data-tokens="DCN HaUI" value="DCN">
    TĐH Công nghiệp HN
    </option>
    <option data-tokens="VHD VIU" value="VHD">
    TĐH Công nghiệp Việt Hung
    </option>
    <option data-tokens="DDN DNU" value="DDN">TĐH Đại Nam</option>
    <option data-tokens="DDL EPU" value="DDL">TĐH Điện lực</option>
    <option data-tokens="DKH HUP" value="DKH">
    TĐH Dược HN
    </option>
    <option data-tokens="FPT FPTU" value="FPT">TĐH FPT</option>
    <option data-tokens="GHA UTC" value="GHA">
    TĐH Giao thông vận tải
    </option>
    <option data-tokens="NHF HANU" value="NHF">TĐH HN</option>
    <option data-tokens="ETU" value="ETU">TĐH Hòa Bình</option>
    <option data-tokens="KCN USTH" value="KCN">
    TĐH Khoa học và Công nghệ HN
    </option>
    <option data-tokens="DKS HPU" value="DKS">
    TĐH Kiểm sát HN
    </option>
    <option data-tokens="KTA HAU" value="KTA">
    TĐH Kiến trúc HN
    </option>
    <option data-tokens="DKK UNETI" value="DKK">
    TĐH Kinh tế Kỹ thuật Công nghiệp
    </option>
    <option data-tokens="KHA NEU" value="KHA">
    TĐH Kinh tế Quốc dân
    </option>
    <option data-tokens="LNH VNUF" value="LNH">
    TĐH Lâm nghiệp
    </option>
    <option data-tokens="DLX ULSA" value="DLX">
    TĐH Lao động Xã hội
    </option>
    <option data-tokens="LPH HLU" value="LPH">
    TĐH Luật HN
    </option>
    <option data-tokens="MDA HUMG" value="MDA">
    TĐH Mỏ Địa chất HN
    </option>
    <option data-tokens="MTC UAD" value="MTC">
    TĐH Mỹ thuật Công nghiệp
    </option>
    <option data-tokens="MTH VUFA" value="MTH">
    TĐH Mỹ thuật VN
    </option>
    <option data-tokens="NTH FTU" value="NTH">
    TĐH Ngoại thương
    </option>
    <option data-tokens="NTU" value="NTU">TĐH Nguyễn Trãi</option>
    <option data-tokens="SKD" value="SKD">
    TĐH Sân khấu Điện ảnh
    </option>
    <option data-tokens="SPH HNUE" value="SPH">
    TĐH Sư phạm HN
    </option>
    <option data-tokens="GNT" value="GNT">
    TĐH Sư phạm Nghệ thuật Trung ương HN
    </option>
    <option data-tokens="TDH HUPES" value="TDH">
    TĐH Sư phạm Thể dục thể thao HN
    </option>
    <option data-tokens="FBU FPU" value="FBU">
    TĐH Tài chính Ngân hàng HN
    </option>
    <option data-tokens="DMT HUNRE" value="DMT">
    TĐH Tài nguyên và Môi T HN
    </option>
    <option data-tokens="DTL" value="DTL">TĐH Thăng Long</option>
    <option data-tokens="TDD" value="TDD">TĐH Thành Đô</option>
    <option data-tokens="HNM HNMU" value="HNM">
    TĐH Thủ đô HN
    </option>
    <option data-tokens="TMU TMU" value="TMU">
    TĐH Thương mại
    </option>
    <option data-tokens="TLA TLU" value="TLA">TĐH Thủy lợi</option>
    <option data-tokens="VHH HUC" value="VHH">
    TĐH Văn hóa HN
    </option>
    <option data-tokens="XDA HUCE" value="XDA">
    TĐH Xây dựng HN
    </option>
    <option data-tokens="YHB HMU" value="YHB">TĐH Y HN</option>
    <option data-tokens="YTC" value="YTC">
    TĐH Y tế Công cộng
    </option>
    <option data-tokens="DCQ" value="DCQ">
    TĐH Công nghệ và Quản lý Hữu nghị
    </option>
    <option data-tokens="DDU" value="DDU">TĐH Đông Đô</option>
    <option data-tokens="DQK" value="DQK">
    TĐH Kinh doanh và Công nghệ HN
    </option>
    <option data-tokens="DPD" value="DPD">TĐH Phương Đông</option>
    <option data-tokens="MHN HOU" value="MHN">
    TĐH Mở HN
    </option>
    <option data-tokens="PKA" value="PKA">TĐH Phenikaa</option>
    <option data-tokens="CMC CMCU" value="CMC">TĐH CMC</option>
    <option data-tokens="QSY UHS" value="QSY">
    TĐH Khoa học sức khỏe, ĐHQG TP.HCM
    </option>
    <option data-tokens="QSB HCMUT, BKU" value="QSB">
    TĐH Bách Khoa, ĐHQG TP.HCM
    </option>
    <option data-tokens="QSC UIT" value="QSC">
    TĐH Công nghệ thông tin, ĐHQG TP.HCM
    </option>
    <option data-tokens="QST US HCMUS" value="QST">
    TĐH Khoa học tự nhiên, ĐHQG TP.HCM
    </option>
    <option data-tokens="QSX HCMUSSH" value="QSX">
    TĐH Khoa học xã hội và Nhân văn, ĐHQG TP.HCM
    </option>
    <option data-tokens="QSQ HCMIU" value="QSQ">
    TĐH Quốc tế, ĐHQG TP.HCM
    </option>
    <option data-tokens="QSK UEL" value="QSK">
    TĐH Kinh tế - Luật, ĐHQG TP.HCM
    </option>
    <option data-tokens="HVC HCA" value="HVC">HV Cán bộ TP.HCM</option>
    <option data-tokens="BVS PTIT" value="BVS">
    HV Công nghệ Bưu chính Viễn thông - Cơ sở TP.HCM
    </option>
    <option data-tokens="HHK VAA" value="HHK">
    HV Hàng không VN
    </option>
    <option data-tokens="NVS" value="NVS">Nhạc viện TP.HCM</option>
    <option data-tokens="DCT HUIT" value="DCT">
    TĐH Công thương TP.HCM
    </option>
    <option data-tokens="IUH UIH" value="IUH">
    TĐH Công nghiệp TP.HCM
    </option>
    <option data-tokens="GSA UTC2" value="GSA">
    TĐH Giao thông vận tải - Cơ sở 2
    </option>
    <option data-tokens="GTS UTH" value="GTS">
    TĐH Giao thông vận tải TP.HCM
    </option>
    <option data-tokens="HSU HSU" value="HSU">TĐH Hoa Sen</option>
    <option data-tokens="KTS UAH" value="KTS">
    TĐH Kiến trúc TP.HCM
    </option>
    <option data-tokens="UEF UEF" value="UEF">
    TĐH Kinh tế - Tài chính TP.HCM
    </option>
    <option data-tokens="KSA UEH" value="KSA">
    TĐH Kinh tế TP.HCM
    </option>
    <option data-tokens="DLS ULSA" value="DLS">
    TĐH Lao động Xã hội - Cơ sở TP.HCM
    </option>
    <option data-tokens="LPS UL" value="LPS">
    TĐH Luật TP.HCM
    </option>
    <option data-tokens="MBS HCMOU" value="MBS">
    TĐH Mở TP.HCM
    </option>
    <option data-tokens="MTS UFA" value="MTS">
    TĐH Mỹ thuật TP.HCM
    </option>
    <option data-tokens="NHS HUB" value="NHS">
    TĐH Ngân hàng TP.HCM
    </option>
    <option data-tokens="NTS FTU2" value="NTS">
    TĐH Ngoại thương - Cơ sở phía Nam
    </option>
    <option data-tokens="NTT NTTU" value="NTT">
    TĐH Nguyễn Tất Thành
    </option>
    <option data-tokens="NLS NLU" value="NLS">
    TĐH Nông Lâm TP.HCM
    </option>
    <option data-tokens="HIU HBU" value="HIU">
    TĐH Quốc tế Hồng Bàng
    </option>
    <option data-tokens="SGD SGU" value="SGD">TĐH Sài Gòn</option>
    <option data-tokens="DSD" value="DSD">
    TĐH Sân khấu Điện ảnh TP.HCM
    </option>
    <option data-tokens="SPK HCMUTE" value="SPK">
    TĐH Sư phạm Kỹ thuật TP.HCM
    </option>
    <option data-tokens="SPS HCMUE" value="SPS">
    TĐH Sư phạm TP.HCM
    </option>
    <option data-tokens="DMS UEF" value="DMS">
    TĐH Tài chính - Marketing
    </option>
    <option data-tokens="DTM HCMUNRE" value="DTM">
    TĐH Tài nguyên và Môi T TP.HCM
    </option>
    <option data-tokens="TDS USH" value="TDS">
    TĐH Thể dục Thể thao TP.HCM
    </option>
    <option data-tokens="TLS" value="TLS">
    TĐH Thủy lợi - Cơ sở 2
    </option>
    <option data-tokens="DTT TDTU" value="DTT">
    TĐH Tôn Đức Thắng
    </option>
    <option data-tokens="VHS HCMUC" value="VHS">
    TĐH Văn hóa TP.HCM
    </option>
    <option data-tokens="VGU" value="VGU">TĐH Việt - Đức</option>
    <option data-tokens="YDS UMP" value="YDS">
    TĐH Y Dược TP.HCM
    </option>
    <option data-tokens="TYS PNTU" value="TYS">
    TĐH Y khoa Phạm Ngọc Thạch
    </option>
    <option data-tokens="DSG STU" value="DSG">
    TĐH Công nghệ Sài Gòn
    </option>
    <option data-tokens="GDU GDU" value="GDU">TĐH Gia Định</option>
    <option data-tokens="DKC HUTECH" value="DKC">
    TĐH Công nghệ TP.HCM
    </option>
    <option data-tokens="DHV HVU" value="DHV">
    TĐH Hùng Vương TPHCM
    </option>
    <option data-tokens="SIU SIU" value="SIU">
    TĐH Quốc tế Sài Gòn
    </option>
    <option data-tokens="DVH VHU" value="DVH">TĐH Văn Hiến</option>
    <option data-tokens="DVL VLU" value="DVL">TĐH Văn Lang</option>
    <option data-tokens="STS UPES" value="STS">
    TĐH Sư phạm Thể dục thể thao TP. HCM
    </option>
    <option data-tokens="DNT HUFLIT" value="DNT">
    TĐH Ngoại ngữ - Tin học TP.HCM
    </option>
    <option data-tokens="UMT UMT" value="UMT">
    TĐH Quản lý và công nghệ TPHCM
    </option>
    <option data-tokens="DTF SFL" value="DTF">
    T Ngoại ngữ, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTQ IS" value="DTQ">
    Khoa Quốc tế, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTP" value="DTP">
    Phân hiệu ĐH Thái Nguyên tại Lào Cai
    </option>
    <option data-tokens="DTC ICTU" value="DTC">
    TĐH Công nghệ thông tin và Truyền thông, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTZ TNUS" value="DTZ">
    TĐH Khoa học, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTE TUEBA" value="DTE">
    TĐH Kinh tế - Quản trị kinh doanh, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTK TNUT" value="DTK">
    TĐH Kỹ thuật Công nghiệp, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTN TUAF" value="DTN">
    TĐH Nông lâm, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTS TNUE" value="DTS">
    TĐH Sư phạm, ĐH Thái Nguyên
    </option>
    <option data-tokens="DTY TUMP" value="DTY">
    TĐH Y Dược, ĐH Thái Nguyên
    </option>
    <option data-tokens="DCA" value="DCA">TĐH Chu Văn An</option>
    <option data-tokens="DDA" value="DDA">
    TĐH Công nghệ Đông Á
    </option>
    <option data-tokens="DDM" value="DDM">
    TĐH Công nghiệp Quảng Ninh
    </option>
    <option data-tokens="VUI" value="VUI">
    TĐH Công nghiệp Việt Trì
    </option>
    <option data-tokens="DHP" value="DHP">
    TĐH Quản lý và công nghệ Hải Phòng
    </option>
    <option data-tokens="DTV" value="DTV">
    TĐH Lương Thế Vinh
    </option>
    <option data-tokens="YDD" value="YDD">
    TĐH Điều dưỡng Nam Định
    </option>
    <option data-tokens="HLU" value="HLU">TĐH Hạ Long</option>
    <option data-tokens="DKT" value="DKT">TĐH Hải Dương</option>
    <option data-tokens="THP" value="THP">TĐH Hải Phòng</option>
    <option data-tokens="HHA" value="HHA">TĐH Hàng hải</option>
    <option data-tokens="DNB" value="DNB">TĐH Hoa Lư</option>
    <option data-tokens="HDT" value="HDT">TĐH Hồng Đức</option>
    <option data-tokens="THV" value="THV">TĐH Hùng Vương</option>
    <option data-tokens="UKB" value="UKB">TĐH Kinh Bắc</option>
    <option data-tokens="DKY" value="DKY">
    TĐH Kỹ thuật Y tế Hải Dương
    </option>
    <option data-tokens="DBG" value="DBG">
    TĐH Nông Lâm Bắc Giang
    </option>
    <option data-tokens="DBH" value="DBH">
    TĐH Quốc tế Bắc Hà
    </option>
    <option data-tokens="SDU" value="SDU">TĐH Sao Đỏ</option>
    <option data-tokens="SP2" value="SP2">
    TĐH Sư phạm HN 2
    </option>
    <option data-tokens="SKH" value="SKH">
    TĐH Sư phạm Kỹ thuật Hưng Yên
    </option>
    <option data-tokens="SKN" value="SKN">
    TĐH Sư phạm Kỹ thuật Nam Định
    </option>
    <option data-tokens="DFA" value="DFA">
    TĐH Tài chính - Quản trị kinh doanh
    </option>
    <option data-tokens="TQU" value="TQU">TĐH Tân Trào</option>
    <option data-tokens="TTB" value="TTB">TĐH Tây Bắc</option>
    <option data-tokens="DTB" value="DTB">TĐH Thái Bình</option>
    <option data-tokens="DDB" value="DDB">TĐH Thành Đông</option>
    <option data-tokens="TDB" value="TDB">
    TĐH Thể dục Thể thao Bắc Ninh
    </option>
    <option data-tokens="DVP" value="DVP">TĐH Trưng Vương</option>
    <option data-tokens="DVD" value="DVD">
    TĐH Văn hóa Thể thao và Du lịch Thanh Hóa
    </option>
    <option data-tokens="DVB" value="DVB">TĐH Việt Bắc</option>
    <option data-tokens="YPB" value="YPB">
    TĐH Y Dược Hải Phòng
    </option>
    <option data-tokens="YTB" value="YTB">
    TĐH Y Dược Thái Bình
    </option>
    <option data-tokens="THU" value="THU">
    TĐH Y khoa Tokyo VN
    </option>
    <option data-tokens="TAG AGU" value="TAG">
    TĐH An Giang, ĐHQG TP.HCM
    </option>
    <option data-tokens="BVU BRVTU" value="BVU">
    TĐH Bà Rịa - Vũng Tàu
    </option>
    <option data-tokens="DBL BLU" value="DBL">TĐH Bạc Liêu</option>
    <option data-tokens="DBD BDU" value="DBD">
    TĐH Bình Dương
    </option>
    <option data-tokens="TCT CTU" value="TCT">ĐH Cần Thơ</option>
    <option data-tokens="DCD" value="DCD">
    TĐH Công nghệ Đồng Nai
    </option>
    <option data-tokens="MIT" value="MIT">
    TĐH Công nghệ Miền Đông
    </option>
    <option data-tokens="DCL" value="DCL">TĐH Cửu Long</option>
    <option data-tokens="DLH" value="DLH">TĐH Lạc Hồng</option>
    <option data-tokens="PVU" value="PVU">
    TĐH Dầu khí VN
    </option>
    <option data-tokens="DNU DNU" value="DNU">TĐH Đồng Nai</option>
    <option data-tokens="SPD DThU" value="SPD">
    TĐH Đồng Tháp
    </option>
    <option data-tokens="TKG KGU" value="TKG">
    TĐH Kiên Giang
    </option>
    <option data-tokens="DLA" value="DLA">
    TĐH Kinh tế - Công nghiệp Long An
    </option>
    <option data-tokens="DKB" value="DKB">
    TĐH Kinh tế Kỹ thuật Bình Dương
    </option>
    <option data-tokens="KCC CTUET" value="KCC">
    TĐH Kỹ thuật Công nghệ Cần Thơ
    </option>
    <option data-tokens="LNS VNUF2" value="LNS">
    TĐH Lâm nghiệp - Cơ sở 2
    </option>
    <option data-tokens="DNC DNC" value="DNC">
    TĐH Nam Cần Thơ
    </option>
    <option data-tokens="EIU EIU" value="EIU">
    TĐH Quốc tế Miền Đông
    </option>
    <option data-tokens="VLU VLUTE" value="VLU">
    TĐH Sư phạm Kỹ thuật Vĩnh Long
    </option>
    <option data-tokens="TTU TTU" value="TTU">TĐH Tân Tạo</option>
    <option data-tokens="DTD TDU" value="DTD">TĐH Tây Đô</option>
    <option data-tokens="TDM TDMU" value="TDM">
    TĐH Thủ Dầu Một
    </option>
    <option data-tokens="TTG TGU" value="TTG">
    TĐH Tiền Giang
    </option>
    <option data-tokens="DVT TVU" value="DVT">TĐH Trà Vinh</option>
    <option data-tokens="VGU VGU" value="VGU">
    TĐH Việt - Đức
    </option>
    <option data-tokens="VTT VTTU" value="VTT">
    TĐH Võ T Toản
    </option>
    <option data-tokens="MTU MTU" value="MTU">
    TĐH Xây dựng Miền Tây
    </option>
    <option data-tokens="YCT CTUMP" value="YCT">
    TĐH Y Dược Cần Thơ
    </option>
    <option data-tokens="DHD HUHT" value="DHD">
    T Du lịch, ĐH Huế
    </option>
    <option data-tokens="DHC FPU" value="DHC">
    Khoa Giáo dục Thể chất, ĐH Huế
    </option>
    <option data-tokens="DHT HUSC" value="DHT">
    TĐH Khoa học, ĐH Huế
    </option>
    <option data-tokens="DHK HCE" value="DHK">
    TĐH Kinh tế, ĐH Huế
    </option>
    <option data-tokens="DHL HUAF" value="DHL">
    TĐH Nông Lâm, ĐH Huế
    </option>
    <option data-tokens="DHN HUA" value="DHN">
    TĐH Nghệ thuật, ĐH Huế
    </option>
    <option data-tokens="DHA HUL" value="DHA">
    TĐH Luật, ĐH Huế
    </option>
    <option data-tokens="DHF HUFLIS" value="DHF">
    TĐH Ngoại ngữ, ĐH Huế
    </option>
    <option data-tokens="DHS HUCE" value="DHS">
    TĐH Sư phạm, ĐH Huế
    </option>
    <option data-tokens="DHY HUMP" value="DHY">
    TĐH Y Dược, ĐH Huế
    </option>
    <option data-tokens="DHE HUET" value="DHE">
    Khoa Kỹ thuật và công nghệ, ĐH Huế
    </option>
    <option data-tokens="DHI HUIS" value="DHI">
    Khoa Quốc tế, ĐH Huế
    </option>
    <option data-tokens="DHQ" value="DHQ">
    Phân hiệu ĐH Huế tại quảng Trị
    </option>
    <option data-tokens="DDG FPE" value="DDG">
    Khoa Giáo dục Thể chất, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDY SMP" value="DDY">
    Khoa Y Dược, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDP" value="DDP">
    Phân hiệu ĐH Đà Nẵng tại Kon Tum
    </option>
    <option data-tokens="DDK DUT, BKU" value="DDK">
    TĐH Bách Khoa, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDQ DUE" value="DDQ">
    TĐH Kinh tế, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDF UFL" value="DDF">
    TĐH Ngoại ngữ, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDS UED" value="DDS">
    TĐH Sư phạm, ĐH Đà Nẵng
    </option>
    <option data-tokens="DSK UTE" value="DSK">
    TĐH Sư phạm Kỹ thuật, ĐH Đà Nẵng
    </option>
    <option data-tokens="DDV VNUK" value="DDV">
    Viện nghiên cứu đào tạo Việt - Anh, ĐH Đà Nẵng
    </option>
    <option data-tokens="VKU VKU" value="VKU">
    Khoa Công nghệ thông tin và Truyền thông, ĐH Đà Nẵng
    </option>
    <option data-tokens="KTD DAU" value="KTD">
    TĐH Kiến trúc Đà Nẵng
    </option>
    <option data-tokens="BMU BMTU" value="BMU">
    TĐH Y dược Buôn Ma Thuột
    </option>
    <option data-tokens="DVX" value="DVX">
    TĐH Công nghệ Vạn Xuân
    </option>
    <option data-tokens="DCV" value="DCV">
    TĐH Công nghiệp Vinh
    </option>
    <option data-tokens="TDL DLU" value="TDL">TĐH Đà Lạt</option>
    <option data-tokens="DDT DTU" value="DDT">TĐH Duy Tân</option>
    <option data-tokens="DPX" value="DPX">
    TĐH Dân lập Phú Xuân
    </option>
    <option data-tokens="DYD" value="DYD">
    TĐH Yersin Đà Lạt
    </option>
    <option data-tokens="DAD" value="DAD">TĐH Đông Á</option>
    <option data-tokens="HHT" value="HHT">TĐH Hà Tĩnh</option>
    <option data-tokens="UKH" value="UKH">TĐH Khánh Hòa</option>
    <option data-tokens="CEA" value="CEA">
    TĐH Kinh tế Nghệ An
    </option>
    <option data-tokens="YDN" value="YDN">
    TĐH Kỹ thuật Y Dược Đà Nẵng
    </option>
    <option data-tokens="HVA" value="HVA">HV Âm nhạc Huế</option>
    <option data-tokens="TSN" value="TSN">TĐH Nha Trang</option>
    <option data-tokens="DPQ" value="DPQ">
    TĐH Phạm Văn Đồng
    </option>
    <option data-tokens="DPC" value="DPC">
    TĐH Phan Châu Trinh
    </option>
    <option data-tokens="DPT" value="DPT">TĐH Phan Thiết</option>
    <option data-tokens="DPY" value="DPY">TĐH Phú Yên</option>
    <option data-tokens="DQB" value="DQB">TĐH Quảng Bình</option>
    <option data-tokens="DQU" value="DQU">TĐH Quảng Nam</option>
    <option data-tokens="DQT" value="DQT">TĐH Quang Trung</option>
    <option data-tokens="DQN" value="DQN">TĐH Quy Nhơn</option>
    <option data-tokens="SKV" value="SKV">
    TĐH Sư phạm Kỹ thuật Vinh
    </option>
    <option data-tokens="UFA" value="UFA">
    TĐH Tài chính Kế toán
    </option>
    <option data-tokens="TTN" value="TTN">TĐH Tây Nguyên</option>
    <option data-tokens="TBD" value="TBD">
    TĐH Thái Bình Dương
    </option>
    <option data-tokens="TTD" value="TTD">
    TĐH Thể dục Thể thao Đà Nẵng
    </option>
    <option data-tokens="TDV" value="TDV">TĐH Vinh</option>
    <option data-tokens="XDT" value="XDT">
    TĐH Xây dựng Miền Trung
    </option>
    <option data-tokens="YKV" value="YKV">TĐH Y khoa Vinh</option>
    <option data-tokens="BPH" value="BPH">HV Biên phòng</option>
    <option data-tokens="HQH" value="HQH">HV Hải Quân</option>
    <option data-tokens="HEH" value="HEH">HV Hậu cần</option>
    <option data-tokens="NQH" value="NQH">HV Khoa học Quân sự</option>
    <option data-tokens="KQH" value="KQH">HV Kỹ thuật Quân sự</option>
    <option data-tokens="PKH" value="PKH">
    HV Phòng không - Không quân
    </option>
    <option data-tokens="YQH" value="YQH">HV Quân Y</option>
    <option data-tokens="LCH" value="LCH">
    TĐH Chính trị (T Sĩ quan Chính trị)
    </option>
    <option data-tokens="ZNH" value="ZNH">
    TĐH Văn hóa - Nghệ thuật Quân đội
    </option>
    <option data-tokens="SNH" value="SNH">T Sĩ quan Công binh</option>
    <option data-tokens="DCH" value="DCH">T Sĩ quan Đặc công</option>
    <option data-tokens="KGH" value="KGH">T Sĩ quan không quân</option>
    <option data-tokens="VPH" value="VPH">
    T Sĩ quan Kỹ thuật Quân sự Vinhempich (ĐH Trần Đại Nghĩa)
    </option>
    <option data-tokens="LAH" value="LAH">
    T Sĩ quan Lục quân 1 (ĐH Trần Quốc Tuấn)
    </option>
    <option data-tokens="LBH" value="LBH">
    T Sĩ quan Lục quân 2 (ĐH Nguyễn Huệ)
    </option>
    <option data-tokens="PBH" value="PBH">T Sĩ quan Pháo binh</option>
    <option data-tokens="HGH" value="HGH">T Sĩ quan Phòng Hóa</option>
    <option data-tokens="TGH" value="TGH">
    T Sĩ quan Tăng - Thiết giáp
    </option>
    <option data-tokens="TTH" value="TTH">T Sĩ quan Thông tin</option>
    <option data-tokens="ANH" value="ANH">HV An ninh Nhân dân</option>
    <option data-tokens="CSH" value="CSH">HV Cảnh sát Nhân dân</option>
    <option data-tokens="HCA" value="HCA">
    HV Chính trị Công an Nhân dân
    </option>
    <option data-tokens="ANS" value="ANS">
    TĐH An ninh nhân dân
    </option>
    <option data-tokens="CSS" value="CSS">
    TĐH Cảnh sát nhân dân
    </option>
    <option data-tokens="HCB" value="HCB">
    TĐH Kỹ thuật - Hậu cần Công an nhân dân phía Bắc
    </option>
    <option data-tokens="HCN" value="HCN">
    TĐH Kỹ thuật - Hậu cần Công an nhân dân phía Nam
    </option>
    <option data-tokens="PCH" value="PCH">
    TĐH Phòng cháy chữa cháy phía Bắc
    </option>
    <option data-tokens="PCS" value="PCS">
    TĐH Phòng cháy chữa cháy phía Nam
    </option>
    </select>

    <button type="button" class="btn" id="hide-school-id">
    <img
    src="../assets/icons/trash.png"
    alt="add icon"
    style="height: 1.5rem"
    />
    </button>`;

export const major1Id_selectpicker = `<select class="selectpicker major-1-id" data-live-search="true" data-size="5">
    <option value="714">Khoa học giáo dục và đào tạo giáo viên</option>
    <option value="721">Nghệ thuật</option>
    <option value="722">Nhân văn</option>
    <option value="731">Khoa học xã hội và hành vi</option>
    <option value="732">Báo chí và thông tin</option>
    <option value="734">Kinh doanh và quản lý</option>
    <option value="738">Pháp luật</option>
    <option value="742">Khoa học sự sống</option>
    <option value="744">Khoa học tự nhiên</option>
    <option value="746">Toán và thống kê</option>
    <option value="748">Máy tính và công nghệ thông tin</option>
    <option value="751">Công nghệ kỹ thuật</option>
    <option value="752">Kỹ thuật</option>
    <option value="754">Sản xuất và chế biến</option>
    <option value="758">Kiến trúc và xây dựng</option>
    <option value="762">Nông lâm nghiệp và thủy sản</option>
    <option value="764">Thú y</option>
    <option value="772">Sức khỏe</option>
    <option value="776">Dịch vụ xã hội</option>
    <option value="781">
        Du lịch khách sạn, thể thao và dịch vụ cá nhân
    </option>
    <option value="784">Dịch vụ vận tải</option>
    <option value="785">Môi T và bảo vệ môi T</option>
    <option value="786">An ninh Quốc phòng</option>
    <option value="790">Khác</option>
    </select>
    <button type="button" class="btn" id="hide-major-1">
    <img
        src="../assets/icons/trash.png"
        alt="add icon"
        style="height: 1.5rem"
    />
    </button>`;

export const major3Id_selectpicker = `<select class="selectpicker major-3-id" data-live-search="true" data-size="5" style="width=80%">
    <option value="7140101">Giáo dục học</option>
    <option value="7140103">Công nghệ giáo dục</option>
    <option value="7140114">Quản lý giáo dục</option>
    <option value="7140201">Giáo dục Mầm non</option>
    <option value="7140202">Giáo dục Tiểu học</option>
    <option value="7140203">Giáo dục Đặc biệt</option>
    <option value="7140204">Giáo dục Công dân</option>
    <option value="7140205">Giáo dục Chính trị</option>
    <option value="7140206">Giáo dục Thể chất</option>
    <option value="7140207">Huấn luyện thể thao</option>
    <option value="7140208">Giáo dục Quốc phòng - An ninh</option>
    <option value="7140209">Sư phạm Toán học</option>
    <option value="7140210">Sư phạm Tin học</option>
    <option value="7140211">Sư phạm Vật lý</option>
    <option value="7140212">Sư phạm Hóa học</option>
    <option value="7140213">Sư phạm Sinh học</option>
    <option value="7140214">Sư phạm Kỹ thuật công nghiệp</option>
    <option value="7140215">Sư phạm Kỹ thuật nông nghiệp</option>
    <option value="7140217">Sư phạm Ngữ văn</option>
    <option value="7140218">Sư phạm Lịch sử</option>
    <option value="7140219">Sư phạm Địa lý</option>
    <option value="7140221">Sư phạm Âm nhạc</option>
    <option value="7140222">Sư phạm Mỹ thuật</option>
    <option value="7140223">Sư phạm Tiếng Bana</option>
    <option value="7140224">Sư phạm Tiếng Êđê</option>
    <option value="7140225">Sư phạm Tiếng Jrai</option>
    <option value="7140226">Sư phạm Tiếng Khmer</option>
    <option value="7140227">Sư phạm Tiếng H'mong</option>
    <option value="7140228">Sư phạm Tiếng Chăm</option>
    <option value="7140229">Sư phạm Tiếng M'nông</option>
    <option value="7140230">Sư phạm Tiếng Xêđăng</option>
    <option value="7140231">Sư phạm Tiếng Anh</option>
    <option value="7140232">Sư phạm Tiếng Nga</option>
    <option value="7140233">Sư phạm Tiếng Pháp</option>
    <option value="7140234">Sư phạm Tiếng Trung Quốc</option>
    <option value="7140235">Sư phạm Tiếng Đức</option>
    <option value="7140236">Sư phạm Tiếng Nhật</option>
    <option value="7140237">Sư phạm Tiếng Hàn Quốc</option>
    <option value="7140245">Sư phạm nghệ thuật</option>
    <option value="7140246">Sư phạm công nghệ</option>
    <option value="7140247">Sư phạm Khoa học tự nhiên</option>
    <option value="7140248">Giáo dục pháp luật</option>
    <option value="7140249">Sư phạm Lịch sử - Địa lý</option>
    <option value="7210101">Lý luận lịch sử và phê bình mỹ thuật</option>
    <option value="7210103">Hội họa</option>
    <option value="7210104">Đồ họa</option>
    <option value="7210105">Điêu khắc</option>
    <option value="7210107">Gốm</option>
    <option value="7210110">Mỹ thuật đô thị</option>
    <option value="7210201">Âm nhạc học</option>
    <option value="7210203">Sáng tác âm nhạc</option>
    <option value="7210204">Chỉ huy âm nhạc</option>
    <option value="7210205">Thanh nhạc</option>
    <option value="7210207">Biểu diễn nhạc cụ phương tây</option>
    <option value="7210208">Piano</option>
    <option value="7210209">Nhạc Jazz</option>
    <option value="7210210">Biểu diễn nhạc cụ truyền thống</option>
    <option value="7210213">Nghệ thuật học</option>
    <option value="7210221">Lý luận lịch sử và phê bình sân khấu</option>
    <option value="7210225">Biên kịch sân khấu</option>
    <option value="7210226">Diễn viên sân khấu kịch hát</option>
    <option value="7210227">Đạo diễn sân khấu</option>
    <option value="7210231">Lý luận lịch sử và phê bình điện ảnh truyền hình</option>
    <option value="7210233">Biên kịch điện ảnh truyền hình</option>
    <option value="7210234">Diễn viên kịch điện ảnh - truyền hình</option>
    <option value="7210235">Đạo diễn điện ảnh truyền hình</option>
    <option value="7210236">Quay phim</option>
    <option value="7210241">Lý luận lịch sử và phê bình múa</option>
    <option value="7210242">Diễn viên múa</option>
    <option value="7210243">Biên đạo múa</option>
    <option value="7210244">Huấn luyện múa</option>
    <option value="7210301">Nhiếp ảnh</option>
    <option value="7210302">Công nghệ điện ảnh truyền hình</option>
    <option value="7210303">Thiết kế âm thanh ánh sáng</option>
    <option value="7210402">Thiết kế công nghiệp</option>
    <option value="7210403">Thiết kế đồ họa</option>
    <option value="7210404">Thiết kế thời trang</option>
    <option value="7210406">Thiết kế mỹ thuật sân khấu điện ảnh</option>
    <option value="7210408">Nghệ thuật số</option>
    <option value="7210409">Thiết kế mỹ thuật số</option>
    <option value="7220101">Tiếng Việt và văn hóa VN</option>
    <option value="7220104">Hán Nôm</option>
    <option value="7220105">Ngôn ngữ Jrai</option>
    <option value="7220106">Ngôn ngữ Khmer</option>
    <option value="7220107">Ngôn ngữ H'mong</option>
    <option value="7220108">Ngôn ngữ Chăm</option>
    <option value="7220110">Sáng tác văn học</option>
    <option value="7220112">Văn hóa các dân tộc thiểu số VN</option>
    <option value="7220113">Ngôn ngữ và Văn hóa các dân tộc thiểu số VN</option>
    <option value="7220201">Ngôn ngữ Anh</option>
    <option value="7220202">Ngôn ngữ Nga</option>
    <option value="7220203">Ngôn ngữ Pháp</option>
    <option value="7220204">Ngôn ngữ Trung Quốc</option>
    <option value="7220205">Ngôn ngữ Đức</option>
    <option value="7220206">Ngôn ngữ Tây Ban Nha</option>
    <option value="7220207">Ngôn ngữ Bồ Đào Nha</option>
    <option value="7220208">Ngôn ngữ Italia</option>
    <option value="7220209">Ngôn ngữ Nhật</option>
    <option value="7220210">Ngôn ngữ Hàn Quốc</option>
    <option value="7220211">Ngôn ngữ Ả Rập</option>
    <option value="7220212">Văn hóa và truyền thông xuyên quốc gia</option>
    <option value="7220214">Ngôn ngữ Thái Lan</option>
    <option value="7229001">Triết học</option>
    <option value="7229008">Chủ nghĩa xã hội khoa học</option>
    <option value="7229009">Tôn giáo học</option>
    <option value="7229010">Lịch sử</option>
    <option value="7229020">Ngôn ngữ học</option>
    <option value="7229030">Văn học</option>
    <option value="7229040">Văn hóa học</option>
    <option value="7229042">Quản lý văn hóa</option>
    <option value="7229045">Gia đình học</option>
    <option value="7310101">Kinh tế</option>
    <option value="7310102">Kinh tế chính trị</option>
    <option value="7310104">Kinh tế đầu tư</option>
    <option value="7310105">Kinh tế phát triển</option>
    <option value="7310106">Kinh tế quốc tế</option>
    <option value="7310107">Thống kê kinh tế</option>
    <option value="7310108">Toán kinh tế</option>
    <option value="7310109">Kinh tế số</option>
    <option value="7310111">Nghiên cứu phát triển</option>
    <option value="7310113">Kinh tế thể thao</option>
    <option value="7310201">Chính trị học</option>
    <option value="7310202">Xây dựng Đảng và chính quyền nhà nước</option>
    <option value="7310205">Quản lý nhà nước</option>
    <option value="7310206">Quan hệ quốc tế</option>
    <option value="7310301">Xã hội học</option>
    <option value="7310302">Nhân học</option>
    <option value="7310399">Giới và Phát triển</option>
    <option value="7310401">Tâm lý học</option>
    <option value="7310403">Tâm lý học giáo dục</option>
    <option value="7310501">Địa lý học</option>
    <option value="7310601">Quốc tế học</option>
    <option value="7310602">Châu Á học</option>
    <option value="7310607">Thái Bình Dương học</option>
    <option value="7310608">Đông phương học</option>
    <option value="7310612">Trung Quốc học</option>
    <option value="7310613">Nhật Bản học</option>
    <option value="7310614">Hàn Quốc học</option>
    <option value="7310620">Đông Nam Á học</option>
    <option value="7310630">VN học</option>
    <option value="7310690">Hoa kỳ học</option>
    <option value="7310699">Kinh doanh thương mại Hàn Quốc</option>
    <option value="7320101">Báo chí</option>
    <option value="7320104">Truyền thông đa phương tiện</option>
    <option value="7320105">Truyền thông đại chúng</option>
    <option value="7320106">Công nghệ truyền thông</option>
    <option value="7320107">Truyền thông quốc tế</option>
    <option value="7320108">Quan hệ công chúng</option>
    <option value="7320109">Truyền thông doanh nghiệp</option>
    <option value="7320110">Quảng cáo</option>
    <option value="7320111">Truyền thông số</option>
    <option value="7320201">Thông tin - Thư viện</option>
    <option value="7320205">Quản lý thông tin</option>
    <option value="7320303">Lưu trữ học</option>
    <option value="7320305">Bảo tàng học</option>
    <option value="7320401">Xuất bản</option>
    <option value="7320402">Kinh doanh xuất bản phẩm</option>
    <option value="7329001">Công nghệ đa phương tiện</option>
    <option value="7340101">Quản trị kinh doanh</option>
    <option value="7340108">Quản lí</option>
    <option value="7340102">Quản trị - Luật</option>
    <option value="7340114">Digital Marketing</option>
    <option value="7340115">Marketing</option>
    <option value="7340116">Bất động sản</option>
    <option value="7340120">Kinh doanh quốc tế</option>
    <option value="7340121">Kinh doanh thương mại</option>
    <option value="7340122">Thương mại điện tử</option>
    <option value="7340123">Kinh doanh thời trang và dệt may</option>
    <option value="7340125">Phân tích dữ liệu kinh doanh</option>
    <option value="7340129">Quản trị kinh doanh thực phẩm</option>
    <option value="7340201">Tài chính - Ngân hàng</option>
    <option value="7340204">Bảo hiểm</option>
    <option value="7340205">Công nghệ tài chính</option>
    <option value="7340206">Tài chính quốc tế</option>
    <option value="7340207">Bảo hiểm - Tài chính</option>
    <option value="7340301">Kế toán</option>
    <option value="7340302">Kiểm toán</option>
    <option value="7340401">Khoa học quản lý</option>
    <option value="7340403">Quản lý công</option>
    <option value="7340404">Quản trị nhân lực</option>
    <option value="7340405">Hệ thống thông tin quản lý</option>
    <option value="7340406">Quản trị văn phòng</option>
    <option value="7340408">Quan hệ lao động</option>
    <option value="7340409">Quản lý dự án</option>
    <option value="7340410">Quản trị công nghệ truyền thông</option>
    <option value="7340412">Quản trị sự kiện</option>
    <option value="7380101">Luật</option>
    <option value="7380102">Luật hiến pháp và luật hành chính</option>
    <option value="7380103">Luật dân sự và tố tụng dân sự</option>
    <option value="7380104">Luật hình sự và tố tụng hình sự</option>
    <option value="7380107">Luật kinh tế</option>
    <option value="7380108">Luật quốc tế</option>
    <option value="7380109">Luật thương mại quốc tế</option>
    <option value="7380110">Luật kinh doanh</option>
    <option value="7420101">Sinh học</option>
    <option value="7420201">Công nghệ sinh học</option>
    <option value="7420202">Kỹ thuật sinh học</option>
    <option value="7420203">Sinh học ứng dụng</option>
    <option value="7420204">Khoa học Y Sinh</option>
    <option value="7420205">Công nghệ sinh học y dược</option>
    <option value="7420207">Công nghệ thẩm mỹ</option>
    <option value="7440101">Thiên văn học</option>
    <option value="7440102">Vật lý học</option>
    <option value="7440106">Vật lý nguyên tử và hạt nhân</option>
    <option value="7440110">Cơ học</option>
    <option value="7440112">Hóa học</option>
    <option value="7440122">Khoa học vật liệu</option>
    <option value="7440201">Địa chất học</option>
    <option value="7440212">Bản đồ học</option>
    <option value="7440217">Địa lý tự nhiên</option>
    <option value="7440222">Khí tượng và khí hậu học</option>
    <option value="7440224">Thủy văn học</option>
    <option value="7440228">Hải dương học</option>
    <option value="7440229">Quản lý phân tích dữ liệu khoa học trái đất</option>
    <option value="7440298">Biến đổi khí hậu và Phát triển bền vững</option>
    <option value="7440301">Khoa học môi T</option>
    <option value="7460101">Toán học</option>
    <option value="7460107">Khoa học tính toán</option>
    <option value="7460108">Khoa học dữ liệu</option>
    <option value="7460112">Toán ứng dụng</option>
    <option value="7460115">Toán cơ</option>
    <option value="7460117">Toán tin</option>
    <option value="7460201">Thống kê</option>
    <option value="7480101">Khoa học máy tính</option>
    <option value="7480102">Mạng máy tính và truyền thông dữ liệu</option>
    <option value="7480103">Kỹ thuật phần mềm</option>
    <option value="7480104">Hệ thống thông tin</option>
    <option value="7480106">Kỹ thuật máy tính</option>
    <option value="7480107">Trí tuệ nhân tạo</option>
    <option value="7480108">Công nghệ kỹ thuật máy tính</option>
    <option value="7480118">Hệ thống nhúng và IoT</option>
    <option value="7480200">Kỹ thuật - Hậu cần</option>
    <option value="7480201">Công nghệ thông tin</option>
    <option value="7480202">An toàn thông tin</option>
    <option value="7480203">Kỹ thuật dữ liệu</option>
    <option value="7480204">Khoa học và Kỹ thuật máy tính</option>
    <option value="7480206">Địa tin học</option>
    <option value="7510101">Công nghệ kỹ thuật kiến trúc</option>
    <option value="7510102">Công nghệ kỹ thuật công trình xây dựng</option>
    <option value="7510103">Công nghệ kỹ thuật xây dựng</option>
    <option value="7510104">Công nghệ kỹ thuật giao thông</option>
    <option value="7510105">Công nghệ kỹ thuật vật liệu xây dựng</option>
    <option value="7510106">Hệ thống kỹ thuật công trình xây dựng</option>
    <option value="7510201">Công nghệ kỹ thuật cơ khí</option>
    <option value="7510202">Công nghệ chế tạo máy</option>
    <option value="7510203">Công nghệ kỹ thuật cơ điện tử</option>
    <option value="7510205">Công nghệ kỹ thuật ô tô</option>
    <option value="7510206">Công nghệ kỹ thuật nhiệt</option>
    <option value="7510207">Công nghệ kỹ thuật tàu thủy</option>
    <option value="7510208">Năng lượng tái tạo</option>
    <option value="7510209">Robot và trí tuệ nhân tạo</option>
    <option value="7510211">Bảo dưỡng công nghiệp</option>
    <option value="7510212">Công nghệ ô tô</option>
    <option value="7510213">Thiết kế cơ khí và kiểu dáng công nghiệp</option>
    <option value="7510301">Công nghệ kỹ thuật điện điện tử</option>
    <option value="7510302">Công nghệ kỹ thuật điện tử - viễn thông</option>
    <option value="7510303">Công nghệ kỹ thuật điều khiển và tự động hóa</option>
    <option value="7510401">Công nghệ kỹ thuật hóa học</option>
    <option value="7510402">Công nghệ vật liệu</option>
    <option value="7510403">Công nghệ kỹ thuật năng lượng</option>
    <option value="7510406">Công nghệ kỹ thuật môi T</option>
    <option value="7510407">Công nghệ kỹ thuật hạt nhân</option>
    <option value="7510601">Quản lý công nghiệp</option>
    <option value="7510602">Quản lý năng lượng</option>
    <option value="7510604">Kinh tế công nghiệp</option>
    <option value="7510605">Logistics và Quản lý chuỗi cung ứng</option>
    <option value="7510701">Công nghệ dầu khí và khai thác dầu</option>
    <option value="7510801">Công nghệ kỹ thuật in</option>
    <option value="7519003">Công nghệ kỹ thuật khuông mẫu</option>
    <option value="7519007">Công nghệ kỹ thuật năng lượng tái tạo</option>
    <option value="7520101">Cơ kỹ thuật</option>
    <option value="7520103">Kỹ thuật cơ khí</option>
    <option value="7520114">Kỹ thuật cơ điện tử</option>
    <option value="7520115">Kỹ thuật nhiệt</option>
    <option value="7520116">Kỹ thuật cơ khí động lực</option>
    <option value="7520117">Kỹ thuật công nghiệp</option>
    <option value="7520118">Kỹ thuật hệ thống công nghiệp</option>
    <option value="7520120">Kỹ thuật hàng không</option>
    <option value="7520121">Kỹ thuật không gian</option>
    <option value="7520122">Kỹ thuật tàu thủy</option>
    <option value="7520130">Kỹ thuật ô tô</option>
    <option value="7520137">Kỹ thuật in</option>
    <option value="7520138">Kỹ thuật hàng hải</option>
    <option value="7520139">Kỹ thuật hệ thống công nghiệp và Logicstics</option>
    <option value="7520141">Công nghệ ô tô điện</option>
    <option value="7520199">Kỹ thuật robot</option>
    <option value="7520201">Kỹ thuật điện</option>
    <option value="7520204">Kỹ thuật rađa - dẫn đường</option>
    <option value="7520205">Kỹ thuật thủy âm</option>
    <option value="7520206">Kỹ thuật biển</option>
    <option value="7520207">Kỹ thuật điện tử - viễn thông</option>
    <option value="7520208">Công nghệ Inernet vạn vật (IoT)</option>
    <option value="7520212">Kỹ thuật y sinh</option>
    <option value="7520216">Kỹ thuật điều khiển và tự động hóa</option>
    <option value="7520219">Hệ thống giao thông thông minh</option>
    <option value="7520220">Kỹ thuật thiết kế vi mạch</option>
    <option value="7520301">Kỹ thuật hóa học</option>
    <option value="7520309">Kỹ thuật vật liệu</option>
    <option value="7520310">Kỹ thuật vật liệu kim loại</option>
    <option value="7520312">Kỹ thuật dệt</option>
    <option value="7520320">Kỹ thuật môi T</option>
    <option value="7520401">Vật lý kỹ thuật</option>
    <option value="7520402">Kỹ thuật hạt nhân</option>
    <option value="7520403">Vật lý y khoa</option>
    <option value="7520501">Kỹ thuật địa chất</option>
    <option value="7520502">Kỹ thuật địa vật lý</option>
    <option value="7520503">Kỹ thuật trắc địa - bản đồ</option>
    <option value="7520505">Đá quý Đá mỹ nghệ</option>
    <option value="7520601">Kỹ thuật mỏ</option>
    <option value="7520602">Kỹ thuật thăm dò và khảo sát</option>
    <option value="7520604">Kỹ thuật dầu khí</option>
    <option value="7520605">Kỹ thuật khí thiên nhiên</option>
    <option value="7520606">Công nghệ số trong thăm dò và khai thác tài nguyên thiên</option>
    <option value="7520607">Kỹ thuật tuyển khoáng</option>
    <option value="7540101">Công nghệ thực phẩm</option>
    <option value="7540102">Kỹ thuật thực phẩm</option>
    <option value="7540104">Công nghệ sau thu hoạch</option>
    <option value="7540105">Công nghệ chế biến thủy sản</option>
    <option value="7540106">Đảm bảo chất lượng và an toàn thực phẩm</option>
    <option value="7540202">Công nghệ sợi dệt</option>
    <option value="7540203">Công nghệ vật liệu dệt may</option>
    <option value="7540204">Công nghệ dệt may</option>
    <option value="7540206">Công nghệ da giày</option>
    <option value="7540209">Công nghệ may</option>
    <option value="7549001">Công nghệ chế biến lâm sản</option>
    <option value="7549002">Kỹ nghệ gỗ và nội thất</option>
    <option value="7580101">Kiến trúc</option>
    <option value="7580102">Kiến trúc cảnh quan</option>
    <option value="7580103">Kiến trúc nội thất</option>
    <option value="7580104">Kiến trúc đô thị</option>
    <option value="7580105">Quy hoạch vùng và đô thị</option>
    <option value="7580106">Quản lý đô thị và công trình</option>
    <option value="7580108">Thiết kế nội thất</option>
    <option value="7580111">Bảo tồn di sản kiến trúc - Đô thị</option>
    <option value="7580112">Đô thị học</option>
    <option value="7580199">Thiết kế đô thị</option>
    <option value="7580201">Kỹ thuật xây dựng</option>
    <option value="7580202">Kỹ thuật xây dựng công trình thủy</option>
    <option value="7580203">Kỹ thuật xây dựng công trình biển</option>
    <option value="7580204">Xây dựng công trình ngắm thành phố và Hệ thống tàu điện</option>
    <option value="7580205">Kỹ thuật xây dựng công trình giao thông</option>
    <option value="7580210">Kỹ thuật cơ sở hạ tầng</option>
    <option value="7580211">Địa kỹ thuật xây dựng</option>
    <option value="7580212">Kỹ thuật tài nguyên nước</option>
    <option value="7580213">Kỹ thuật cấp thoát nước</option>
    <option value="7580301">Kinh tế xây dựng</option>
    <option value="7580302">Quản lý xây dựng</option>
    <option value="7620101">Nông nghiệp</option>
    <option value="7620102">Khuyến nông</option>
    <option value="7620103">Khoa học đất</option>
    <option value="7620105">Chăn nuôi</option>
    <option value="7620109">Nông học</option>
    <option value="7620110">Khoa học cây trồng</option>
    <option value="7620112">Bảo vệ thực vật</option>
    <option value="7620113">Công nghệ rau hoa quả và cảnh quan</option>
    <option value="7620114">Kinh doanh nông nghiệp</option>
    <option value="7620115">Kinh tế nông nghiệp</option>
    <option value="7620116">Phát triển nông thôn</option>
    <option value="7620118">Nông nghiệp công nghệ cao</option>
    <option value="7620119">Kinh doanh và khởi nghiệp nông thôn</option>
    <option value="7620122">Nông nghiệp thông minh và bền vững</option>
    <option value="7620201">Lâm học</option>
    <option value="7620202">Lâm nghiệp đô thị</option>
    <option value="7620205">Lâm sinh</option>
    <option value="7620211">Quản lý tài nguyên rừng</option>
    <option value="7620301">Nuôi trồng thủy sản</option>
    <option value="7620302">Bệnh học thủy sản</option>
    <option value="7620303">Khoa học thủy sản</option>
    <option value="7620304">Khai thác thủy sản</option>
    <option value="7620305">Quản lý thủy sản</option>
    <option value="7640101">Thú y</option>
    <option value="7720101">Y khoa</option>
    <option value="7720110">Y học dự phòng</option>
    <option value="7720115">Y học cổ truyền</option>
    <option value="7720201">Dược học</option>
    <option value="7720203">Hóa dược</option>
    <option value="7720301">Điều dưỡng</option>
    <option value="7720302">Hộ sinh</option>
    <option value="7720401">Dinh dưỡng</option>
    <option value="7720497">Dinh dưỡng và Khoa học thực phẩm</option>
    <option value="7720501">Răng - Hàm - Mặt</option>
    <option value="7720502">Kỹ thuật phục hình răng</option>
    <option value="7720601">Kỹ thuật xét nghiệm y học</option>
    <option value="7720602">Kỹ thuật hình ảnh y học</option>
    <option value="7720603">Kỹ thuật Phục hồi chức năng</option>
    <option value="7720699">Khúc xạ nhãn khoa</option>
    <option value="7720701">Y tế công cộng</option>
    <option value="7720801">Tổ chức và Quản lý y tế</option>
    <option value="7720802">Quản lý bệnh viện</option>
    <option value="7729001">Y sinh học thể dục thể thao</option>
    <option value="7760101">Công tác xã hội</option>
    <option value="7760102">Công tác thanh thiếu niên</option>
    <option value="7760103">Hỗ trợ giáo dục người khuyết tật</option>
    <option value="7810101">Du lịch</option>
    <option value="7810103">Quản trị dịch vụ du lịch và lữ hành</option>
    <option value="7810201">Quản trị khách sạn</option>
    <option value="7810202">Quản trị nhà hàng và dịch vụ ăn uống</option>
    <option value="7810301">Quản lý thể dục thể thao</option>
    <option value="7810302">Huấn luyện thể thao</option>
    <option value="7810501">Kinh tế gia đình</option>
    <option value="7819001">Khoa học chế biến món ăn</option>
    <option value="7819009">Khoa học dinh dưỡng và ẩm thực</option>
    <option value="7819010">Khoa học chế biến món ăn</option>
    <option value="7840101">Khai thác vận tải</option>
    <option value="7840102">Quản lý hoạt động bay</option>
    <option value="7840104">Kinh tế vận tải</option>
    <option value="7840106">Khoa học hàng hải</option>
    <option value="7840110">Quản lý và vận hành hạ tầng</option>
    <option value="7850101">Quản lý tài nguyên và môi T</option>
    <option value="7850102">Kinh tế tài nguyên thiên nhiên</option>
    <option value="7850103">Quản lý đất đai</option>
    <option value="7850105">Quản lý an toàn, sức khỏe và môi T</option>
    <option value="7850198">Quản lý tài nguyên nước</option>
    <option value="7850199">Quản lý biển</option>
    <option value="7850201">Bảo hộ lao động</option>
    <option value="7850202">An toàn, Vệ sinh lao động</option>
    <option value="7859002">Tài nguyên và du lịch sinh thái</option>
    <option value="7859007">Cảnh quan và kỹ thuật hoa viên</option>
    <option value="7860100">Nghiệp vụ an ninh</option>
    <option value="7860101">Trinh sát an ninh</option>
    <option value="7860102">Trinh sát cảnh sát</option>
    <option value="7860103">Trinh sát kỹ thuật</option>
    <option value="7860104">Điều tra hình sự</option>
    <option value="7860107">Kỹ thuật Công an nhân dân</option>
    <option value="7860108">Kỹ thuật hình sự</option>
    <option value="7860109">Quản lý nhà nước về an ninh trật tự</option>
    <option value="7860110">Quản lý trật tự an toàn giao thông</option>
    <option value="7860111">Thi hành án hình sự và hỗ trợ tư pháp</option>
    <option value="7860112">Tham mưu chỉ huy công an nhân dân</option>
    <option value="7860113">Phòng cháy chữa cháy và cứu nạn cứu hộ</option>
    <option value="7860114">An ninh mạng và phòng chống tội phạm công nghệ cao</option>
    <option value="7860116">Hậu cần công an nhân dân</option>
    <option value="7860117">Tình báo an ninh</option>
    <option value="7860201">Chỉ huy tham mưu Lục quân</option>
    <option value="7860202">Chỉ huy tham mưu Hải quân</option>
    <option value="7860203">Chỉ huy tham mưu Không quân</option>
    <option value="7860204">Chỉ huy tham mưu Phòng không</option>
    <option value="7860205">Chỉ huy tham mưu Pháo binh</option>
    <option value="7860206">Chỉ huy tham mưu Tăng - thiết giáp</option>
    <option value="7860207">Chỉ huy tham mưu Đặc công</option>
    <option value="7860214">Biên phòng</option>
    <option value="7860217">Tình báo quân sự</option>
    <option value="7860218">Hậu cần quân sự</option>
    <option value="7860219">Chỉ huy tham mưu thông tin</option>
    <option value="7860220">Chỉ huy quản lý kỹ thuật</option>
    <option value="7860222">Quân sự cơ sở</option>
    <option value="7860226">Chỉ huy kỹ thuật Phòng không</option>
    <option value="7860227">Chỉ huy kỹ thuật Tăng - thiết giáp</option>
    <option value="7860228">Chỉ huy kỹ thuật công binh</option>
    <option value="7860229">Chỉ huy kỹ thuật hóa học</option>
    <option value="7860231">Trinh sát kỹ thuật</option>
    <option value="7860232">Chỉ huy kỹ thuật hải quân</option>
    <option value="7860233">Chỉ huy kỹ thuật tác chiến điện tử</option>
    <option value="7900101">Quản trị Doanh nghiệp và Công nghệ</option>
    <option value="7900102">Marketing và Truyền thông</option>
    <option value="7900103">Quản trị Nhân lực và Nhân tài</option>
    <option value="7900189">Quản trị và An ninh</option>
  </select>
  <button type="button" class="btn" id="hide-major-3">
    <img
      src="../assets/icons/trash.png"
      alt="add icon"
      style="height: 1.5rem"
    />
  </button>`;

export const ttcn_selectpicker = `<div class="row mt-2">
  <div class="col">
    <label for="ttcn-level" class="form-label">Cấp thi:</label>
    <select
      id="ttcn-level"
      class="form-control form-select ttcn"
      data-subject="ttcn-level"
    >
      <option value="0">Cấp Tỉnh</option>
      <option value="1">Cấp Quốc gia</option>
      <option value="2">Cấp Quốc tế / khu vực</option>
    </select>
  </div>
  <div class="col">
    <label for="ttcn-type" class="form-label">Giải:</label>
    <select
      id="ttcn-type"
      class="form-control ttcn"
      data-subject="ttcn-type"
    >
      <option value="0">Giải Tư / Giải khuyến khích</option>
      <option value="1">Giải Ba / HC Đồng</option>
      <option value="2">Giải Nhì / HC Bạc</option>
      <option value="3">Giải Nhất / HC Vàng</option>
    </select>
  </div>
  <div class="col col-md-2 d-flex justify-content-center">
    <button type="button" class="btn" id="hide-ttcn">
      <img
        src="../assets/icons/trash.png"
        alt="remove icon"
        style="height: 1.5rem"
      />
    </button>
  </div> </div>`;

export const cerf_selectpicker = `<div class="row align-items-center g-2 mt-2 cerf">
  <div class="col-auto">
    <label for="cerf-id" class="col-form-label">Tên chứng chỉ:</label>
  </div>
  <div class="col-auto">
    <select id="cerf-id" class="form-control cerf-id">
      <option value="SAT">SAT</option>
      <option value="ACT">ACT</option>
      <option value="ALEVEL">A-level</option>
      <option value="IB">IB</option>
    </select>
  </div>
  <div class="col-auto">
    <label for="cerf-p" class="col-form-label">Điểm:</label>
  </div>
  <div class="col-auto">
    <input type="text" id="cerf-p" class="form-control cerf-p" autocomplete="off" />
  </div>
  <div class="col-auto">
    <button type="button" class="btn" id="hide-cerf">
      <img
        src="../assets/icons/trash.png"
        alt="trash icon"
        style="height: 1.5rem"
      />
    </button>
  </div>
</div>
<div class="fst-italic">Đối với A-level, chỉ nhập các điểm A, B, C, D.</div>`;

export function getOptionArr(selectpickerContent) {
  let tempElm = document.createElement("div");
  tempElm.innerHTML = selectpickerContent;

  let tempSelect = tempElm.querySelector("select");

  let optionArr = Array.from(tempSelect.options).map((opt) => opt.value);

  return optionArr;
}
