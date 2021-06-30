const $itemInterestList = document.querySelector(".item-interest-list");

window.onload = (event) => {


  fetch("../../interest/json")
    .then((response) => response.json())
    .then((data) => {
      rtnArr = data['data'];
      renderStocksOfInterest(rtnArr)
    });

};

function renderStocksOfInterest(stocksOfInterest) {
  var parent = document.querySelector("#contents-interest-company");

  stocksOfInterest.forEach( obj => {
    var item = $itemInterestList.cloneNode(true);
    var spanCompanyName = item.getElementsByClassName("company-name");
    var spanCode = item.getElementsByClassName("code");
    var spanUpdated = item.getElementsByClassName("updated");
    var spanCategory = item.getElementsByClassName("category");

    // Find companyname, updated, category
    var code = obj.company_code;
    var company_name = obj.company_name;
    var updated = obj.created;
    var category = obj.category;
    spanCompanyName[0].innerHTML = company_name;
    spanCode[0].innerHTML = code;
    spanUpdated[0].innerHTML = updated;
    spanCategory[0].innerHTML = category;
    parent.append(item);
  });
}

function goToEditPage() {
  window.location.href = "/interest/edit";
}