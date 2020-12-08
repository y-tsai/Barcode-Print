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

 }getTableData();   

 var downPdf = document.getElementById("btn");
 downPdf.onclick = function() {
     html2canvas(document.body, {
         onrendered:function(canvas) {

             //返回图片dataURL，参数：图片格式和清晰度(0-1)
             var pageData = canvas.toDataURL('image/jpeg', 1.0);

             //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
             var pdf = new jsPDF('', 'pt', 'a4');

             //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
             pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );

             pdf.save('stone.pdf');

         }
     })
 }


 



 