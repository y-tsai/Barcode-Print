var $indoorModal = $("#indoor-modal");
var $outdoorModal = $("#outdoor-modal");
var $printTable = $("#printTable");
var $inCheckForm = $("#inCheck-form");
var $outCheckForm = $("#outCheck-form");
var $inBtnModalConfirm = $("#in_btn-modal-confirm");
var $outBtnModalConfirm = $("#out_btn-modal-confirm");

let myList
//getData
function ajaxRequest(params) {
  var url =
    "https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[product_spec.product_class][neq]=";

  $.get(url).then(function (res) {
    var listable = res.data;
    list = listable.map((product) => {
      return {
        brand: product.brand.name,
        product_name: product.product_spec.product_name,
        air_type: product.model,
        power_phase: product.product_spec.power_phase,
        power_volt: product.product_spec.power_volt,
        capacity_cold: product.product_spec.capacity_cold,
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
        start_current: product.product_spec.start_current,
        cspfNo:product.product_spec.cspf,
        consumptionCold:product.product_spec.consumptioncold,
        consumptionHeat:product.product_spec.consumptionheat,
        refrigerant:product.product_spec.refrigerant,
        psig_h: product.product_spec.psig_h,
        psig_l: product.product_spec.psig_l,
        operatingCold: product.product_spec.operatingcold,
        operatingHeat: product.product_spec.operatingheat,
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
          "product_name",
          "air_type",
          "capacity_cold",
          "sticker_no",
          "case_no",
        ]);
        $printTable.bootstrapTable('hideColumn', [
          "start_current",
          "power_phase",
          "refrigerant",
          "cspfNo",
          "air_width",
          "air_height",
          "air_depth",
          "air_kg",
          "company_name",
          "company_tel",
          "company_address",
          "power_volt",
          "psig_h",
          "psig_l",    
          "operatingCold",
          "operatingHeat",
          "consumptionCold",
          "consumptionHeat",     
          "capacity_heat",  
        ]);
      break;
    default:
      filter = '外機';
      $printTable.bootstrapTable("showColumn", [
        "product_class",
        "brand",
        "product_name",
        "air_type",
        "start_current",
        "sticker_no",
        "case_no",
        "operatingCold",
        "consumptionCold",
      ]);
      $printTable.bootstrapTable('hideColumn', [
        "power_phase",
        "power_volt",
        "capacity_cold",
        "capacity_heat",
        "air_width",
        "air_height",
        "air_depth",
        "air_kg",
        "company_name",
        "company_tel",
        "company_address",
        "cspfNo",
        "psig_h",
        "psig_l", 
        "operatingHeat",
        "consumptionHeat",   
        "refrigerant",
      ]);
      break;
  }

  let tempList = myList.filter(x=>x.product_name.indexOf(filter) != -1);

  $('#printTable').bootstrapTable('load', tempList);

});

let row = undefined;
$printTable.on("click-row.bs.table", function (e, rows) {
  var proClass = rows.product_class;

if (proClass.indexOf("內機") != -1){
  $indoorModal.modal("show");
  document.getElementById("inBrand").innerText = rows.brand;
  document.getElementById("inAir_type").innerText = rows.air_type;
  document.getElementById("inPower_volt").innerText = rows.power_volt;
  document.getElementById("inCapacity_cold").innerText = rows.capacity_cold;
  document.getElementById("inCase_no").value = rows.case_no;
  document.getElementById("inProduct_class").innerText = rows.product_class;
  row = rows
}else{
  $outdoorModal.modal("show");
  document.getElementById("outBrand").innerText = rows.brand;
  document.getElementById("outAir_type").innerText = rows.air_type;
  document.getElementById("outPower_volt").innerText = rows.power_volt;
  document.getElementById("outOperatingCold").innerText = rows.operatingCold;
  document.getElementById("outCspfNo").innerText = rows.cspfNo;
  document.getElementById("outCase_no").value = rows.case_no;
  document.getElementById("outProduct_class").innerText = rows.product_class;
  document.getElementById("outStart_current").innerText = rows.start_current;
  outStart_current
  row = rows
};
});

$inBtnModalConfirm.on("click", function check_on() {
  var cla = row.product_class;
  var barcode_no = $("#inBarcode_no").val();
  var year = $("#inYear").val();
  var case_no = $("#inCase_no").val();

  var InverterPrint = `InverterPrint.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
  var ColdPrint = `ColdPrint.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}`;
 
  
  if (cla === "冷暖內機") {
    window.open(InverterPrint, "_blank");
  }else{
    window.open(ColdPrint, "_blank");
  };
  
});

//outdoor modal check btn 
$outBtnModalConfirm.on("click", function check_on() {
  var outCla = row.product_class;
  var barcode_no = $("#outBarcode_no").val();
  var year = $("#outYear").val();
  var case_no = $("#outCase_no").val();
  

  var InverterOutdoor = `InverterOutdoor.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&operatingHeat=${row.operatingHeat}&consumptionHeat=${row.consumptionHeat}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspfNo}`;
  var ColdOutdoor = `ColdOutdoor.html?product_class=${row.product_class}&brand=${row.brand}&product_name=${row.product_name}&air_type=${row.air_type}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&air_width=${row.air_width}&air_height=${row.air_height}&air_depth=${row.air_depth}&air_kg=${row.air_kg}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&barcode_no=${barcode_no}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspfNo}`;
  
  
  if (outCla === "冷暖外機") {
    window.open(InverterOutdoor, "_blank");
  }else{
    window.open(ColdOutdoor, "_blank");
  };
  
});



