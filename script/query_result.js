import filterModel from "./filter_model.js";
import hollandModel from "./holland_model.js";
import queryModel from "./query_model.js";

import { getGroupName, getMethodeName } from "./score_convert_model.js";

import { getValidScore, getValidValue } from "./score_validator_model.js";

import { showLoading, hideLoading } from "./loading.js";

import { getData } from "./code_model.js";

import {
  schoolId_selectpicker,
  major1Id_selectpicker,
  major3Id_selectpicker,
} from "./html_code_consts.js";

import { showToast } from "./toast.js";

const CURR_YEAR = 2025;

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
  // Calc data

  let filterData = getData(new filterModel(), "Filter");
  let hollandData = getData(new hollandModel(), "Holland");

  let querier = new queryModel();

  await querier.calcExtra(filterData, CURR_YEAR);

  await querier.calcMain(filterData, CURR_YEAR);

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

  document
    .getElementById("num-rcm-major")
    .addEventListener(
      "blur",
      (event) =>
        (event.target.value = getValidValue(
          event.target.value,
          true,
          1,
          444,
          2,
          111
        ))
    );

  document
    .getElementById("max-score")
    .addEventListener(
      "blur",
      (event) =>
        (event.target.value = getValidValue(
          event.target.value,
          false,
          -30,
          30,
          4,
          21
        ))
    );

  document
    .getElementById("min-score")
    .addEventListener(
      "blur",
      (event) =>
        (event.target.value = getValidValue(
          event.target.value,
          false,
          -30,
          30,
          4,
          1
        ))
    );

  document.querySelectorAll("input[type='text']").forEach((input) => {
    input.addEventListener("focus", (event) => {
      event.target.select();
    });
  });

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

      if (document.getElementById("apply-holland").checked) {
        querier.calcHolland(hollandData);

        if (queryExtraInfo.has("industry_l1_id"))
          queryExtraInfo
            .get("industry_l1_id")
            .push(...querier.majorFromHolland);
      }

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
        showToast("Không tìm thấy ngành phù hợp!", "danger");
        showToast("Đề xuất: Giảm mức điểm tối thiểu xuống", "primary", "5000");
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
