// 第二個表單隱藏
$(document).ready(function(e){
    $("#inside-table2").hide();
});

fetch('https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec][neq]')
.then(function(response){
    return response.json();
})
.then(function(json){
    // console.log(json);
    var list = json.data[0];
    document.getElementById('brand').innerText = list.brand.name;
    document.getElementById('product_name').innerText = list.product_spec.product_name;
    document.getElementById('air_type').innerText = list.name;
    document.getElementById('power_phase').innerText = list.product_spec.power_phase;
    document.getElementById('power_volt').innerText = list.product_spec.power_volt;
    document.getElementById('capacity_cool').innerText = list.product_spec.capacity_cool;
    // document.getElementById('air_volume').innerText = `${list. air_width} ${list.air_height} ${list. air_depth}`;
    // document.getElementById('air_kg').innerText = list.air_kg;
    // document.getElementById('year').innerText = list.year;
    document.getElementById('company_name').innerText = `${list.brand.company_name} ${list.brand.company_tel}`;
    document.getElementById('company_address').innerText = list.brand.company_address;
});

JsBarcode("#type_barcode", "209942", {
    format: "code128",
    height: 70,
    width: 2,
    displayValue: true
  });

 