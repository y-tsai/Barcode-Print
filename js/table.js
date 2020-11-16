// var [
//     // table
//     brand,
//     product_name,
//     air_type,
//     power_phase_volt,
//     capacity_cool,
//     air_volume,
//     air_kg,
//     year,
//     company_name,
//     company_address,
//     sticker_no,
//     case_no,
//     type_barcode
// ] = [
//     // table
//     brand,
//     product_name,
//     air_type,
//     power_phase_volt,
//     capacity_cool,
//     air_volume,
//     air_kg,
//     year,
//     company_name,
//     company_address,
//     sticker_no,
//     case_no,
//     type_barcode
// ]
function ajaxRequest(params) {
  var url = "https://backend.jin-ting.com.tw/api/items/barcode_print";
  $.get(url).then(function (res) {
    params.success(res.data);
  });
}
