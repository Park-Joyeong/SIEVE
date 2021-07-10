const candleStick = {


  /*
  Args:
    obj = {companyCode:'000020', companyName:'동화약품'}
  */
  loadCandlestick: function (obj) {
    const { companyCode, companyName } = obj;

    let resultArr = [];
    fetch("../getTradingInfo?" + "companyCode=" + companyCode)
      .then((response) => response.json())
      .then((data) => {
        var tradingInfo = JSON.parse(data.tradingInfo);

        var tempArr = [];

        tradingInfo.forEach(element => {
          tempArr = [];
          tempArr.push(new Date(element.fields.date + 'T00:00:00').getTime());
          tempArr.push(element.fields.open);
          tempArr.push(element.fields.high);
          tempArr.push(element.fields.low);
          tempArr.push(element.fields.close);
          resultArr.push(tempArr);
        });//foreach

        
        resultArr.sort(function(a, b){return a[0] - b[0]});

        const chart = Highcharts.stockChart("container", {
          plotOptions: {
            candlestick: {
                       color: '#1b61d1',
                       upColor: '#f51818',
                   }
               },
          rangeSelector: {
            selected: 1,
          },

          title: {
            text: companyName + "(" + companyCode + ")"
          },

          series: [{
            type: "candlestick",
            name: companyName + "(" + companyCode + ")",
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

      });//callback

  }//loadCandlestick()
};//const candlestick
