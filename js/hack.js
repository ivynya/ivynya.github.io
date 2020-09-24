
// Script pulls data from Maintained.cc
// Updates next meeting information

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://maintained.cc/SDBagel/Hack/1/json")
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      document.querySelector("#nextMeetingLabel").innerText = res.title;
      document.querySelector("#nextMeeting").innerHTML = res.value;
    })
    .catch(ex => console.log(ex));
});