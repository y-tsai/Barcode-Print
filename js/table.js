var $indoorModal = $("#indoor-modal");
var $outdoorModal = $("#outdoor-modal");
var $printTable = $("#printTable");
var $inCheckForm = $("#inCheck-form");
var $outCheckForm = $("#outCheck-form");
var $inBtnModalConfirm = $("#in_btn-modal-confirm");
var $outBtnModalConfirm = $("#out_btn-modal-confirm");
const host = "http://localhost:3003/pdf/";

let myList
//getData
function ajaxRequest(params) {
  var url =
    "https://backend-v9.jin-ting.com.tw/items/product?fields=*.*&filter[product_specs][_nempty]=true";

  $.get(url).then(function (res) {
    var listable = res.data;
    let listable2 = [];
    $.each(listable, (index, val) => {
      if(val.product_specs != null && val.product_specs != undefined) {
        listable2.push(val);
      }
      else{
      }
    })
    list = listable2.map((product) => {
          return {
            product_class: product.product_specs && product.product_specs.product_class,
            brand: product.brand.name,
            display_name: product.product_specs.display_name,
            name: product.name,
            power_phase: product.product_specs.power_phase,
            power_volt: product.product_specs.power_volt,
            start_current: product.product_specs.start_current,
            capacity_cold: product.product_specs.capacity_cold,
            capacity_heat: product.product_specs.capacity_heat,
            capacity_center: product.product_specs.capacity_center,
            operatingCold: product.product_specs.operatingcold,
            operatingHeat: product.product_specs.operatingheat,
            consumptionCold:product.product_specs.consumptioncold,
            consumptionHeat:product.product_specs.consumptionheat,
            consumption_center: product.product_specs.consumption_center,
            refrigerant:product.product_specs.refrigerant,
            cspf:product.product_specs.cspf,
            width: product.product_specs.width,
            height: product.product_specs.height,
            depth: product.product_specs.depth,
            psig_h: product.product_specs.psig_h,
            psig_l: product.product_specs.psig_l,
            weight: product.product_specs.weight,
            company_name: product.brand.company_name,
            company_tel: product.brand.company_tel,
            company_address: product.brand.company_address,
            sticker_no: product.product_specs.sticker_no,
            case_no: product.product_specs.case_no,       
          };
      });
    myList = list;
    params.success(list);
  });
};


// navbar
$('.nav-link').on('click', function () {
  let table = document.getElementById('printTable');
  let tr = table.getElementsByTagName('tr');
  let td = table.getElementsByTagName('td');

  let filter;

  switch($(this).text()) {
    case 'Indoor':
      filter = '內機';
        $printTable.bootstrapTable("showColumn", [
          "product_class",
          "brand",
          "display_name",
          "name",
          "capacity_cold",
          "case_no",
        ]);
        $printTable.bootstrapTable('hideColumn', [
          "power_phase",
          "power_volt",
          "start_current",
          "capacity_heat",
          "capacity_center",
          "operatingCold",
          "operatingHeat",
          "consumptionCold",
          "consumptionHeat",
          "consumption_center",
          "refrigerant",
          "cspf",
          "width",
          "height",
          "depth",
          "psig_h",
          "psig_l",
          "weight",
          "company_name",
          "company_tel",
          "company_address",
          "sticker_no",
        ]);
      break;
    default:
      filter = '外機';
      $printTable.bootstrapTable("showColumn", [
        "product_class",
        "brand",
        "display_name",
        "name",
        "start_current",
        "case_no",
        "operatingCold",
        "consumptionCold",
      ]);
      $printTable.bootstrapTable('hideColumn', [
        "power_phase",
        "power_volt",
        "capacity_cold",
        "capacity_heat",
        "capacity_center",
        "operatingHeat",
        "consumptionHeat",
        "consumption_center",
        "refrigerant",
        "cspf",
        "width",
        "height",
        "depth",
        "psig_h",
        "psig_l",
        "weight",
        "company_name",
        "company_tel",
        "company_address",
        "sticker_no",
      ]);
      break;
  }
  function isFilter(value) {
    try{
      return value.product_class.indexOf(filter) != -1;
    }
    catch(ex) {
      console.log(value);
    }
  }

  let tempList = myList.filter(isFilter);

  $('#printTable').bootstrapTable('load', tempList);

});



let row = undefined;
$printTable.on("click-row.bs.table", function (e, rows) {
  var proClass = rows.product_class;

if (proClass.indexOf("內機") != -1){
  $indoorModal.modal("show");
  document.getElementById("inBrand").innerText = rows.brand;
  document.getElementById("inName").innerText = rows.name;
  document.getElementById("inPower_volt").innerText = rows.power_volt;
  document.getElementById("inCapacity_cold").innerText = rows.capacity_cold;
  document.getElementById("inCase_no").value = rows.case_no;
  document.getElementById("inProduct_class").innerText = rows.product_class;
  row = rows
}else{
  $outdoorModal.modal("show");
  document.getElementById("outBrand").innerText = rows.brand;
  document.getElementById("outName").innerText = rows.name;
  document.getElementById("outPower_volt").innerText = rows.power_volt;
  document.getElementById("outOperatingCold").innerText = rows.operatingCold;
  document.getElementById("outCspf").innerText = rows.cspf;
  document.getElementById("outCase_no").value = rows.case_no;
  document.getElementById("outProduct_class").innerText = rows.product_class;
  document.getElementById("outStart_current").innerText = rows.start_current;
  outStart_current
  row = rows
};
});

$inBtnModalConfirm.on("click", function check_on() {
  var displayName = row.display_name;
  var barcode_no = $("#inBarcode_no").val();
  var year = $("#inYear").val();
  var case_no = $("#inCase_no").val();

  var spec_sm_indoor_c = `${host}spec_sm_indoor_c.html?brand=${row.brand}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
  var spec_sm_indoor_h = `${host}spec_sm_indoor_h.html?&brand=${row.brand}&display_name=${row.display_name}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
 
  console.log(spec_sm_indoor_c);
  if (displayName === "冷專室內機") {
    window.open(spec_sm_indoor_c, "_blank");
  }else{
    window.open(spec_sm_indoor_h, "_blank");
  };
  
});

// //outdoor modal check btn 
// $outBtnModalConfirm.on("click", function check_on() {
//   var outCla = row.product_class;
//   var barcode_no = $("#outBarcode_no").val();
//   var year = $("#outYear").val();
//   var case_no = $("#outCase_no").val();
  

//   var outHeat = `outHeat.html?product_class=${row.product_class}&brand=${row.brand}&display_name=${row.display_name}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&operatingHeat=${row.operatingHeat}&consumptionHeat=${row.consumptionHeat}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspfNo}`;
//   var outCold = `outCold.html?product_class=${row.product_class}&brand=${row.brand}&display_name=${row.display_name}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspfNo}`;
  
  
//   if (outCla === "冷暖外機") {
//     window.open(outHeat, "_blank");
//   }else{
//     window.open(outCold, "_blank");
//   };
  
// });



