document.addEventListener("DOMContentLoaded", async () => {
  const stockBalance = await fetchStockBalance();
  renderDonutChart(stockBalance);
  showStockBalance(stockBalance);
});

const fetchStockBalance = async () => {
  let url = "../stock_balance/json";
  let response = await fetch(url, {
      method: "GET",
  });

  const results = await response.json();
  const stockBalance = await results.stock_balance;
  return stockBalance; // StockBalance Array
};