// const content = document.querySelector(".print").innerHTML;
// const newPage = window.open("", "", "width=200,height=280");
// newPage.document.write(content);
// newPage.print();

// var barcode_no = document.getElementById('type-barcode')

// for(var i = 0; i <= barcode_no; i++){

// }
$(document).ready(function(e){
    $("#inside-table2").hide();
});

fetch('https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[name][eq]=JC-28NH')
.then(function(response){
    return response.json();
})
.then(function(json){
    // console.log(json);
    var list = json.data[0];
    document.getElementById('brand').innerText = list.brand.name;
    document.getElementById('product_name').innerText = list.product_spec.product_name;
    document.getElementById('air-type').innerText = list.name;
    document.getElementById('power_phase-volt').innerText = list.product_spec.power_phase;
    document.getElementById('capacity_cool').innerText = list.product_spec.capacity_cool;
    document.getElementById('company-name').innerText = `${list.brand.company_name} ${list.brand.company_tel}`;
    document.getElementById('company-address').innerText = list.brand.company_address;
});

JsBarcode("#type-barcode", "209942", {
    format: "code128",
    height: 70,
    width: 2,
    displayValue: true
  });
// {
//     data: [
//     {
//     id: 7,
//     name: "JC-28NH",

//     product_group: 
//     {
//     id: 95,
//     name: "28NH",
//     description: "外機-NH型-28NH"
//     },

//     brand: {
//     id: 1,
//     name: "Jin-Ting 金鼎冷氣",
//     company_name: "南亨科技股份有限公司",
//     company_address: "台南市安定區中沙里沙崙26-1號",
//     company_tel: "06-5931111",
//     name_short: "金鼎"
//     },
//     product_spec: {
//     id: 13,
//     name: "28NH",
//     product_name: "分離式冷專室外機",
//     power_phase: "單相",
//     power_volt: "220",
//     capacity_cool: "2.8",
//     capacity_heat: null,
//     product_type: "outdoor"
//     }
//     }
//     ],
//     public: true
//     }

