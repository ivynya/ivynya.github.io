function themeSwap() {
  if (document.documentElement.getAttribute("data-theme") === "sakura")
    document.documentElement.setAttribute("data-theme", "");
  else
    document.documentElement.setAttribute("data-theme", "sakura");
}