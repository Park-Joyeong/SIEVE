const $csrfmiddlewaretoken = document.querySelector(
  "input[name=csrfmiddlewaretoken]"
);

const $listItem = document.querySelector(".list-item");
let listedCompany; //관심종목의 companyname, updated, category을 찾기위한 용도
let draggedDOM;
let sourceDivID;

/* 전체 종목 검색 이벤트 발생 시, 검색 결과 종목 */
function componentRenderingSearch(obj, word) {
  listedCompany = obj["listedCompany"];
  let newListedCompany = [];
  for (var i=0; i<listedCompany.length; i++) {
    if (listedCompany[i].fields.company_name.includes(word)) {
      newListedCompany.push(listedCompany[i]);
    }
  }
  console.log(newListedCompany);
  const $contentsListedCompany = document.querySelector("#contents-listed-company");
  $contentsListedCompany.innerHTML = "";
  renderListedCompany(newListedCompany);
  obj["stocksOfInterest"].forEach((obj) => {
    setActiveCompanyList(obj.fields.company_code);
  });
}

function componentRendering(obj) {
  listedCompany = obj["listedCompany"];
  renderListedCompany(obj["listedCompany"]);
  renderStocksOfInterest(obj["stocksOfInterest"]);
}

function renderListedCompany(listedCompany) {
  var parent = document.querySelector("#contents-listed-company");
  listedCompany.forEach(function (obj) {
    var item = $listItem.cloneNode(true);
    var spanCompanyName = item.getElementsByClassName("company-name");
    var spanCode = item.getElementsByClassName("code");
    var spanUpdated = item.getElementsByClassName("updated");
    var spanCategory = item.getElementsByClassName("category");

    spanCompanyName[0].innerHTML = obj.fields.company_name;
    spanCode[0].innerHTML = obj.pk;
    spanUpdated[0].innerHTML = obj.fields.updated;
    spanCategory[0].innerHTML = obj.fields.category;
    parent.append(item);
  });
}

function renderStocksOfInterest(stocksOfInterest) {
  var parent = document.querySelector("#contents-interest-company");

  stocksOfInterest.forEach(function (obj) {
    setActiveCompanyList(obj.fields.company_code);

    var item = $listItem.cloneNode(true);
    var spanCompanyName = item.getElementsByClassName("company-name");
    var spanCode = item.getElementsByClassName("code");
    var spanUpdated = item.getElementsByClassName("updated");
    var spanCategory = item.getElementsByClassName("category");

    // Find companyname, updated, category
    var code = obj.fields.company_code;
    var company_name;
    var updated;
    var category;
    for (let el of listedCompany) {
      if (code === el.pk) {
        var company_name = el.fields.company_name;
        var updated = el.fields.updated;
        var category = el.fields.category;
        break;
      }
    }
    spanCompanyName[0].innerHTML = company_name;
    spanCode[0].innerHTML = code;
    spanUpdated[0].innerHTML = updated;
    spanCategory[0].innerHTML = category;
    parent.append(item);
  });
}

function setActiveCompanyList(code) {
  var items = document.querySelectorAll("#contents-listed-company > div");

  items.forEach(function (item) {
    if (item.getElementsByClassName("code")[0].innerHTML === code) {
      item.classList.add("active");
    }
  });
}

function onDoubleClicked(dom) {
  clickedCompanyCode = dom.getElementsByClassName("code")[0].innerHTML;

  var items = document.querySelectorAll("#contents-listed-company > div");

  items.forEach(function (item) {
    if (
      item.getElementsByClassName("code")[0].innerHTML === clickedCompanyCode
    ) {
      var length = item.classList.length;
      var isActive = false;
      for (var i = 0; i < length; i++) {
        if (item.classList[i] === "active") {
          isActive = true;
          item.classList.remove("active");
          var targets = document.querySelectorAll(
            "#contents-interest-company > div"
          );
          for (var j = 0; j < targets.length; j++) {
            if (
              targets[j].querySelector(".code").innerHTML === clickedCompanyCode
            ) {
              targets[j].remove();
              break;
            }
          }
        }
      }
      if (!isActive) {
        item.classList.add("active");
        var parent = document.querySelector("#contents-interest-company");
        var item = $listItem.cloneNode(true);
        var spanCompanyName = item.getElementsByClassName("company-name");
        var spanCode = item.getElementsByClassName("code");
        var spanUpdated = item.getElementsByClassName("updated");
        var spanCategory = item.getElementsByClassName("category");

        // Find companyname, updated, category
        var code = clickedCompanyCode;
        var company_name;
        var updated;
        var category;
        for (let el of listedCompany) {
          if (code === el.pk) {
            var company_name = el.fields.company_name;
            var updated = el.fields.updated;
            var category = el.fields.category;
            break;
          }
        }
        spanCompanyName[0].innerHTML = company_name;
        spanCode[0].innerHTML = code;
        spanUpdated[0].innerHTML = updated;
        spanCategory[0].innerHTML = category;
        parent.append(item);
      }
    }
  });
}

function save() {
  let formData = new FormData();
  let selected = [];

  var parent = document.querySelectorAll("#contents-interest-company > div");
  for (var i = 0; i < parent.length; i++) {
    selected.push(parent[i].querySelector(".code").innerHTML);
  }

  formData.append("csrfmiddlewaretoken", $csrfmiddlewaretoken.value);

  formData.append("selected", selected);

  fetch("", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.is_success == true) {
        alert('저장완료.');
        window.location.href = "/dashboard/show";
      }

    });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedDOM = ev.target;
  sourceDivID = ev.target.id;
  if (sourceDivID === '') {
    sourceDivID = findParentBySelector(ev.target, ".area-content-list").id;
  }
}

function drop(ev) {
  ev.preventDefault();
  let targetDivID = ev.target.id;
  if (targetDivID === '') {
    targetDivID = findParentBySelector(ev.target, ".area-content-list").id;
  }


  if (
    (sourceDivID === 'contents-listed-company'
      && targetDivID === 'contents-interest-company')//Add
    ||
    (sourceDivID === 'contents-interest-company'
      && targetDivID === 'contents-listed-company')//Remove
  ) {
    onDoubleClicked(draggedDOM);
  }



}

function collectionHas(a, b) { //helper function (see below)
  for (var i = 0, len = a.length; i < len; i++) {
    if (a[i] == b) return true;
  }
  return false;
}
function findParentBySelector(elm, selector) {
  var all = document.querySelectorAll(selector);
  var cur = elm.parentNode;
  while (cur && !collectionHas(all, cur)) { //keep going up until you find a match
    cur = cur.parentNode; //go up
  }
  return cur; //will return null if not found
}