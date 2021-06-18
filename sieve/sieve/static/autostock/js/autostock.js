const $csrfmiddlewaretoken = document.querySelector(
  "input[name=csrfmiddlewaretoken]"
);

function componentRendering(obj) {
  renderListedCompany(obj["listedCompany"]);
  renderStocksOfInterest(obj["stocksOfInterest"]);
}

function renderListedCompany(listedCompany) {
  console.log(listedCompany);
}

function renderStocksOfInterest(stocksOfInterest) {
  console.log(stocksOfInterest);
}

function test(num) {
  let formData = new FormData();
  formData.append("csrfmiddlewaretoken", $csrfmiddlewaretoken.value);
  if(num===0) {
    formData.append("selected", []);
  }
  if(num===1) {
    formData.append("selected", ['001122']);
  }
  if(num===2) {
    formData.append("selected", ['001122', '068270']);
  }
  
  fetch("", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {});
}
