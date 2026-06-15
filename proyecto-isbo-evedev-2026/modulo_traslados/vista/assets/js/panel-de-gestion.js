/* Navigation */
function navigate(el) {
  // Remove active from all links
  document
    .querySelectorAll(".nav-link-custom")
    .forEach((l) => l.classList.remove("active"));
  el.classList.add("active");

  // Hide all views
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));

  // Show target
  const target = el.getAttribute("data-view");
  document.getElementById("view-" + target).classList.add("active");

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
  }
}

/* Tabs inside Recursos */
function switchTab(el, tabId) {
  document
    .querySelectorAll(".tab-pill")
    .forEach((p) => p.classList.remove("active"));
  el.classList.add("active");
  document
    .querySelectorAll(".tab-content-panel")
    .forEach((t) => (t.style.display = "none"));
  document.getElementById(tabId).style.display = "block";
}

/* Mobile sidebar toggle */
document.getElementById("mobileToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});
