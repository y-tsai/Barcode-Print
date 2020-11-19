function ajaxRequest(params) {
  var url = "https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec][neq]=";
  $.get(url).then(function (res) {
    params.success(res.data);
  });
}
