const LOADING_ID = "loading-overlay";
const STICKER_URL = "../assets/loading-icon.gif";

export function showLoading() {
  if (document.getElementById(LOADING_ID)) return;

  const overlay = document.createElement("div");
  overlay.id = LOADING_ID;
  overlay.addEventListener("click", (e) => e.stopPropagation());
  overlay.addEventListener("mousedown", (e) => e.stopPropagation());
  overlay.addEventListener("mouseup", (e) => e.stopPropagation());
  overlay.addEventListener("keydown", (e) => e.stopPropagation());

  const img = document.createElement("img");
  img.src = STICKER_URL;
  img.draggable = false;
  overlay.appendChild(img);

  document.body.appendChild(overlay);
}

export function hideLoading() {
  const overlay = document.getElementById(LOADING_ID);
  if (overlay) overlay.remove();
}
