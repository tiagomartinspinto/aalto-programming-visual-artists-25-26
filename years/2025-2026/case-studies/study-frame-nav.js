(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("embed") === "1") return;

  const style = document.createElement("style");
  style.textContent = ".study-home-link{position:fixed;top:12px;left:12px;z-index:9999;padding:8px 10px;border:1px solid rgba(84,214,199,.44);border-radius:6px;background:rgba(9,11,15,.82);color:#54d6c7;font:780 13px Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-decoration:none;backdrop-filter:blur(12px)}.study-home-link:hover,.study-home-link:focus-visible{color:#f5f0e8;background:rgba(84,214,199,.14);outline:3px solid #f3c969;outline-offset:3px}";
  document.head.appendChild(style);

  const link = document.createElement("a");
  link.className = "study-home-link";
  link.href = "../index.html";
  link.textContent = "Back to gallery";
  link.setAttribute("aria-label", "Back to the student studies gallery");
  document.body.appendChild(link);
})();
