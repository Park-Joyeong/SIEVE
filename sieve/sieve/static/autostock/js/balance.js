const fetchStockBalance = async() => {
    let url = "../stock_balance/json";
    let response = await fetch(url, {
        method: "GET"
    });

    const results = await response.json();
    const stockBalance = await results.stock_balance;
    return stockBalance; // StockBalance Array
}

const showStockBalance = async() => {
    const stockBalance = await fetchStockBalance();
    const $balanceTbody = document.querySelector(".balance-tbody");
    let output = ``;
    for (var i=0; i<stockBalance.length; i++) {
        output += `
            <tr class="stock-balance">
                <td rowspan="2" class="d-none"></td>
                <td class="company-name">${stockBalance[i].company_name}</td>
                <td class="current-price">${stockBalance[i].current_pice}</td>
                <td class="evaluation-amount">${stockBalance[i].evaluation_amount}</td>
                <td class="valuation-profit-or-loss">${stockBalance[i].valuation_profit_or_loss}</td>
            </tr>
            <tr class="stock-balance">
                <td class="holding-quantity">${stockBalance[i].holding_quantity}</td>
                <td class="purchase-unit-price">${stockBalance[i].purchase_unit_price}</td>
                <td class="purchase-amount">${stockBalance[i].purchase_amount}</td>
                <td class="profit-or-loss-rate">손익률</td>
            </tr>
        `
    }
    $balanceTbody.innerHTML = output;
}

// 1. DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    showStockBalance();
})

// 2. 주식 매수 후 이벤트 발생

// 3. 주식 매도 후 이벤트 발생