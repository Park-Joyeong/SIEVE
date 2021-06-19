const $csrfmiddlewaretoken = document.querySelector(
  "input[name=csrfmiddlewaretoken]"
);

const $itemListedCompany = document.querySelector(".item-listed-company");

function componentRendering(obj) {
  renderListedCompany(obj["listedCompany"]);
  renderStocksOfInterest(obj["stocksOfInterest"]);
}

function renderListedCompany(listedCompany) {
  console.log(listedCompany);
  var parent = document.querySelector("#contents-listed-company");
  listedCompany.forEach(function () {
    var ele = $itemListedCompany.cloneNode(true);

    // console.log("origin");
    // console.log(parent);
    // console.log('next');
    // console.log(origin.children);

    parent.append(ele);
  });
}

function renderStocksOfInterest(stocksOfInterest) {
  console.log('stocksOfInterest');
  console.log(stocksOfInterest);
}

function test(num) {
  let formData = new FormData();
  formData.append("csrfmiddlewaretoken", $csrfmiddlewaretoken.value);
  if (num === 0) {
    formData.append("selected", []);
  }
  if (num === 1) {
    formData.append("selected", ["001122"]);
  }
  if (num === 2) {
    formData.append("selected", ["001122", "068270"]);
  }

  fetch("", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {});
}
