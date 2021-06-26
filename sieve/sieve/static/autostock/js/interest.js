const $listItem = document.querySelector(".list-item");

window.onload = (event) => {
  renderStocksOfInterest([
    {
      fields:{
        company_code:123456,
        company_name:'삼성전자',
        updated:'2020-12-12',
        category:'전자업',
      }
    },{
      fields:{
        company_code:123456,
        company_name:'엘지전자',
        updated:'2020-12-12',
        category:'전자업',
      }
    },{
      fields:{
        company_code:123456,
        company_name:'삼성물산',
        updated:'2020-12-12',
        category:'전자업',
      }
    },{
      fields:{
        company_code:123456,
        company_name:'오뚜기',
        updated:'2020-12-12',
        category:'전자업',
      }
    },{
      fields:{
        company_code:123456,
        company_name:'오뚜기',
        updated:'2020-12-12',
        category:'전자업',
      }
    },{
      fields:{
        company_code:123456,
        company_name:'오뚜기',
        updated:'2020-12-12',
        category:'전자업',
      }
    }
  ])
};

function renderStocksOfInterest(stocksOfInterest) {
  var parent = document.querySelector("#contents-interest-company");

  stocksOfInterest.forEach(function (obj) {
    var item = $listItem.cloneNode(true);
    var spanCompanyName = item.getElementsByClassName("company-name");
    var spanCode = item.getElementsByClassName("code");
    var spanUpdated = item.getElementsByClassName("updated");
    var spanCategory = item.getElementsByClassName("category");

    // Find companyname, updated, category
    var code = obj.fields.company_code;
    var company_name = obj.fields.company_name;
    var updated = obj.fields.updated;
    var category = obj.fields.category;
    spanCompanyName[0].innerHTML = company_name;
    spanCode[0].innerHTML = code;
    spanUpdated[0].innerHTML = updated;
    spanCategory[0].innerHTML = category;
    parent.append(item);
  });
}