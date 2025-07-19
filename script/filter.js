import filterModel from "./filter_model.js";

import {
  schoolId_selectpicker,
  major1Id_selectpicker,
  major3Id_selectpicker,
  ttcn_selectpicker,
  cerf_selectpicker,
} from "./html_code_consts.js";

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
        `.dgsp-input-${
          elm.dataset.subject == "nn" ? "an" : elm.dataset.subject
        }`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.dgcb-input-${
          elm.dataset.subject == "nn" ? "an" : elm.dataset.subject
        }`,
        elm.checked
      );

      updateInputDisplayStatus(
        `.vsat-input-${
          elm.dataset.subject == "nn" ? "an" : elm.dataset.subject
        }`,
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

  function getValidData(value, isInt, min, max, appreciate) {
    let temp = value.replace(",", ".").replace(/[^0-9\.]/g, "");

    if (isInt) temp = parseInt(temp);
    else temp = parseFloat(temp);

    if (Number.isNaN(temp)) return null;

    value = temp;

    value = Math.max(value, min);

    if (max != 10) value = Math.min(value, max);
    else if (!isInt) while (value > 10) value /= 10;

    let base = Math.pow(10, appreciate);
    value = Math.round(value * base) / base;

    return value;
  }

  function validator(elmSlt, eventType, isInt, min, max, appreciate) {
    document.querySelectorAll(elmSlt).forEach((elm) => {
      elm.addEventListener(eventType, (event) => {
        event.target.value = getValidData(
          event.target.value,
          isInt,
          min,
          max,
          appreciate
        );
      });
    });
  }

  validator(".thhb-p", "blur", false, 0, 10, 2);
  validator(".thpt-p", "blur", false, 0, 10, 2);
  validator("#dgtd-p", "blur", false, 0, 100, 2);
  validator("#dghn-p", "blur", true, 0, 150, 0);
  validator(".dgsp-p", "blur", false, 0, 10, 2);
  validator(".dgcb-p", "blur", false, 0, 10, 2);
  validator(".vsat-p", "blur", false, 0, 150, 2);
  validator(".dgca-p", "blur", false, 0, 100, 2);
  validator(".thnk-p", "blur", false, 0, 10, 2);

  document.querySelectorAll(".dgsg-p").forEach((input) => {
    input.addEventListener("blur", (event) => {
      const subject = event.target.dataset.subject;
      let value = parseInt(event.target.value.replace(/[^0-9\.]/g, ""));

      if (isNaN(value)) return;

      value = Math.max(value, 0);

      if (subject == "nn" && value > 600) value = 600;
      if (subject == "to" && value > 300) value = 300;
      if (subject == "kh" && value > 300) value = 300;

      event.target.value = value;
    });
  });

  document.querySelectorAll(".point-range-p").forEach((input) => {
    input.addEventListener("blur", (event) => {
      let value = parseFloat(
        event.target.value.replace(",", ".").replace(/[^0-9\.]/g, "")
      );

      if (isNaN(value)) {
        if (event.target.dataset.subject == "min") value = 15;
        else value = 1;
      }

      event.target.value = value;
    });
  });

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

  document
    .getElementById("show-school-id")
    .addEventListener("click", (event) =>
      user.addSlpk(
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
      user.addSlpk(
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
      user.addSlpk(
        major3Id_selectpicker,
        [],
        "#hide-major-3",
        "major-3-replacement",
        "major_3"
      )
    );

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
