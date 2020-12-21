var $indoorModal = $("#indoor-modal");
var $printTable = $("#printTable");
var $checkForm = $("#check-form");
var $inbtnModalConfirm = $("#inbtn-modal-confirm");

//hideColumn
// $(function () {
//   $printTable.bootstrapTable("hideColumn", [
//     "power_volt",
//     "air_width",
//     "air_height",
//     "air_depth",
//     "air_kg",
//     "company_name",
//     "company_tel",
//     "company_address",
//     "capacity_heat",
//   ]);
// });

let myList
//getData
function ajaxRequest(params) {
  var url =
    "https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec.product_name][neq]=";

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
        sticker_no: product.product_spec.sticker_no,
        case_no: product.product_spec.case_no,
        product_class: product.product_spec.product_class,
      };
    });
    myList = list;
    params.success(list);
  });
}

// modal
let row = undefined;
$printTable.on("click-row.bs.table", function (e, rows) {
  $indoorModal.modal("show");
  document.getElementById("inbrand").innerText = rows.brand;
  document.getElementById("inair_type").innerText = rows.air_type;
  document.getElementById("inpower_volt").innerText = rows.power_volt;
  document.getElementById("incapacity_cool").innerText = rows.capacity_cool;
  document.getElementById("incase_no").value = rows.case_no;
  document.getElementById("inproduct_class").innerText = rows.product_class;
  row = rows
});

$inbtnModalConfirm.on("click", function check_on() {
  var cla = row.product_class;
  // var getClass = $barcodeModal.bootstrapTable('getSelections');
  var barcode_no = $("#inbarcode_no").val();
  var year = $("#inyear").val();
  var case_no = $("#incase_no").val();

  var InverterPrint = `InverterPrint.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cool=${row.capacity_cool}&capacity_heat=${row.capacity_heat}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
  var ColdPrint = `ColdPrint.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cool=${row.capacity_cool}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
  
  if (cla === "冷暖") {
    window.open(InverterPrint, "_blank");
  }else{
    window.open(ColdPrint, "_blank");
  };
  
});

// navbar
$('.nav-link').on('click', function () {
  let table = document.getElementById('printTable');
  let tr = table.getElementsByTagName('tr');

  let filter;

  switch($(this).text()) {
    case 'Indoor':
      filter = '內機';
        $printTable.bootstrapTable("showColumn", [
          "product_class",
          "brand",
          "product_name",
          "air_type",
          "capacity_cool",
          "sticker_no",
          "case_no",
        ]);
        $printTable.bootstrapTable('hideColumn', [
          "startcurrent",
          "power_phase",
          "refrigerant",
          "csPP",
          "air_width",
          "air_height",
          "air_depth",
          "air_kg",
          "company_name",
          "company_tel",
          "company_address",
          "power_volt",
        ]);
      break;
    default:
      filter = '外機';
      $printTable.bootstrapTable("showColumn", [
        "product_class",
        "brand",
        "product_name",
        "air_type",
        "startcurrent",
        "refrigerant",
        "sticker_no",
        "case_no",
      ]);
      $printTable.bootstrapTable('hideColumn', [
        "power_phase",
        "power_volt",
        "capacity_cool",
        "capacity_heat",
        "air_width",
        "air_height",
        "air_depth",
        "air_kg",
        "company_name",
        "company_tel",
        "company_address",
      ]);
      break;
  }

  let tempList = myList.filter(x=>x.product_name.indexOf(filter) != -1);

  $('#printTable').bootstrapTable('load', tempList);

});

