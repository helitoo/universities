import filterModel from "./filter_model.js";

import {
  schoolId_selectpicker,
  major1Id_selectpicker,
  major3Id_selectpicker,
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

showLoading();

document.addEventListener("DOMContentLoaded", () => {
  let user = getData(new filterModel(), "Filter");

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
  scoreValidate(".thnk-p", "thnk");

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
  //     user.addSlpk(
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
  //     user.addSlpk(
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
  //     user.addSlpk(
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
      user.addSlpk(
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
      user.addSlpk(
        cerf_selectpicker,
        [],
        "#hide-cerf",
        "cerf-replacement",
        "cerf"
      )
    );

  exportCode(user);
  importCode();
  importCodeFromRaw(user);
  refreshCode(user);

  saveData(user, "Filter");
  removeCode("Filter");

  hideLoading();
});
