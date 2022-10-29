let periodSelectorBtns = Array.from(
  document.querySelectorAll(".periodSelector > button")
);

periodSelectorBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
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
    let title = document.querySelector(
      `.${element.title.toLowerCase().split(" ").join("")}>.content>.top>.title`
    );
    title.textContent = element.title;

    let currentHours = document.querySelector(
      `.${element.title
        .toLowerCase()
        .split(" ")
        .join("")}>.content>.bottom>.currentHours`
    );
    // console.log(element.timeframes[timeType]);
    currentHours.textContent = `${element.timeframes[periodType].current}hrs`;

    let previousHours = document.querySelector(
      `.${element.title
        .toLowerCase()
        .split(" ")
        .join("")}>.content>.bottom>.previousHours>span`
    );
    previousHours.textContent = `${element.timeframes[periodType].previous}hrs`;
  });
}

// timeframes:

// daily:  { current: 5, previous: 7 }

// monthly:  { current: 103, previous: 128 }

// weekly:  { current: 32, previous: 36 }
