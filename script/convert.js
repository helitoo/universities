import {
  round2,
  getDist,
  getGroupDist,
  getPercentile,
  getScoreAtPercentile,
} from "./score_convert_model.js";

import { getValidValue } from "./score_validator_model.js";

import queryModel from "./query_model.js";

import { showLoading, hideLoading } from "./loading.js";

import { showToast } from "./toast.js";

const slpkContent = `
<label class="form-label fw-bold">Tổ hợp</label>
<select
  class="selectpicker"
  data-live-search="true"
  data-size="5"
>
  <option value="G001">Toán-Lý-Hóa</option>
  <option value="G002">Toán-Lý-Sinh</option>
  <option value="G003">Toán-Lý-Văn</option>
  <option value="G004">Toán-Lý-Sử</option>
  <option value="G005">Toán-Lý-Địa</option>
  <option value="G006">Toán-Lý-GD</option>
  <option value="G007">Toán-Lý-Tin</option>
  <option value="G008">Toán-Lý-CNCN</option>
  <option value="G009">Toán-Lý-CNNN</option>
  <option value="G010">Toán-Lý-Anh</option>
  <option value="G011">Toán-Hóa-Sinh</option>
  <option value="G012">Toán-Hóa-Văn</option>
  <option value="G013">Toán-Hóa-Sử</option>
  <option value="G014">Toán-Hóa-Địa</option>
  <option value="G015">Toán-Hóa-GD</option>
  <option value="G016">Toán-Hóa-Tin</option>
  <option value="G017">Toán-Hóa-CNCN</option>
  <option value="G018">Toán-Hóa-CNNN</option>
  <option value="G019">Toán-Hóa-Anh</option>
  <option value="G020">Toán-Sinh-Văn</option>
  <option value="G021">Toán-Sinh-Sử</option>
  <option value="G022">Toán-Sinh-Địa</option>
  <option value="G023">Toán-Sinh-GD</option>
  <option value="G024">Toán-Sinh-Tin</option>
  <option value="G025">Toán-Sinh-CNCN</option>
  <option value="G026">Toán-Sinh-CNNN</option>
  <option value="G027">Toán-Sinh-Anh</option>
  <option value="G028">Toán-Văn-Sử</option>
  <option value="G029">Toán-Văn-Địa</option>
  <option value="G030">Toán-Văn-GD</option>
  <option value="G031">Toán-Văn-Tin</option>
  <option value="G032">Toán-Văn-CNCN</option>
  <option value="G033">Toán-Văn-CNNN</option>
  <option value="G034">Toán-Văn-Anh</option>
  <option value="G035">Toán-Sử-Địa</option>
  <option value="G036">Toán-Sử-GD</option>
  <option value="G037">Toán-Sử-Tin</option>
  <option value="G038">Toán-Sử-CNCN</option>
  <option value="G039">Toán-Sử-CNNN</option>
  <option value="G040">Toán-Sử-Anh</option>
  <option value="G041">Toán-Địa-GD</option>
  <option value="G042">Toán-Địa-Tin</option>
  <option value="G043">Toán-Địa-CNCN</option>
  <option value="G044">Toán-Địa-CNNN</option>
  <option value="G045">Toán-Địa-Anh</option>
  <option value="G046">Toán-GD-Tin</option>
  <option value="G047">Toán-GD-CNCN</option>
  <option value="G048">Toán-GD-CNNN</option>
  <option value="G049">Toán-GD-Anh</option>
  <option value="G050">Toán-Tin-CNCN</option>
  <option value="G051">Toán-Tin-CNNN</option>
  <option value="G052">Toán-Tin-Anh</option>
  <option value="G053">Toán-CNCN-CNNN</option>
  <option value="G054">Toán-CNCN-Anh</option>
  <option value="G055">Toán-CNNN-Anh</option>
  <option value="G056">Lý-Hóa-Sinh</option>
  <option value="G057">Lý-Hóa-Văn</option>
  <option value="G058">Lý-Hóa-Sử</option>
  <option value="G059">Lý-Hóa-Địa</option>
  <option value="G060">Lý-Hóa-GD</option>
  <option value="G061">Lý-Hóa-Tin</option>
  <option value="G062">Lý-Hóa-CNCN</option>
  <option value="G063">Lý-Hóa-CNNN</option>
  <option value="G064">Lý-Hóa-Anh</option>
  <option value="G065">Lý-Sinh-Văn</option>
  <option value="G066">Lý-Sinh-Sử</option>
  <option value="G067">Lý-Sinh-Địa</option>
  <option value="G068">Lý-Sinh-GD</option>
  <option value="G069">Lý-Sinh-Tin</option>
  <option value="G070">Lý-Sinh-CNCN</option>
  <option value="G071">Lý-Sinh-CNNN</option>
  <option value="G072">Lý-Sinh-Anh</option>
  <option value="G073">Lý-Văn-Sử</option>
  <option value="G074">Lý-Văn-Địa</option>
  <option value="G075">Lý-Văn-GD</option>
  <option value="G076">Lý-Văn-Tin</option>
  <option value="G077">Lý-Văn-CNCN</option>
  <option value="G078">Lý-Văn-CNNN</option>
  <option value="G079">Lý-Văn-Anh</option>
  <option value="G080">Lý-Sử-Địa</option>
  <option value="G081">Lý-Sử-GD</option>
  <option value="G082">Lý-Sử-Tin</option>
  <option value="G083">Lý-Sử-CNCN</option>
  <option value="G084">Lý-Sử-CNNN</option>
  <option value="G085">Lý-Sử-Anh</option>
  <option value="G086">Lý-Địa-GD</option>
  <option value="G087">Lý-Địa-Tin</option>
  <option value="G088">Lý-Địa-CNCN</option>
  <option value="G089">Lý-Địa-CNNN</option>
  <option value="G090">Lý-Địa-Anh</option>
  <option value="G091">Lý-GD-Tin</option>
  <option value="G092">Lý-GD-CNCN</option>
  <option value="G093">Lý-GD-CNNN</option>
  <option value="G094">Lý-GD-Anh</option>
  <option value="G095">Lý-Tin-CNCN</option>
  <option value="G096">Lý-Tin-CNNN</option>
  <option value="G097">Lý-Tin-Anh</option>
  <option value="G098">Lý-CNCN-CNNN</option>
  <option value="G099">Lý-CNCN-Anh</option>
  <option value="G100">Lý-CNNN-Anh</option>
  <option value="G101">Hóa-Sinh-Văn</option>
  <option value="G102">Hóa-Sinh-Sử</option>
  <option value="G103">Hóa-Sinh-Địa</option>
  <option value="G104">Hóa-Sinh-GD</option>
  <option value="G105">Hóa-Sinh-Tin</option>
  <option value="G106">Hóa-Sinh-CNCN</option>
  <option value="G107">Hóa-Sinh-CNNN</option>
  <option value="G108">Hóa-Sinh-Anh</option>
  <option value="G109">Hóa-Văn-Sử</option>
  <option value="G110">Hóa-Văn-Địa</option>
  <option value="G111">Hóa-Văn-GD</option>
  <option value="G112">Hóa-Văn-Tin</option>
  <option value="G113">Hóa-Văn-CNCN</option>
  <option value="G114">Hóa-Văn-CNNN</option>
  <option value="G115">Hóa-Văn-Anh</option>
  <option value="G116">Hóa-Sử-Địa</option>
  <option value="G117">Hóa-Sử-GD</option>
  <option value="G118">Hóa-Sử-Tin</option>
  <option value="G119">Hóa-Sử-CNCN</option>
  <option value="G120">Hóa-Sử-CNNN</option>
  <option value="G121">Hóa-Sử-Anh</option>
  <option value="G122">Hóa-Địa-GD</option>
  <option value="G123">Hóa-Địa-Tin</option>
  <option value="G124">Hóa-Địa-CNCN</option>
  <option value="G125">Hóa-Địa-CNNN</option>
  <option value="G126">Hóa-Địa-Anh</option>
  <option value="G127">Hóa-GD-Tin</option>
  <option value="G128">Hóa-GD-CNCN</option>
  <option value="G129">Hóa-GD-CNNN</option>
  <option value="G130">Hóa-GD-Anh</option>
  <option value="G131">Hóa-Tin-CNCN</option>
  <option value="G132">Hóa-Tin-CNNN</option>
  <option value="G133">Hóa-Tin-Anh</option>
  <option value="G134">Hóa-CNCN-CNNN</option>
  <option value="G135">Hóa-CNCN-Anh</option>
  <option value="G136">Hóa-CNNN-Anh</option>
  <option value="G137">Sinh-Văn-Sử</option>
  <option value="G138">Sinh-Văn-Địa</option>
  <option value="G139">Sinh-Văn-GD</option>
  <option value="G140">Sinh-Văn-Tin</option>
  <option value="G141">Sinh-Văn-CNCN</option>
  <option value="G142">Sinh-Văn-CNNN</option>
  <option value="G143">Sinh-Văn-Anh</option>
  <option value="G144">Sinh-Sử-Địa</option>
  <option value="G145">Sinh-Sử-GD</option>
  <option value="G146">Sinh-Sử-Tin</option>
  <option value="G147">Sinh-Sử-CNCN</option>
  <option value="G148">Sinh-Sử-CNNN</option>
  <option value="G149">Sinh-Sử-Anh</option>
  <option value="G150">Sinh-Địa-GD</option>
  <option value="G151">Sinh-Địa-Tin</option>
  <option value="G152">Sinh-Địa-CNCN</option>
  <option value="G153">Sinh-Địa-CNNN</option>
  <option value="G154">Sinh-Địa-Anh</option>
  <option value="G155">Sinh-GD-Tin</option>
  <option value="G156">Sinh-GD-CNCN</option>
  <option value="G157">Sinh-GD-CNNN</option>
  <option value="G158">Sinh-GD-Anh</option>
  <option value="G159">Sinh-Tin-CNCN</option>
  <option value="G160">Sinh-Tin-CNNN</option>
  <option value="G161">Sinh-Tin-Anh</option>
  <option value="G162">Sinh-CNCN-CNNN</option>
  <option value="G163">Sinh-CNCN-Anh</option>
  <option value="G164">Sinh-CNNN-Anh</option>
  <option value="G165">Văn-Sử-Địa</option>
  <option value="G166">Văn-Sử-GD</option>
  <option value="G167">Văn-Sử-Tin</option>
  <option value="G168">Văn-Sử-CNCN</option>
  <option value="G169">Văn-Sử-CNNN</option>
  <option value="G170">Văn-Sử-Anh</option>
  <option value="G171">Văn-Địa-GD</option>
  <option value="G172">Văn-Địa-Tin</option>
  <option value="G173">Văn-Địa-CNCN</option>
  <option value="G174">Văn-Địa-CNNN</option>
  <option value="G175">Văn-Địa-Anh</option>
  <option value="G176">Văn-GD-Tin</option>
  <option value="G177">Văn-GD-CNCN</option>
  <option value="G178">Văn-GD-CNNN</option>
  <option value="G179">Văn-GD-Anh</option>
  <option value="G180">Văn-Tin-CNCN</option>
  <option value="G181">Văn-Tin-CNNN</option>
  <option value="G182">Văn-Tin-Anh</option>
  <option value="G183">Văn-CNCN-CNNN</option>
  <option value="G184">Văn-CNCN-Anh</option>
  <option value="G185">Văn-CNNN-Anh</option>
  <option value="G186">Sử-Địa-GD</option>
  <option value="G187">Sử-Địa-Tin</option>
  <option value="G188">Sử-Địa-CNCN</option>
  <option value="G189">Sử-Địa-CNNN</option>
  <option value="G190">Sử-Địa-Anh</option>
  <option value="G191">Sử-GD-Tin</option>
  <option value="G192">Sử-GD-CNCN</option>
  <option value="G193">Sử-GD-CNNN</option>
  <option value="G194">Sử-GD-Anh</option>
  <option value="G195">Sử-Tin-CNCN</option>
  <option value="G196">Sử-Tin-CNNN</option>
  <option value="G197">Sử-Tin-Anh</option>
  <option value="G198">Sử-CNCN-CNNN</option>
  <option value="G199">Sử-CNCN-Anh</option>
  <option value="G200">Sử-CNNN-Anh</option>
  <option value="G201">Địa-GD-Tin</option>
  <option value="G202">Địa-GD-CNCN</option>
  <option value="G203">Địa-GD-CNNN</option>
  <option value="G204">Địa-GD-Anh</option>
  <option value="G205">Địa-Tin-CNCN</option>
  <option value="G206">Địa-Tin-CNNN</option>
  <option value="G207">Địa-Tin-Anh</option>
  <option value="G208">Địa-CNCN-CNNN</option>
  <option value="G209">Địa-CNCN-Anh</option>
  <option value="G210">Địa-CNNN-Anh</option>
  <option value="G211">GD-Tin-CNCN</option>
  <option value="G212">GD-Tin-CNNN</option>
  <option value="G213">GD-Tin-Anh</option>
  <option value="G214">GD-CNCN-CNNN</option>
  <option value="G215">GD-CNCN-Anh</option>
  <option value="G216">GD-CNNN-Anh</option>
  <option value="G217">Tin-CNCN-CNNN</option>
  <option value="G218">Tin-CNCN-Anh</option>
  <option value="G219">Tin-CNNN-Anh</option>
  <option value="G220">CNCN-CNNN-Anh</option>
</select>
`;

document.addEventListener("DOMContentLoaded", (event) => {
  let querier = new queryModel();

  // Focus on first-score input
  document
    .getElementById("first-score")
    .addEventListener("focus", (event) => event.target.select());

  // Validator first-score input
  document.getElementById("first-score").addEventListener("blur", (event) => {
    let score = event.target.value;
    let exam = document.getElementById("first-exam").value;

    switch (exam) {
      case "thpt":
      case "dgcb":
        event.target.value = getValidValue(score, false, 0, 30, 2);
        break;
      case "dgtd":
        event.target.value = getValidValue(score, false, 0, 100, 2);
        break;
      case "dghn":
        event.target.value = getValidValue(score, false, 0, 150, 2);
        break;
      default:
        event.target.value = getValidValue(score, true, 0, 1200, 2);
        break;
    }
  });

  document.getElementById("first-exam").addEventListener("change", () => {
    document.getElementById("first-score").dispatchEvent(new Event("blur"));
  });

  document.getElementById("sec-exam").addEventListener("change", () => {
    document.getElementById("sec-score").dispatchEvent(new Event("blur"));
  });

  // Add slpk

  function addSlpk(examInputId, replacementId) {
    let examInput = document.getElementById(examInputId);

    examInput.addEventListener("change", (event) => {
      let slpkReplacement = document.getElementById(replacementId);

      if (event.target.value == "thpt") {
        slpkReplacement.innerHTML = slpkContent;

        setTimeout(() => {
          $(`#${replacementId} select.selectpicker`).selectpicker();
          $(`#${replacementId} select.selectpicker`).selectpicker("render");
        }, 0);
      } else slpkReplacement.innerHTML = "";
    });

    examInput.dispatchEvent(new Event("change"));
  }

  addSlpk("first-exam", "first-slpk-replacement");
  addSlpk("sec-exam", "sec-slpk-replacement");

  // Convert score
  document.getElementById("convert-btn").addEventListener("click", async () => {
    // Get data
    let firstScore = document.getElementById("first-score").value;
    if (firstScore == "") {
      showToast("Chưa nhập điểm đầu vào!", "danger");
      return;
    }

    function getInfo(methodId, yearId, slkpSlt) {
      let slpk = document.querySelector(slkpSlt);

      return {
        method: document.getElementById(methodId).value,
        year: document.getElementById(yearId).value,
        group: slpk ? slpk.value : "",
      };
    }

    let firstInfo = getInfo(
      "first-exam",
      "first-year",
      "#first-slpk-replacement select.selectpicker"
    );

    let secInfo = getInfo(
      "sec-exam",
      "sec-year",
      "#sec-slpk-replacement select.selectpicker"
    );

    if (firstInfo.method != "thpt") firstInfo.group = "al";
    if (secInfo.method != "thpt" && secInfo.method != "dgcb")
      secInfo.group = "al";

    // Fetch data from base

    showLoading();

    async function fetchDistFor(dataInfo) {
      if (dataInfo.method == "thpt")
        return await getGroupDist(
          querier.supabase,
          dataInfo.method,
          dataInfo.group,
          dataInfo.year,
          10,
          {}
        );
      else
        return await getDist(
          querier.supabase,
          dataInfo.method,
          dataInfo.group,
          dataInfo.year,
          10
        );
    }

    let firstDist = await fetchDistFor(firstInfo);
    let secDist =
      secInfo.method == firstInfo.method &&
      secInfo.year == firstInfo.year &&
      secInfo.group == firstInfo.group
        ? firstDist
        : await fetchDistFor(secInfo);

    let percentile = getPercentile(firstScore, firstDist);
    document.getElementById("percentile").textContent = `${round2(
      percentile * 100,
      2
    )}%`;

    let secScore = getScoreAtPercentile(percentile, secDist);
    document.getElementById("sec-score").textContent = `${round2(secScore, 2)}`;

    hideLoading();
  });
});
