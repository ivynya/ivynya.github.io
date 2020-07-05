// Swaps theme - home page only
function themeSwap() {
  if (document.documentElement.getAttribute("data-theme") === "sakura")
    document.documentElement.setAttribute("data-theme", "");
  else
    document.documentElement.setAttribute("data-theme", "sakura");
}

// Gets contact form info, links with a mailto
function contacter(e) {
  let subj = document.getElementById("contact_subject").value;
  let body = document.getElementById("contact_message").value;
  window.location.href = "mailto:sdbagel@gmail.com?subject="+subj+"&body="+body;
  e.preventDefault();
}