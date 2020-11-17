function ajaxRequest(params) {
  var url = "https://backend.jin-ting.com.tw/api/items/barcode_print";
  $.get(url).then(function (res) {
    params.success(res.data);
  });
}
