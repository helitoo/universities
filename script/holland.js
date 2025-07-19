import hollandModel from "./holland_model.js";
import {
  getData,
  exportCode,
  importCode,
  importCodeFromRaw,
  removeCode,
  saveData,
} from "./code_model.js";

document.addEventListener("DOMContentLoaded", () => {
  let user = getData(new hollandModel(), "Holland");
  exportCode(user);
  importCode();
  importCodeFromRaw(user);
  removeCode(user);
  saveData(user, "Holland");
});
