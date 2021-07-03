let data = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
  }]
};
let totalPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("../stock_balance/json")
    .then((response) => response.json())
    .then((data) => {
      renderDonutChart(data);
    });
});

function renderDonutChart(obj) {
  const arrStockBalance = obj.stock_balance;
  totalPrice = getTotalPrice(arrStockBalance);

  arrStockBalance.forEach(stock => {
    data.labels.push(stock.company_name);
    data.datasets[0].data.push(parseInt(stock.purchase_amount.replace(',', '')));
    data.datasets[0].backgroundColor.push(getRandomColorString());
  });


  new Chart(
    document.getElementById('myChart'),
    config
  );

}//renderDonutChart()


function getTotalPrice(arrStockBalance) {
  console.log(Chart.defaults.global.colours)

  let totalPrice = 0;//총 매입금액
  arrStockBalance.forEach(stock => {
    totalPrice += parseInt(stock.purchase_amount.replace(',', ''));
  });
  return totalPrice;
}

function getRandomColorString() {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var h = randomInt(0, 360);
  var s = randomInt(42, 98);
  var l = randomInt(40, 90);
  return `hsl(${h},${s}%,${l}%)`;

}


const config = {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {

      datalabels: {
        color: '#ffffff',
        formatter: (value) => {
          return Math.round(value / totalPrice * 1000) / 10 + '%';
        }
      }
    }
  },
};


