// 第二個表單隱藏
$(document).ready(function(e){
    $("#inside-table2").hide();
    getTableData();   
});



 function getTableData(){

  var getUrlString = location.href;
  var url = new URL(getUrlString);
  var barcodeNo = url.searchParams.get('barcode_no');
  var airWidth = url.searchParams.get('air_width');
  var airHeight = url.searchParams.get('air_height');
  var airDepth = url.searchParams.get('air_depth');
  var airVolume = airWidth + " * " + airHeight + " * " + airDepth;
  var companyName = url.searchParams.get('company_name');
  var companyTel = url.searchParams.get('company_tel');
  var comPany = companyName+companyTel;
  var stickerNO = url.searchParams.get('sticker_no');

  document.getElementById('brand').innerText = url.searchParams.get('brand');
  document.getElementById('product_name').innerText = url.searchParams.get('product_name');
  document.getElementById('air_type').innerText = url.searchParams.get('air_type');
  document.getElementById('power_phase').innerText = url.searchParams.get('power_phase');
  document.getElementById('power_volt').innerText = url.searchParams.get('power_volt');
  document.getElementById('capacity_cool').innerText = url.searchParams.get('capacity_cool');
  document.getElementById('capacity_heat').innerText = url.searchParams.get('capacity_heat');
  document.getElementById('air_volume').innerHTML = airVolume;
  document.getElementById('air_kg').innerText = url.searchParams.get('air_kg');
  document.getElementById('year').innerText = url.searchParams.get('year');
  document.getElementById('company_name').innerHTML = comPany;
  document.getElementById('company_address').innerText = url.searchParams.get('company_address');
  document.getElementById('case_no').innerText = url.searchParams.get('case_no');
  document.getElementById('sticker_no').innerText = stickerNO;
  
  JsBarcode("#barcode_no", barcodeNo , {
     format: "code128",
     height: 70,
     width: 2,
     displayValue: true
   });

  if (stickerNO === "null"){
    $('.bsmi-box').hide();
  }else{
    $('.bsmi-box').show();
  };

 }

//  html2canvas(document.body, {
//   onrendered: function (canvas) {
//     var pageData = canvas.toDataURL("image/img", 1.0);
//     var pdf = new jsPDF("", "pt", "a4");
//     canvas.mozImageSmoothingEnabled = false;
//     canvas.webkitImageSmoothingEnabled = false;
//     canvas.msImageSmoothingEnabled = false;
//     canvas.imageSmoothingEnabled = false;
//     //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
//     pdf.addImage(pageData, "svg", 0, 0, canvas.width * 2, canvas.height * 2);

//     pdf.save("test.pdf");
//   },
// });
// var getPixelRatio = function (context) {
//   var backingStore =
//     context.backingStorePixelRatio ||
//     context.webkitBackingStorePixelRatio ||
//     context.mozBackingStorePixelRatio ||
//     context.msBackingStorePixelRatio ||
//     context.oBackingStorePixelRatio ||
//     context.backingStorePixelRatio ||
//     1;
//   return (window.devicePixelRatio || 1) / backingStore;
// };







 