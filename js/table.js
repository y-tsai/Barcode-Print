
function ajaxRequest(params) {
  var url = "https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec][neq]=";
  $.get(url).then(function (res) {
    console.log(res.data);
    params.success(res.data);
  });
}
// $.ajax({
//   url: 'https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec][neq]=',// url位置
//   type: 'get',                   // post/get
//   data: { querytag: data },       // 輸入的資料
//   // error: function (xhr) { },      // 錯誤後執行的函數
//   // success: function (response) { }// 成功後要執行的函數
// });