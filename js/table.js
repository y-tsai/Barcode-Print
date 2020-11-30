var $barcodeModal = $("#barcode-modal");
var $barcodePrintTable = $("#barcodePrint-table");
var $checkForm = $("#check-form");

$(function () {
  $barcodePrintTable.bootstrapTable("hideColumn", [
    "company_name",
    "company_tel",
    "company_address",
    "capacity_heat",
    "air_kg",
  ]);
});

function ajaxRequest(params) {
  var url =
    "https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec][neq]=";

  $.get(url).then(function (res) {
    var listable = res.data;
    list = listable.map((product) => {
      return {
        brand: product.brand.name,
        product_name: product.product_spec.product_name,
        air_type: product.name,
        power_phase: product.product_spec.power_phase,
        power_volt: product.product_spec.power_volt,
        capacity_cool: product.product_spec.capacity_cool,
        capacity_heat: product.product_spec.capacity_heat,
        air_width: product.product_spec.air_width,
        air_height: product.product_spec.air_height,
        air_depth: product.product_spec.air_depth,
        air_kg: product.product_spec.air_kg,
        company_name: product.brand.company_name,
        company_tel: product.brand.company_tel,
        company_address: product.brand.company_address,
      };
    });
    params.success(list);
  });
}

$barcodePrintTable.on("click-row.bs.table", function (e, row) {
  $barcodeModal.modal("show");
  document.getElementById("brand").value = row.brand;
  document.getElementById("air_type").value = row.air_type;
  document.getElementById("power_volt").value = row.power_volt;
  document.getElementById("capacity_cool").value = row.capacity_cool;
  document.getElementById("case_no").value = row.case_no;


});

$("#btn-modal-confirm").on("click", function (e) {
  window.open("Barcode_Print.html", "Barcode_Print");
});

var modal_json = '[{}]';
var parsedObj = JSON.parse(modal_json);

var dataArr = [];
$.ajax({
  url: '/table.html',
  type: 'post',
  data: JSON.stringify({Data: parsedObj,}),
  dataType: 'json',
  error: function(xhr) {},
  success: function(response) {},
});





// var rows = $barcodePrintTable.bootstrapTable("getData");

// const {
//   brand,
//   air_type,
//   power_volt,
//   capacity_cool,
//   year,
//   barcode_no,
//   case_no
// } = checkForm.elements;
