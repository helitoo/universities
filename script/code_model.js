export function exportCode(user) {
  document.getElementById("export-code").addEventListener("click", (event) => {
    let code = user.getCode();

    document.getElementById("code-replacement").value = code;

    try {
      navigator.clipboard.writeText(code);
    } catch (err) {
      alert(
        "Không sử dụng được clipboard. Hãy kiểm tra lại trình duyệt của mình HOẶC copy code ở khung bên cạnh."
      );
    }
  });
}

export function importCode() {
  document
    .getElementById("import-code")
    .addEventListener("click", async (event) => {
      try {
        document.getElementById("code-replacement").value =
          await navigator.clipboard.readText();

        document.getElementById("import-code-raw").click();
      } catch (err) {
        alert(
          "Không sử dụng được clipboard. Hãy kiểm tra lại trình duyệt của mình HOẶC paste code vào khung bên cạnh và nhấn vào nút 'Nạp code thô'."
        );
      }
    });
}

export function importCodeFromRaw(user) {
  document
    .getElementById("import-code-raw")
    .addEventListener("click", (event) => {
      let code = document.getElementById("code-replacement").value;

      if (!user.decode(code)) alert("Code không hợp lệ.");
      else {
        user.updatePage();
      }
    });
}

export function removeCode(key) {
  document.getElementById("remove-code").addEventListener("click", (event) => {
    localStorage.setItem(key, "");
  });
}

export function refreshCode(user) {
  document.getElementById("refresh-code").addEventListener("click", (event) => {
    user.resetValue();
    user.updatePage();
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
