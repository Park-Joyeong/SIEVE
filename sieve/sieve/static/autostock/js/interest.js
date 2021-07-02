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

  stocksOfInterest.forEach(obj => {
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

function showCandleChart(dom) {
  clickedCompanyCode = dom.getElementsByClassName("code")[0].innerHTML;
  clickedCompanyName = dom.getElementsByClassName("company-name")[0].innerHTML;
  let resultArr = [];
  fetch("../getTradingInfo?" + "companyCode=" + clickedCompanyCode)
    .then((response) => response.json())
    .then((data) => {
      var tradingInfo = JSON.parse(data.tradingInfo);
      var tempArr = [];

      tradingInfo.forEach(element => {
        tempArr = [];
        tempArr.push(new Date(element.fields.date+'T00:00:00').getTime());
        tempArr.push(element.fields.open);
        tempArr.push(element.fields.high);
        tempArr.push(element.fields.low);
        tempArr.push(element.fields.close);





        //TODO
        resultArr.push(JSON.parse(JSON.stringify(tempArr)));//Deep Copy
      });
      console.log('aaa')
      console.log(resultArr)
    });
    console.log('bbb')
    console.log(resultArr)

  // create the chart
  const chart = Highcharts.stockChart("container", {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: clickedCompanyName + "(" + clickedCompanyCode + ")"
    },

    series: [{
      type: "candlestick",
      name: clickedCompanyName + "(" + clickedCompanyCode + ")",
      data: resultArr,
      dataGrouping: {
        units: [
          [
            "week", // unit name
            [1], // allowed multiples
          ],
          ["month", [1, 2, 3, 4, 6]],
        ],
      },
    },],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          chart: {
            height: 205,
          },
          subtitle: {
            text: null,
          },
          navigator: {
            enabled: false,
          },
        },
      },],
    },
  });

  chart.setSize(null);
}