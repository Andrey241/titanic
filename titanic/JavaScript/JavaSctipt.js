// кнопка - обработчик события
const btnAdd = document.querySelector(".btn-add");
// кнопка сортировки возраста
const btnSortId = document.querySelector(".btn-sort-id");
const btnSortClass = document.querySelector(".btn-sort-class");
const btnSortAge = document.querySelector(".btn-sort-age");
const btnSortSibsp = document.querySelector(".btn-sort-sibsp");
const btnSortParch = document.querySelector(".btn-sort-parch");
const btnSortTicket = document.querySelector(".btn-sort-ticket");
const btnSortFare = document.querySelector(".btn-sort-fare");

// элементы таблицы
const body = document.querySelector(".body");
const tableMenu = document.querySelector(".table-menu");
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");
const buttonsSort = document.querySelector(".button-sort");

// чекбоксы
const nav = document.querySelector(".nav");
// Массив, куда будут записаны выбранные чекбоксы
let checkListArray = [];
// фильтр введеных значений
const input = document.querySelector("input");

// обработчик события нажатия кнопки
let checkClick = true;
let isSorted = true;

// Получаем данные с JSON
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
// Вызываем функцию, которая сообщает какие ключи есть в объекте и вызываем функцию, которая все эти ключи отобразит в виде чек-боксов на странице
getPassenger((titanicList) => {
  CheckBox(titanicList);
});

// Вешаем событие на кнопку добавить пассажиров
btnAdd.addEventListener("click", (e) => {
  getPassenger((titanicList) => {
    const checkList = document.querySelectorAll(".nav input:checked");

    if (checkList.length > 0 && checkClick === true) {
      checkListFunction();
      valueList(titanicList);
      tableMenu.style.backgroundColor = "white";
      checkClick = false;
      checkSort(checkListArray);
      addButtonToHead();
      btnAdd.classList.toggle("_active");

      loadMore();
      return;
    } else if (checkClick === false) {
      btnAdd.classList.remove("_active");
      clearElements();
      return;
    }
  });
});

// добавялем кнопки сортировки в табилцу
function addButtonToHead() {
  const dataHeadTh = document.querySelectorAll("[data-head]");
  const dataHeadButton = document.querySelectorAll("[data-button-head]");
  dataHeadTh.forEach((item, index, array) => {
    dataHeadButton.forEach((itemButton, index, array) => {
      if (item.dataset.head == itemButton.dataset.buttonHead) {
        item.innerHTML = "";
        item.append(itemButton);
      }
    });
  });
}

// Вешаем событие на кнопку сортировки пользователей

function showAllLine() {
  const ptext = document.querySelectorAll("tbody tr");

  ptext.forEach((item) => {
    item.classList.remove("displayNone");
  });
}

//Получаем ключи из первого объекта в массиве и добавляем их в таблицу
function keyList(el) {
  const tr = document.createElement("tr");
  for (let key of el) {
    const th = document.createElement("th");
    th.innerHTML = key;
    tr.append(th);
    th.setAttribute([`data-head`], key);
  }
  thead.append(tr);
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
          checkClick = true;
          if (item[key] == null) {
            td.style.backgroundColor = "white";
          }
          //добавляем атрибут, равный значению элемента для последующей сортировки
          if (key == "age") {
            tr.setAttribute("data-age", item[key]);
          } else if (key == "id") {
            tr.setAttribute("data-Id", item[key]);
          } else if (key == "class") {
            tr.setAttribute("data-class", item[key]);
          } else if (key == "sibsp") {
            tr.setAttribute("data-sibsp", item[key]);
          } else if (key == "parch") {
            tr.setAttribute("data-parch", item[key]);
          } else if (key == "ticket") {
            tr.setAttribute("data-ticket", item[key]);
          } else if (key == "fare") {
            tr.setAttribute("data-fare", item[key]);
          }
          tr.append(td);
        }
      }
      tableMenu.style.marginBottom = "300px";
    }

    tbody.append(tr);
  });
}

// Ленивая загрузка

//из списка массивов выбираем первый объект и с помощью его ключей создаем чекбоксы на странице
function CheckBox(el) {
  const navList = document.createElement("div");
  navList.classList = "nav-list";
  for (let key in el[0]) {
    const label = document.createElement("label");
    label.innerHTML = `<div class="checkbox__text">${
      key.slice(0, 1).toUpperCase() + key.slice(1, key.length)
    }</div>`;
    label.style.fontSize = "20px";
    label.classList.add("checkbox");
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
  keyList(checkListArray);
}

//Поиск значений из фильтра. Вызов производится из HTML

function filterSearch() {
  const ptext = document.querySelectorAll("tbody tr");
  ptext.forEach((item) => {
    item.classList.remove("displayNone");
  });

  const phrase = document.getElementById("search-text");
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

//Чистит результаты поиска и фильтры
function clearElements() {
  const allCreateTr = document.querySelectorAll("tr");
  const btnSort = document.querySelectorAll("thead [data-button-head]");
  btnSort.forEach((item, index, array) => {
    buttonsSort.prepend(item);
    item.classList.add("displayNone");
    item.removeAttribute("data-button-head");
  });
  allCreateTr.forEach((item, index, array) => {
    tbody.innerHTML = "";
    item.remove();
  });

  checkListArray = [];
  checkClick = true;
  input.value = "";
  tableMenu.style.marginBottom = "20px";
  const checkList = document.querySelectorAll(".nav input:checked");
  checkList.forEach((item) => {
    item.checked = false;
  });
}
//Функции сортировки
//

//Количество строк в таблице
function collectionLengthFunction() {
  const alltr = document.querySelectorAll("[data-button-head]");
  collectionLength = alltr.length;
}
function checkSort(array) {
  for (let key in array) {
    if (array[key] == "id") {
      btnSortId.classList.remove("displayNone");
      btnSortId.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "age") {
      btnSortAge.classList.remove("displayNone");
      btnSortAge.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "sibsp") {
      btnSortSibsp.classList.remove("displayNone");
      btnSortSibsp.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "parch") {
      btnSortParch.classList.remove("displayNone");
      btnSortParch.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "ticket") {
      btnSortTicket.classList.remove("displayNone");
      btnSortTicket.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "class") {
      btnSortClass.classList.remove("displayNone");
      btnSortClass.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  for (let key in array) {
    if (array[key] == "fare") {
      btnSortClass.classList.remove("displayNone");
      btnSortClass.setAttribute("data-button-head", array[key]);
      isSorted = true;
    }
  }
  return;
}

// Подгрузка строк
function loadMore() {
  const pText = document.querySelectorAll("tbody tr");
  if (pText.length > 0) {
    pText.forEach((item, index, array) => {
      item.setAttribute(
        "data-coordinates",
        Math.floor(item.getBoundingClientRect().bottom + scrollY)
      );
      item.setAttribute("data-height", Math.floor(item.offsetHeight));
    });
  }
  pText.forEach((item) => {
    item.classList.add("displayNone");
  });
  for (let i = 0; i < 30; i++) {
    pText[i].classList.remove("displayNone");
  }
}
const windowsHeigth = document.documentElement.clientHeight - 100;

window.addEventListener("scroll", lazyScroll);
function lazyScroll() {
  const pText = document.querySelectorAll("tbody tr");

  pText.forEach((item, index, array) => {
    if (
      scrollY >=
      item.dataset.coordinates - windowsHeigth - item.dataset.height
    ) {
      item.classList.remove("displayNone");
    }
  });
}

btnSortAge.addEventListener("click", (e) => {
  showAllLine();
  if (isSorted) {
    sortAttributeAge();
    isSorted = false;
  } else {
    sortAttributeAgeReverse();
    isSorted = true;
  }
});

btnSortId.addEventListener("click", (e) => {
  showAllLine();
  if (isSorted) {
    sortAttributeId();
    isSorted = false;
  } else {
    sortAttributeIdReverse();
    isSorted = true;
  }
});

btnSortClass.addEventListener("click", () => {
  showAllLine();
  if (isSorted) {
    sortAttributeClass();
    isSorted = false;
  } else {
    sortAttributeClassReverse();
    isSorted = true;
  }
});

btnSortSibsp.addEventListener("click", () => {
  showAllLine();
  if (isSorted) {
    sortAttributeSibsp();
    isSorted = false;
  } else {
    sortAttributeSibspReverse();
    isSorted = true;
  }
});

btnSortParch.addEventListener("click", () => {
  showAllLine();
  if (isSorted) {
    sortAttributeParch();
    isSorted = false;
  } else {
    sortAttributeParchReverse();
    isSorted = true;
  }
});

btnSortTicket.addEventListener("click", () => {
  showAllLine();
  if (isSorted) {
    sortAttributeTicket();
    isSorted = false;
  } else {
    sortAttributeTicketReverse();
    isSorted = true;
  }
});

btnSortFare.addEventListener("click", () => {
  showAllLine();
  if (isSorted) {
    sortAttributeFare();
    isSorted = false;
  } else {
    sortAttributeFareReverse();
    isSorted = true;
  }
});

function sortAttributeAge() {
  const collection = document.querySelectorAll("[data-age]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-age") - b.getAttribute("data-age");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

// функции для сортировки
function sortAttributeId() {
  const collection = document.querySelectorAll("[data-Id]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-Id") - b.getAttribute("data-Id");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeClass() {
  const collection = document.querySelectorAll("[data-class]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-class") - b.getAttribute("data-class");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeSibsp() {
  const collection = document.querySelectorAll("[data-sibsp]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-sibsp") - b.getAttribute("data-sibsp");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeParch() {
  const collection = document.querySelectorAll("[data-parch]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-parch") - b.getAttribute("data-parch");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeTicket() {
  const collection = document.querySelectorAll("[data-ticket]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-ticket") - b.getAttribute("data-ticket");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeFare() {
  const collection = document.querySelectorAll("[data-fare]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return a.getAttribute("data-fare") - b.getAttribute("data-fare");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeAgeReverse() {
  const collection = document.querySelectorAll("[data-age]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-age") - a.getAttribute("data-age");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeIdReverse() {
  const collection = document.querySelectorAll("[data-Id]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-Id") - a.getAttribute("data-Id");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeClassReverse() {
  const collection = document.querySelectorAll("[data-class]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-class") - a.getAttribute("data-class");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeSibspReverse() {
  const collection = document.querySelectorAll("[data-sibsp]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-sibsp") - a.getAttribute("data-sibsp");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeParchReverse() {
  const collection = document.querySelectorAll("[data-parch]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-parch") - a.getAttribute("data-parch");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeTicketReverse() {
  const collection = document.querySelectorAll("[data-ticket]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-ticket") - a.getAttribute("data-ticket");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

function sortAttributeFareReverse() {
  const collection = document.querySelectorAll("[data-fare]");
  const tbody = document.querySelector("tbody");
  const tbodytr = document.querySelectorAll("tbody tr");
  tbodytr.forEach((item, index, array) => {
    item.remove();
  });

  let newColl = [];

  for (var i = collection.length - 1; i >= 0; i--) {
    newColl.push(collection[i]);
  }

  newColl.sort(function (a, b) {
    return b.getAttribute("data-fare") - a.getAttribute("data-fare");
  });

  newColl.forEach((item, index, array) => {
    tbody.append(item);
  });
}

// функции для сортировки
// function callSort() {
//   const btnSort = document.querySelectorAll("[data-button-head]");
//   const collection = document.querySelectorAll("[data-sort]");
//   let array = [];
//   collection.forEach((item) => {
//     array.push(item.dataset.sort);
//   });

//   btnSort.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       showAllLine();

//       if ("age" == event.target.dataset.buttonHead) {
//         console.log(1);
//         if (isSorted) {
//           sortAttribute("data-age", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-age", true);
//           isSorted = true;
//         }
//       } else if ("id" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-id", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-id", true);
//           isSorted = true;
//         }
//       } else if ("class" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-class", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-class", true);
//           isSorted = true;
//         }
//       } else if ("sibsp" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-sibsp", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-sibsp", true);
//           isSorted = true;
//         }
//       } else if ("ticket" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-ticket", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-ticket", true);
//           isSorted = true;
//         }
//       } else if ("parch" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-parch", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-parch", true);
//           isSorted = true;
//         }
//       } else if ("fare" == event.target.dataset.buttonHead) {
//         if (isSorted) {
//           sortAttribute("data-fare", false);
//           isSorted = false;
//         } else {
//           sortAttribute("data-fare", true);
//           isSorted = true;
//         }
//       }
//     });
//   });
// }
// function sortAttribute(element, isSorted) {
//   const collection = document.querySelectorAll("tbody tr");
//   const tbody = document.querySelector("tbody");
//   const tbodytr = document.querySelectorAll("tbody tr");
//   tbodytr.forEach((item, index, array) => {
//     item.remove();
//   });

//   let newColl = [];

//   for (var i = collection.length - 1; i >= 0; i--) {
//     newColl.push(collection[i]);
//   }

//   if (isSorted) {
//     newColl.sort(function (a, b) {
//       return a.getAttribute(element) - b.getAttribute(element);
//     });
//   } else {
//     newColl.sort(function (a, b) {
//       return b.getAttribute(element) - a.getAttribute(element);
//     });
//   }

//   newColl.forEach((item, index, array) => {
//     tbody.append(item);
//   });
// }
