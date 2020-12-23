$(document).ready(() => {
  $("#brandText").get(0).textContent = $("#brand").text();
  $("#product_nameText").get(0).textContent = $("#product_name").text();
  $("#air_typeText").get(0).textContent = $("#air_type").text();
  $("#power_phaseText").get(0).textContent = $("#power_phase").text() + " " + $("#power_volt").text() + "V 60Hz";
  $("#capacity_coolText").get(0).textContent = $("#capacity_cool").text();
  // $("#capacity_heatText").get(0).textContent = $("#capacity_heat").text();
  $("#air_volumeText").get(0).textContent = $("#air_volume").text();
  $("#air_kgText").get(0).textContent = $("#air_kg").text() + " kg";
  $("#air_mergeText").get(0).textContent = "I類";
  $("#air_sntText").get(0).textContent = "T1";
  $("#air_ipText").get(0).textContent = "IPX0";
  $("#air_countryText").get(0).textContent = "中華民國 / " + $("#year").text() + " 年";
  $("#company_nameText").get(0).textContent = $("#company_name").text();
  $("#company_addressText").get(0).textContent = $("#company_address").text();
  $("#sticker_noText").get(0).textContent = $("#sticker_no").text();
  $("#ro-hsText").get(0).textContent = "Rohs";
  $("#case_noText").get(0).textContent = $("#case_no").text();

  var stickerNO = $("#sticker_noText").text();
  if (stickerNO === "null"){
    $("#sticker_noText").hide();
    $("#ro-hsText").hide();
    $("#Image").hide();
  }else{
    $("#sticker_noText").show();
    $("#ro-hsText").show();
    $("#Image").show();
  };

  var getUrlString = location.href;
  var url = new URL(getUrlString);
  var barcodeNo = url.searchParams.get("barcode_no");
  JsBarcode("#barcode", barcodeNo, {
    format: "code128",
    height: 30,
    width: 1,
    fontSize: 12,
    marginTop: 308,
    marginLeft: 125,
    displayValue: true,
  });
  $("#svg").append($("#barcode").children()[1]);

});



function reload() {
  
  var svg = document.getElementById("svg");
  //get svg source.
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg);

  //add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(
      /^<svg/,
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
    );
  }

    // add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    // convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    // set url value to a element's href attribute.
    document.getElementById("link").href = url;
    // you can download svg file by right click menu.
    $('#link')[0].click();
};
setTimeout(() => {
  reload();
  // var svg = $('#svg').get(0);
  // // you should set the format dynamically, write [width, height] instead of 'a4'
  // var pdf = new jsPDF('p', 'pt', 'a4');
  // svgElementToPdf(svg, pdf, {
  //   scale: 72/96, // this is the ratio of px to pt units
  //   removeInvalid: true // this removes elements that could not be translated to pdf from the source svg
  // });
  // pdf.output('datauri'); // use output() to get the jsPDF buffer
}, 3000);