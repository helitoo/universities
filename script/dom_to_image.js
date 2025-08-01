window.addEventListener("DOMContentLoaded", () => {
  window.capture = async function (imgName) {
    const node = document.getElementById("main-container");
    const clone = node.cloneNode(true);

    // Thay canvas bằng ảnh để tránh lỗi
    const originalCanvases = node.querySelectorAll("canvas");
    const cloneCanvases = clone.querySelectorAll("canvas");
    originalCanvases.forEach((canvas, i) => {
      const img = new Image();
      img.src = canvas.toDataURL("image/png");
      img.style.width = canvas.style.width || canvas.width + "px";
      img.style.height = canvas.style.height || canvas.height + "px";
      cloneCanvases[i].replaceWith(img);
    });

    // Tạo container ẩn để render đúng style và layout
    const hiddenWrapper = document.createElement("div");
    hiddenWrapper.style.position = "fixed";
    hiddenWrapper.style.top = "-9999px";
    hiddenWrapper.style.width = "2000px"; // Cố định width
    hiddenWrapper.style.zIndex = "-1";
    hiddenWrapper.appendChild(clone);
    document.body.appendChild(hiddenWrapper);

    await html2canvas(clone, {
      backgroundColor: "white",
      scale: 1,
      useCORS: true,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = `${imgName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch((err) => {
        alert("Lỗi khi chụp ảnh: " + err);
      })
      .finally(() => {
        hiddenWrapper.remove(); // Dọn DOM
      });
  };
});
