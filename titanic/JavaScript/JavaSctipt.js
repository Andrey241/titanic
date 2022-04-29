const btnAdd = document.querySelector(".btn-add");
const tableMenu = document.querySelector(".table-menu");
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");

const nav = document.querySelector(".nav");
const checkListArray = [];

//Получаем данные с JSON
function getPassenger(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json"
  );
  xhr.addEventListener("load", () => {
    const titanicList = JSON.parse(xhr.responseText);
    cb(titanicList);
  });
  xhr.send();
}
//Вызываем функцию, которая сообщает какие ключи есть в объекте, все эти ключи отобразятся в виде чек-боксов на страницы
getPassenger((titanicList) => {
  CheckBox(titanicList);
});

//Вешаем событие на кнопку
btnAdd.addEventListener("click", (e) => {
  getPassenger((titanicList) => {
    checkListFunction();

    valueList(titanicList);
    tableMenu.style.backgroundColor = "white";
    lazyLoad();
  });
});

//Получаем ключи из первого объекта в массиве и добавляем их в таблицу
function keyList(el) {
  const tr = document.createElement("tr");
  for (let key of el) {
    const th = document.createElement("th");
    th.innerHTML = key;
    tr.append(th);
  }
  thead.append(tr);
  btnAdd.remove();
}

// Получаем значения ключей и помещяем их в таблицу
function valueList(el) {
  // comparison(el);

  el.map(function (item, index, array) {
    const tr = document.createElement("tr");
    for (let key in item) {
      for (let jey in checkListArray) {
        if (key == checkListArray[jey]) {
          const td = document.createElement("td");
          td.innerHTML = item[key];
          tr.setAttribute("loading", "lazy");
          tr.append(td);
        }
      }
    }

    tbody.append(tr);
  });
}

// Ленивая загрузка
function lazyLoad() {
  let elementsCount = [];
  const alltr = document.querySelectorAll("tr");
  elementsCount.push(alltr);
}

function CheckBox(el) {
  const navList = document.createElement("div");
  navList.classList = "nav-list";
  for (let key in el[0]) {
    const label = document.createElement("label");
    label.innerHTML = key;
    const input = document.createElement("input");
    input.setAttribute("data-check", key);
    input.type = "checkbox";
    label.prepend(input);
    navList.append(label);
  }
  nav.append(navList);
}

function checkListFunction() {
  const checkList = document.querySelectorAll(".nav input:checked");
  console.log(checkList);
  checkList.forEach((item, index, array) => {
    checkListArray.push(item.dataset.check);
  });
  Object.values(checkListArray);

  keyList(checkListArray);
}

// function comparison() {
//   checkListArray.map(function (newObj) {
//     newObj.reduce((previusValue, item2) => {
//       previusValue[item2] = newObj[item2];
//       return previusValue;
//     }, {});
//     console.log(previusValue);
//   });
// }
