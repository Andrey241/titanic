//кнопка - обработчик события
const btnAdd = document.querySelector(".btn-add");
//элементы таблицы
const tableMenu = document.querySelector(".table-menu");
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");

//чекбоксы
const nav = document.querySelector(".nav");
//Массив, куда будут записаны выбранные чекбоксы
let checkListArray = [];
//фильтр введеных значений
const input = document.querySelector("input");

//обработчик события нажатия кнопки
let checkClick = 1;

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
    if (checkClick === 1) {
      checkListFunction();
      valueList(titanicList);
      tableMenu.style.backgroundColor = "white";
      lazyLoad();
      checkClick = 0;
      return;
    } else if (checkClick === 0) {
      checkListArray = [];
      const allCreateTr = document.querySelectorAll("tr");
      allCreateTr.forEach((item, index, array) => {
        tbody.innerHTML = "";
        item.remove();
      });
      checkClick = 1;
      return;
    }
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
  // btnAdd.remove();
  // nav.remove();
}

// Получаем значения ключей и помещяем их в таблицу
function valueList(el) {
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

//Осуществляем поиск выбранных значений из чекбоксов
function checkListFunction() {
  const checkList = document.querySelectorAll(".nav input:checked");
  checkList.forEach((item, index, array) => {
    checkListArray.push(item.dataset.check);
  });
  Object.values(checkListArray);

  keyList(checkListArray);
}

//Поиск значений из фильтра. Вызов производится из HTML
function filterSearch() {
  var phrase = document.getElementById("search-text");
  var table = document.getElementById("info-table");
  var regPhrase = new RegExp(phrase.value, "i");
  var flag = false;
  for (var i = 1; i < table.rows.length; i++) {
    flag = false;
    for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }
  }
}
