(function () {
  const targets = document.querySelectorAll("[data-last-updated]");
  if (!targets.length) return;

  const modified = new Date(document.lastModified);
  const label = Number.isNaN(modified.getTime())
    ? "Last updated: unavailable"
    : `Last updated: ${new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(modified)}`;

  targets.forEach((target) => {
    target.textContent = label;
  });
})();
