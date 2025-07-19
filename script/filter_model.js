import {
  schoolId_selectpicker,
  major1Id_selectpicker,
  major3Id_selectpicker,
  cerf_selectpicker,
  getOptionArr,
  ttcn_selectpicker,
} from "./html_code_consts.js";

import { getInRangeVal } from "./score_convert_model.js";

export default class filterModel {
  applySubject = new Map([
    ["to", true],
    ["vl", false],
    ["hh", false],
    ["sh", false],
    ["th", false],
    ["nv", true],
    ["ls", true],
    ["dl", false],
    ["nn", true],
    ["cn", false],
    ["gd", false],
  ]);

  thhb_P = new Map([
    ["to", new Array(6)],
    ["vl", new Array(6)],
    ["hh", new Array(6)],
    ["sh", new Array(6)],
    ["th", new Array(6)],
    ["nv", new Array(6)],
    ["ls", new Array(6)],
    ["dl", new Array(6)],
    ["nn", new Array(6)],
    ["cn", new Array(6)],
    ["gd", new Array(6)],
  ]);

  thpt_P = new Map([
    ["to", null],
    ["vl", null],
    ["hh", null],
    ["sh", null],
    ["th", null],
    ["nv", null],
    ["ls", null],
    ["dl", null],
    ["nn", null],
    ["gd", null],
    ["c1", null],
    ["c2", null],
  ]);

  dgtd_P = null;
  dghn_P = null;

  dgsg_P = new Map([
    ["nn", null],
    ["to", null],
    ["kh", null],
  ]);

  dgsp_P = new Map([
    ["to", null],
    ["vl", null],
    ["hh", null],
    ["sh", null],
    ["th", null],
    ["nv", null],
    ["ls", null],
    ["dl", null],
    ["an", null],
    ["cn", null],
    ["gd", null],
  ]);

  dgcb_P = new Map([
    ["to", null],
    ["vl", null],
    ["hh", null],
    ["sh", null],
    ["nv", null],
    ["an", null],
  ]);

  vsat_P = new Map([
    ["to", null],
    ["vl", null],
    ["hh", null],
    ["sh", null],
    ["nv", null],
    ["ls", null],
    ["dl", null],
    ["an", null],
  ]);

  dgca_P = new Map([
    ["ca1", null],
    ["ca2", null],
    ["ca3", null],
    ["ca4", null],
  ]);

  thnk_P = new Array(3);

  point_range = new Map([
    ["min", 15],
    ["max", 1],
  ]);

  ielts_P = 0;

  school = new Map([
    ["id", []],
    ["type", [true, true]],
    ["region", [true, true, false, false, false]],
  ]);

  major = new Map([
    ["1", []],
    ["3", []],
  ]);

  ttcn = new Map([
    ["level", []],
    ["type", []],
  ]);

  cerf = new Map([
    ["id", []],
    ["p", []],
  ]);

  priority = new Map([
    ["dtut", 0],
    ["kvut", 3],
  ]);

  count_field = new Map([
    ["acv", [0, 8]],
    ["school_id", [0, 8]],
    ["school_type", [0, 8]],
    ["school_region", [0, 8]],
    ["major_1", [0, 8]],
    ["major_3", [0, 8]],
    ["ttcn", [0, 8]],
    ["cerf", [0, 8]],
  ]);

  resetValue() {
    this.applySubject = new Map([
      ["to", true],
      ["vl", false],
      ["hh", false],
      ["sh", false],
      ["th", false],
      ["nv", true],
      ["ls", true],
      ["dl", false],
      ["nn", true],
      ["cn", false],
      ["gd", false],
    ]);

    this.thhb_P = new Map([
      ["to", new Array(6)],
      ["vl", new Array(6)],
      ["hh", new Array(6)],
      ["sh", new Array(6)],
      ["th", new Array(6)],
      ["nv", new Array(6)],
      ["ls", new Array(6)],
      ["dl", new Array(6)],
      ["nn", new Array(6)],
      ["cn", new Array(6)],
      ["gd", new Array(6)],
    ]);

    this.thpt_P = new Map([
      ["to", null],
      ["vl", null],
      ["hh", null],
      ["sh", null],
      ["th", null],
      ["nv", null],
      ["ls", null],
      ["dl", null],
      ["nn", null],
      ["gd", null],
      ["c1", null],
      ["c2", null],
    ]);

    this.dgtd_P = null;
    this.dghn_P = null;

    this.dgsg_P = new Map([
      ["nn", null],
      ["to", null],
      ["kh", null],
    ]);

    this.dgsp_P = new Map([
      ["to", null],
      ["vl", null],
      ["hh", null],
      ["sh", null],
      ["th", null],
      ["nv", null],
      ["ls", null],
      ["dl", null],
      ["an", null],
      ["cn", null],
      ["gd", null],
    ]);

    this.dgcb_P = new Map([
      ["to", null],
      ["vl", null],
      ["hh", null],
      ["sh", null],
      ["nv", null],
      ["an", null],
    ]);

    this.vsat_P = new Map([
      ["to", null],
      ["vl", null],
      ["hh", null],
      ["sh", null],
      ["nv", null],
      ["ls", null],
      ["dl", null],
      ["an", null],
    ]);

    this.dgca_P = new Map([
      ["ca1", null],
      ["ca2", null],
      ["ca3", null],
      ["ca4", null],
    ]);

    this.thnk_P = new Array(3);

    this.point_range = new Map([
      ["min", 15],
      ["max", 1],
    ]);

    this.ielts_P = 0;

    this.school = new Map([
      ["id", []],
      ["type", [true, true]],
      ["region", [true, true, false, false, false]],
    ]);

    this.major = new Map([
      ["1", []],
      ["3", []],
    ]);

    this.ttcn = new Map([
      ["level", []],
      ["type", []],
    ]);

    this.cerf = new Map([
      ["id", []],
      ["p", []],
    ]);

    this.priority = new Map([
      ["dtut", 0],
      ["kvut", 3],
    ]);

    this.count_field = new Map([
      ["acv", [0, 8]],
      ["school_id", [0, 8]],
      ["school_type", [0, 8]],
      ["school_region", [0, 8]],
      ["major_1", [0, 8]],
      ["major_3", [0, 8]],
      ["ttcn", [0, 8]],
      ["cerf", [0, 8]],
    ]);
  }

  addSlpk(
    slpkContent, // string
    values, // array
    hideBtnSlt, // selector
    replacementId, // id
    countKey // string
  ) {
    if (
      this.count_field.get(countKey)[0] + 1 >
      this.count_field.get(countKey)[1]
    ) {
      alert(
        `Đã đạt số lượng tối đa dữ liệu ở trường này tối đa được phép thêm (${
          this.count_field.get(countKey)[1]
        }).`
      );
      return;
    }

    this.count_field.get(countKey)[0]++;

    let elm = document.createElement("div");
    elm.innerHTML = slpkContent;

    document.getElementById(replacementId).appendChild(elm);

    let inputs = elm.querySelectorAll(
      'select.selectpicker, input[type="text"]'
    );

    for (let i = 0; i < inputs.length; i++)
      if (inputs[i].classList.contains("selectpicker")) {
        $(inputs[i]).selectpicker();
        $(inputs[i]).selectpicker("render");

        if (values[i] !== undefined) {
          $(inputs[i]).selectpicker("val", values[i]);
          // $(inputs[i]).selectpicker("refresh");
        }
      } else if (values[i] !== undefined) inputs[i].value = values[i];

    elm.querySelector(hideBtnSlt).addEventListener("click", (event) => {
      elm
        .querySelectorAll("select.selectpicker")
        .forEach((input) => $(input).selectpicker("destroy"));

      elm.remove();
      this.count_field.get(countKey)[0]--;
    });

    if (countKey == "cerf") {
      let slpk = elm.querySelector("select.selectpicker");
      let txt = elm.querySelector('input[type="text"]');

      txt.addEventListener("blur", (event) => {
        let cerfId = slpk.value;

        let cerfP = txt.value
          .replace(",", ".")
          .replace(/[^0-9\.]/g, "")
          .toUpperCase();

        if (cerfId == "ALEVEL") {
          if (cerfP != "A" && cerfP != "B" && cerfP != "C" && cerfP != "D")
            cerfP = "D";
        } else {
          cerfP = parseInt(cerfP);

          if (isNaN(cerfP)) cerfP = 0;

          if (cerfId == "SAT") cerfP = getInRangeVal(cerfP, 400, 1600);
          else if (cerfId == "ACT") cerfP = getInRangeVal(cerfP, 1, 36);
          else cerfP = getInRangeVal(cerfP, 24, 45);
        }

        txt.value = cerfP;
      });

      slpk.addEventListener("change", (event) => {
        txt.dispatchEvent(new Event("blur"));
      });

      txt.dispatchEvent(new Event("blur"));
    }
  }

  getValidValue(elm) {
    if (elm.tagName === "INPUT" && elm.type === "checkbox") return elm.checked;
    if (elm.value == "") return null;
    else if (/^[a-zA-Z]+$/.test(elm.value)) return elm.value;
    else return Number(elm.value);
  }

  updateAtt() {
    this.resetValue();

    const updateSttField = (elmSlt, classField) => {
      document.querySelectorAll(elmSlt).forEach((elm) => {
        let subject = elm.dataset.subject;
        let index = elm.dataset.index;
        let value = this.getValidValue(elm);

        if (subject === undefined && index === undefined)
          this[classField] = value;
        else if (subject === undefined && index !== undefined)
          this[classField][index] = value;
        else if (subject !== undefined && index === undefined)
          this[classField].set(subject, value);
        else this[classField].get(subject)[index] = value;
      });
    };

    const updateDnmField = (elmSlt, classField, subject) => {
      this[classField].set(subject, []);

      document.querySelectorAll(elmSlt).forEach((elm) => {
        this[classField].get(subject).push(this.getValidValue(elm));
      });
    };

    updateSttField(".apply-subject", "applySubject");
    updateSttField(".thnk-p", "thnk_P");
    updateSttField(".thhb-p", "thhb_P");
    updateSttField(".school-type", "school");
    updateSttField(".school-region", "school");
    updateSttField(".thpt-p", "thpt_P");
    updateSttField(".dgsg-p", "dgsg_P");
    updateSttField(".dgsp-p", "dgsp_P");
    updateSttField(".dgcb-p", "dgcb_P");
    updateSttField(".vsat-p", "vsat_P");
    updateSttField(".dgca-p", "dgca_P");
    updateSttField(".point-range-p", "point_range");
    updateSttField("#dgtd-p", "dgtd_P");
    updateSttField("#dghn-p", "dghn_P");
    updateSttField("#ielts-p", "ielts_P");

    updateDnmField("select.school-id", "school", "id");
    updateDnmField("select.major-1-id", "major", "1");
    updateDnmField("select.major-3-id", "major", "3");
    updateDnmField('[data-subject="ttcn-level"]', "ttcn", "level");
    updateDnmField('[data-subject="ttcn-type"]', "ttcn", "type");
    updateDnmField("select.cerf-id", "cerf", "id");
    updateDnmField("input.cerf-p", "cerf", "p");
  }

  updatePage() {
    const updateSttField = (elmSlt, classField) => {
      document.querySelectorAll(elmSlt).forEach((elm) => {
        let subject = elm.dataset.subject;
        let index = elm.dataset.index;

        let value;

        if (subject === undefined && index === undefined)
          value = this[classField];
        else if (subject === undefined && index !== undefined)
          value = this[classField][index];
        else if (subject !== undefined && index === undefined)
          value = this[classField].get(subject);
        else value = this[classField].get(subject)[index];

        if (elm.tagName === "INPUT" && elm.type === "checkbox") {
          elm.checked = Boolean(value);
          elm.dispatchEvent(new Event("change"));
        } else {
          elm.value = value;
          elm.dispatchEvent(new Event("blur"));
        }
      });
    };

    updateSttField(".apply-subject", "applySubject");
    updateSttField(".thnk-p", "thnk_P");
    updateSttField(".thhb-p", "thhb_P");
    updateSttField(".school-type", "school");
    updateSttField(".school-region", "school");
    updateSttField(".thpt-p", "thpt_P");
    updateSttField(".dgsg-p", "dgsg_P");
    updateSttField(".dgsp-p", "dgsp_P");
    updateSttField(".dgcb-p", "dgcb_P");
    updateSttField(".vsat-p", "vsat_P");
    updateSttField(".dgca-p", "dgca_P");
    updateSttField(".point-range-p", "point_range");
    updateSttField("#dgtd-p", "dgtd_P");
    updateSttField("#dghn-p", "dghn_P");
    updateSttField("#ielts-p", "ielts_P");

    const updateSglDnmField = (
      replacementId,
      classField,
      valKey,
      countKey,
      slpkContent,
      hideBtnId,
      regex
    ) => {
      $(`#${replacementId} .selectpicker`).selectpicker("destroy");
      document.getElementById(replacementId).innerHTML = "";
      this.count_field.get(countKey)[0] = 0;

      for (let val of this[classField].get(valKey)) {
        let cleanedVal = val.toString().toUpperCase().replace(regex, "");

        if (
          this.count_field.get(countKey)[0] >= this.count_field.get(countKey)[1]
        )
          break;

        if (!getOptionArr(slpkContent).includes(cleanedVal)) continue;

        this.addSlpk(
          slpkContent,
          [cleanedVal],
          hideBtnId,
          replacementId,
          countKey
        );
      }
    };

    updateSglDnmField(
      "school-id-replacement",
      "school",
      "id",
      "school_id",
      schoolId_selectpicker,
      "#hide-school-id",
      /[^A-Z]/g
    );

    updateSglDnmField(
      "major-1-replacement",
      "major",
      "1",
      "major_1",
      major1Id_selectpicker,
      "#hide-major-1",
      /[^0-9]/g
    );

    updateSglDnmField(
      "major-3-replacement",
      "major",
      "3",
      "major_3",
      major3Id_selectpicker,
      "#hide-major-3",
      /[^0-9]/g
    );

    const updateTplDnmField = (
      replacementId,
      classField,
      selectKey,
      textKey,
      countKey,
      slpkContent,
      hideBtnId,
      regex
    ) => {
      let minLength = Math.min(
        this[classField].get(selectKey).length,
        this[classField].get(textKey).length
      );

      this[classField].set(
        selectKey,
        this[classField].get(selectKey).slice(0, minLength)
      );

      this[classField].set(
        textKey,
        this[classField].get(textKey).slice(0, minLength)
      );

      $(`#${replacementId} .selectpicker`).selectpicker("destroy");
      document.getElementById(replacementId).innerHTML = "";
      this.count_field.get(countKey)[0] = 0;

      for (let i = 0; i < minLength; i++) {
        let cleanedId = this[classField]
          .get(selectKey)
          [i].toString()
          .toUpperCase()
          .replace(regex, "");

        if (
          this.count_field.get(countKey)[0] >= this.count_field.get(countKey)[1]
        )
          break;

        if (!getOptionArr(slpkContent).includes(cleanedId)) continue;

        this.addSlpk(
          slpkContent,
          [cleanedId, this[classField].get(textKey)[i]],
          hideBtnId,
          replacementId,
          countKey
        );
      }
    };

    updateTplDnmField(
      "ttcn-replacement",
      "ttcn",
      "level",
      "type",
      "ttcn",
      ttcn_selectpicker,
      "#hide-ttcn",
      /[^0-9]/g
    );

    updateTplDnmField(
      "cerf-replacement",
      "cerf",
      "id",
      "p",
      "cerf",
      cerf_selectpicker,
      "#hide-cerf",
      /[^A-Z]/g
    );
  }

  getJSON() {
    const convertField = (classField) => {
      if (classField instanceof Map)
        return Object.fromEntries(classField.entries());
      else return classField;
    };

    return {
      applySubject: convertField(this.applySubject),
      thhb_P: convertField(this.thhb_P),
      thpt_P: convertField(this.thpt_P),
      dgtd_P: convertField(this.dgtd_P),
      dghn_P: convertField(this.dghn_P),
      dgsg_P: convertField(this.dgsg_P),
      dgsp_P: convertField(this.dgsp_P),
      dgcb_P: convertField(this.dgcb_P),
      vsat_P: convertField(this.vsat_P),
      dgca_P: convertField(this.dgca_P),
      thnk_P: convertField(this.thnk_P),
      point_range: convertField(this.point_range),
      ielts_P: convertField(this.ielts_P),
      school: convertField(this.school),
      major: convertField(this.major),
      ttcn: convertField(this.ttcn),
      cerf: convertField(this.cerf),
      priority: convertField(this.priority),
    };
  }

  getCode() {
    this.updateAtt();
    return btoa(JSON.stringify(this.getJSON()));
  }

  decode(code) {
    const getType = (value) => {
      if (value == null || typeof value !== "object") return "Pri";
      else if (Array.isArray(value)) return "Arr";
      else return "Map";
    };

    const validateValue = (value) => {
      let vType = getType(value);

      if (vType == "Pri") {
        if (value == null || value == undefined || Number.isNaN(value))
          value = null;
      } else if (vType == "Arr")
        value = value.filter((x) => x != undefined && !Number.isNaN(x));

      return value;
    };

    const validPri = (validValue, value) => {
      let currType = getType(value);

      if (currType == "Pri") validValue = value;
      else if (currType == "Arr") validValue = value[0];

      return validValue;
    };

    const validArr = (validValue, value) => {
      if (Array.isArray(value)) {
        if (validValue.length == 0) {
          return value;
        }

        const len = validValue.length;

        if (value.length >= len) return value.slice(0, len);
        else return value.concat(new Array(len - value.length).fill(null));
      }

      return Array.isArray(validValue)
        ? new Array(validValue.length).fill(value)
        : validValue;
    };

    try {
      this.resetValue();

      let jsonObj = JSON.parse(atob(code));

      for (let [key, value] of Object.entries(jsonObj)) {
        value = validateValue(value);

        if (this.hasOwnProperty(key)) {
          let validType = getType(this[key]);
          let currType = getType(value);

          if (validType == "Pri") this[key] = validPri(this[key], value);
          else if (validType == "Arr") this[key] = validArr(this[key], value);
          else {
            if (currType == "Pri" || currType == "Arr") continue;

            for (let [vKey, vValue] of Object.entries(value)) {
              vValue = validateValue(vValue);

              if (this[key].has(vKey)) {
                let vValidType = getType(this[key].get(vKey));

                if (vValidType == "Pri")
                  this[key].set(vKey, validPri(this[key].get(vKey), vValue));
                else if (vValidType == "Arr")
                  this[key].set(vKey, validArr(this[key].get(vKey), vValue));
              }
            }
          }
        }
      }
      this.updatePage();

      return true;
    } catch (error) {
      return false;
    }
  }
}
