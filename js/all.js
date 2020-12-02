// 第二個表單隱藏
$(document).ready(function(e){
    $("#inside-table2").hide();
});

 function getTableData(){

  var getUrlString = location.href;
  var url = new URL(getUrlString);
  var barcodeNo = url.searchParams.get('barcode_no');
  var airWidth = url.searchParams.get('air_width');
  var airHeight = url.searchParams.get('air_height');
  var airDepth = url.searchParams.get('air_depth');
  var airVolume = airWidth + " * " + airHeight + " * " + airDepth;
  

  document.getElementById('brand').innerText = url.searchParams.get('brand');
  document.getElementById('product_name').innerText = url.searchParams.get('product_name');
  document.getElementById('air_type').innerText = url.searchParams.get('air_type');
  document.getElementById('power_phase').innerText = url.searchParams.get('power_phase');
  document.getElementById('power_volt').innerText = url.searchParams.get('power_volt');
  document.getElementById('capacity_cool').innerText = url.searchParams.get('capacity_cool');
  document.getElementById('air_volume').innerHTML = airVolume;
  document.getElementById('air_kg').innerText = url.searchParams.get('air_kg');
  document.getElementById('year').innerText = url.searchParams.get('year');
  document.getElementById('company_name').innerText = url.searchParams.get('company_name');
  document.getElementById('company_address').innerText = url.searchParams.get('company_address');
  document.getElementById('case_no').innerText = url.searchParams.get('case_no');

  
  JsBarcode("#barcode_no", barcodeNo , {
     format: "code128",
     height: 70,
     width: 2,
     displayValue: true
   });

 }getTableData();   



// fetch('https://backend.jin-ting.com.tw/api/items/product?fields=*.*')
// .then(function(response){
//     return response.json();
// })
// .then(function(json){
//     // console.log(json);
//     var list = json.data[0];
//     document.getElementById('brand').innerText = list.brand.name;
//     document.getElementById('product_name').innerText = list.product_spec.product_name;
//     document.getElementById('air_type').innerText = list.name;
//     document.getElementById('power_phase').innerText = list.product_spec.power_phase;
//     document.getElementById('power_volt').innerText = list.product_spec.power_volt;
//     document.getElementById('capacity_cool').innerText = list.product_spec.capacity_cool;
//     // document.getElementById('air_volume').innerText = `${list. air_width} ${list.air_height} ${list. air_depth}`;
//     // document.getElementById('air_kg').innerText = list.air_kg;
//     // document.getElementById('year').innerText = list.year;
//     document.getElementById('company_name').innerText = `${list.brand.company_name} ${list.brand.company_tel}`;
//     document.getElementById('company_address').innerText = list.brand.company_address;
// });


 