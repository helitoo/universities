export function showToast(message, type = "primary", delay = "2500") {
  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center bg-${type} text-white p-0 toast-slide-in`;
  toastEl.role = "alert";
  toastEl.ariaLive = "assertive";
  toastEl.ariaAtomic = "true";

  toastEl.setAttribute("data-bs-autohide", "true");
  toastEl.setAttribute("data-bs-delay", delay);

  let icon = "";

  switch (type) {
    case "success":
      icon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 text-white"
        style="height: 1.5rem; margin-right: 0.2rem"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"
        />
      </svg>`;
      break;
    case "danger":
    case "warning":
      icon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 text-white"
        style="height: 1.5rem; margin-right: 0.2rem"
      >
        <path
          fill-rule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clip-rule="evenodd"
        />
      </svg>`;
      break;
    default:
      icon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 text-white"
        style="height: 1.5rem; margin-right: 0.2rem"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clip-rule="evenodd"
        />
      </svg>`;
  }

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${icon} ${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    document.body.appendChild(container);
  }

  container.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl);

  toastEl.addEventListener("hide.bs.toast", (event) => event.target.remove());

  toast.show();
}
