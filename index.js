let periodSelectorBtns = Array.from(
  document.querySelectorAll(".periodSelector > button")
);
let prev = document.querySelector("button.weekly");

periodSelectorBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    prev.classList.toggle("selected");
    event.target.classList.toggle("selected");
    prev = event.target;
    fetchData(event.target.textContent);
  });
});

function fetchData(periodType) {
  fetch("/data.json")
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      addToDom(jsonData, periodType);
    });
}

function addToDom(data, periodType) {
  data.forEach((element) => {
    console.log();
    let title = document.querySelector(
      `.${element.title.toLowerCase().split(" ").join("")}>.activityType .title`
    );
    title.textContent = element.title;

    let currentHours = document.querySelector(
      `.${element.title
        .toLowerCase()
        .split(" ")
        .join("")}>.activityType .currentHours`
    );
    currentHours.textContent = `${element.timeframes[periodType].current}hrs`;

    let previousHours = document.querySelector(
      `.${element.title
        .toLowerCase()
        .split(" ")
        .join("")}>.activityType .previousHours`
    );

    previousHours.textContent = `${element.timeframes[periodType].previous}hrs`;
  });
}

window.onload = function () {
  fetchData("weekly");
  document.querySelector("button.weekly").classList.toggle("selected");
};
