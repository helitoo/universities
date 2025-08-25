import { showToast } from "./toast.js";

export function exportCode(user) {
  document.getElementById("export-code").addEventListener("click", (event) => {
    let code = user.getCode();

    document.getElementById("code-replacement").value = code;

    try {
      navigator.clipboard.writeText(code);
    } catch (err) {
      showToast(
        "Không sử dụng được clipboard. Hãy kiểm tra lại trình duyệt của mình HOẶC copy code ở khung bên cạnh.",
        "danger"
      );
    }
  });
}

export function importCode() {
  let codeReplacement = document.getElementById("code-replacement");

  document
    .getElementById("import-code")
    .addEventListener("click", async (event) => {
      try {
        codeReplacement.value = await navigator.clipboard.readText();

        document.getElementById("import-code-raw").click();
      } catch (err) {
        showToast(
          "Không sử dụng được clipboard. Hãy kiểm tra lại trình duyệt của mình HOẶC copy code ở khung bên cạnh.",
          "danger"
        );

        codeReplacement.value = "";
      }
    });
}

export function importCodeFromRaw(user) {
  let codeReplacement = document.getElementById("code-replacement");

  document
    .getElementById("import-code-raw")
    .addEventListener("click", (event) => {
      let code = codeReplacement.value;

      if (!user.decode(code)) {
        showToast("Code không hợp lệ.", "danger");
        codeReplacement.value = "";
      } else {
        user.updatePage();
      }
    });
}

export function removeCode(key) {
  document.getElementById("remove-code").addEventListener("click", (event) => {
    localStorage.setItem(key, "");
    showToast("Đã xóa code!", "success");
  });
}

export function refreshCode(user) {
  document.getElementById("refresh-code").addEventListener("click", (event) => {
    user.resetValue();
    user.updatePage();
    showToast("Đã reset code!", "success");
  });
}

export function getData(user, key) {
  try {
    user.decode(localStorage.getItem(key));
    return user;
  } catch (err) {
    return user;
  }
}

export function saveData(user, key) {
  window.addEventListener("beforeunload", (event) => {
    try {
      localStorage.setItem(key, user.getCode());
    } catch (err) {
      event.preventDefault();
      event.returnValue =
        "Không truy cập được LocalStorage. Hãy copy code bên dưới trước khi thoát.";
    }
  });
}
