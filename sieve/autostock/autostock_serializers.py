from . import crawlers 

def get_stock_balance (qs_stock_balance):
    res_stock_balance = []
    for stock_balance in qs_stock_balance :
        current_price = crawlers.get_current_price(stock_balance.company_code.code)
        evaluation_amount = stock_balance.holding_quantity * current_price
        purchase_amount = stock_balance.purchase_unit_price * stock_balance.holding_quantity
        profit_or_loss_rate = (current_price / stock_balance.purchase_unit_price - 1) * 100
        valuation_profit_or_loss = evaluation_amount - purchase_amount 

        res_stock_balance.append({
            "company_name" : stock_balance.company_code.company_name,
            "company_code" : stock_balance.company_code.code,
            "current_price" : format(current_price, ','),
            "evaluation_amount" : format(evaluation_amount, ','),
            "valuation_profit_or_loss" : format(valuation_profit_or_loss, ','),
            "holding_quantity" : format(stock_balance.holding_quantity, ','),
            "purchase_unit_price" : format(stock_balance.purchase_unit_price, ','),
            "purchase_amount" : format(purchase_amount, ','),
            "profit_or_loss_rate" : round(profit_or_loss_rate, 2),
        })
    return res_stock_balance 


def get_account_balance (qs_account_balance) :
    res_account_balance = {
        "total_evaluation_amount" : qs_account_balance.total_evaluation_amount,
        "total_valuation_profit_or_loss" : qs_account_balance.total_valuation_profit_or_loss,
        "rate_of_return" : qs_account_balance.rate_of_return,
        "account_number" : qs_account_balance.account_number,
    }

    return res_account_balance
