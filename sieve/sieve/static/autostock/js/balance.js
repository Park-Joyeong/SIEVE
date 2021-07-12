
const showStockBalance = (stockBalance) => {
    const $balanceTbody = document.querySelector(".balance-tbody");
    let output = ``;
    if (stockBalance.length === 0) {
        output += `
            <tr class="stock-balance">
                <td rowspan="2" class="d-none"></td>
                <td class="company-name">보유한 주식이 없습니다</td>
                <td class="current-price"></td>
                <td class="evaluation-amount"></td>
                <td class="valuation-profit-or-loss"></td>
            </tr>
            <tr class="stock-balance">
                <td class="holding-quantity"></td>
                <td class="purchase-unit-price"></td>
                <td class="purchase-amount"></td>
                <td class="profit-or-loss-rate"></td>
            </tr>
        `;
    } else {
        output = ``;
        for (var i = 0; i < stockBalance.length; i++) {
            const rate = stockBalance[i].profit_or_loss_rate;
            let gainOrLoss = '';
            if (rate > 0) gainOrLoss = 'gain';
            else if (rate < 0) gainOrLoss = 'loss';

            output += `
                <tr class="stock-balance" onClick="candleStick.loadCandlestick({ companyCode: '${stockBalance[i].company_code}', companyName: '${stockBalance[i].company_name}' });">
                    <td rowspan="2" class="d-none"></td>
                    <td class="company-name">${stockBalance[i].company_name}</td>
                    <td class="current-price">${stockBalance[i].current_price}</td>
                    <td class="evaluation-amount">${stockBalance[i].evaluation_amount}</td>
                    <td class="valuation-profit-or-loss ${gainOrLoss}">${stockBalance[i].valuation_profit_or_loss}</td>
                </tr>
                <tr class="stock-balance" onClick="candleStick.loadCandlestick({ companyCode: '${stockBalance[i].company_code}', companyName: '${stockBalance[i].company_name}' });">
                    <td class="holding-quantity">${stockBalance[i].holding_quantity}</td>
                    <td class="purchase-unit-price">${stockBalance[i].purchase_unit_price}</td>
                    <td class="purchase-amount">${stockBalance[i].purchase_amount}</td>
                    <td class="profit-or-loss-rate ${gainOrLoss}">${stockBalance[i].profit_or_loss_rate}</td>
                </tr>
            `;
        }
    }
    $balanceTbody.innerHTML = output;
};

const fetchAccountBalance = async () => {
    let url = "../account_balance/json";
    let response = await fetch(url, {
        method: "GET",
    });

    const results = await response.json();
    const accountBalance = await results.account_balance;
    return accountBalance; // StockBalance Array
};

const showAccountBalance = async () => {
    const accountBalance = await fetchAccountBalance();
    const $accountTbody = document.querySelector(".account-tbody");
    let output = ``;
    if (accountBalance.length === 0) {
        output += `
            <tr class="account-balance">
                <td rowspan="2" class="d-none"></td>
                <td class="account-number"></td>
                <td class="total-evaluation-amount"></td>
                <td class="total-valuation-profit-or-loss"></td>
                <td class="rate-of-return"></td>
            </tr>
        `;
    } else {
        const rate = accountBalance.rate_of_return;
        let gainOrLoss = '';
        if (rate > 0) gainOrLoss = 'gain';
        else if (rate < 0) gainOrLoss = 'loss';
        output = ``;
        output += `
            <tr class="account-balance">
                <td rowspan="2" class="d-none"></td>
                <td class="account-number">${accountBalance.account_number}</td>
                <td class="total-evaluation-amount">${numberWithCommas(accountBalance.total_evaluation_amount)}</td>
                <td class="total-valuation-profit-or-loss ${gainOrLoss}">${numberWithCommas(accountBalance.total_valuation_profit_or_loss)}</td>
                <td class="rate-of-return ${gainOrLoss}">${accountBalance.rate_of_return}</td>
            </tr>
        `;
    }

    $accountTbody.innerHTML = output;
};

const numberWithCommas = x => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

// 1. DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    showAccountBalance();
});

// 2. 주식 매수 후 이벤트 발생

// 3. 주식 매도 후 이벤트 발생