var $indoorModal = $("#indoor-modal");
var $outdoorModal = $("#outdoor-modal");
var $bomModal = $("#bomTable-modal");
var $bomTable = $("#bomTable");
var $printTable = $("#printTable");
var $bomTableForm = $("#bomTable-form");
var $outCheckForm = $("#outCheck-form");
var $inBtnModalConfirm = $("#in_btn-modal-confirm");
var $outBtnModalConfirm = $("#out_btn-modal-confirm");
var $btnModalConfirm = $("#bom_btn-modal-confirm");
var $barcodeBtn = $("#in_btn-modal-barcode , #out_btn-modal-barcode , #bom_btn-modal-barcode");

const host = "http://print.nht.com/";
const local = "localhost:3003/"

let myList
//getData
function ajaxRequest(params) {
  var url =
    "https://backend-v9.jin-ting.com.tw/items/product?fields=*.*&filter[product_specs][_nempty]=true&limit=-1";
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
            brand: product && product.brand.name,
            display_name: product.product_specs && product.product_specs.display_name,
            name: product && product.name,
            product_name: product.product_specs && product.product_specs.name,
            power_phase: product.product_specs && product.product_specs.power_phase,
            power_volt: product.product_specs && product.product_specs.power_volt,
            start_current: product.product_specs && product.product_specs.start_current,
            capacity_cold: product.product_specs && product.product_specs.capacity_cold,
            capacity_heat: product.product_specs && product.product_specs.capacity_heat,
            capacity_center: product.product_specs && product.product_specs.capacity_center,
            operatingCold: product.product_specs && product.product_specs.operatingcold,
            operatingHeat: product.product_specs && product.product_specs.operatingheat,
            consumptionCold: product.product_specs && product.product_specs.consumptioncold,
            consumptionHeat: product.product_specs && product.product_specs.consumptionheat,
            consumption_center: product.product_specs && product.product_specs.consumption_center,
            refrigerant: product.product_specs && product.product_specs.refrigerant,
            cspf: product.product_specs && product.product_specs.cspf,
            width: product.product_specs && product.product_specs.width,
            height: product.product_specs && product.product_specs.height,
            depth: product.product_specs && product.product_specs.depth,
            psig_h: product.product_specs && product.product_specs.psig_h,
            psig_l: product.product_specs && product.product_specs.psig_l,
            weight: product.product_specs && product.product_specs.weight,
            company_name: product.brand && product.brand.company_name,
            company_tel: product.brand && product.brand.company_tel,
            company_address: product.brand && product.brand.company_address,
            sticker_no: product.product_specs && product.product_specs.sticker_no,
            case_no: product.product_specs && product.product_specs.case_no,       
          };
      });
    myList = list;
    params.success(list);
  });
};

function returnJson(params){
  // var list = "http://tnn-nav02.nht.com:7048/NAV90/OData/Company('%E5%8D%97%E4%BA%A8%E7%A7%91%E6%8A%80')/ProductionOrder?$format=json&$select=No,Item_No,Status,Serial_No,Description,Production_BOM_No,Creation_Date&$filter=Status%20eq%20%27Planned%27";
  // input
  // output
  // { No: "123", Status: "Planned", Creation_Date: "2021-01-01", Item_No: "JSV-28RN", Serial_No: [100001.100002,100003]}
  // {}, Map
  var list = "ProductionOrder.json";
  $.get(list).then(function (re){
   let result = re.value.reduce((obj, curr) => {
    //  if (curr.Serial_No) {
    //    return acc.concat(curr);
    //  }
    const { No, Serial_No } = curr;
    let row = {};
    if (obj[No]) {
      // if obj already exists
      row = obj[No];
      row.Serial_No += `,${Serial_No}`;
      row.Count += 1;
    } else {
      // if obj doesn't exist
      row = curr;
      row.Count = 1;
    }
    obj[No] = row;
    return obj;
   }, {});
     params.success(Object.values(result));
  });
}; 



//資料代入明細
// function detailFormatter(index, row) {
//   var detail = []
//   $.each(row, function (key, value) {
//     detail.push('<p><b>' + key + ':</b> ' + value + '</p>')
//   })
//   return detail.join('')
// }


// navbar 內外機選擇隱藏項目
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

//內外機modal開啟並代入資料
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

//BOMTABLE 點擊欄位跳頁面
//1. 如何篩選(內外，大小) 2.
$bomTable.on("click-row.bs.table", function(e, row){ 
  let serialNo = (row.Serial_No).split(',');
  document.getElementById("bom_No").innerText = row.No;
  document.getElementById("ProductionBomNo").innerText= row.Production_BOM_No;
  document.getElementById("bomName").innerText= row.Item_No;
  document.getElementById("bomQty").value= row.Count;
  document.getElementById("bomSerialStart").value = serialNo[0];
  $bomModal.modal("show");  
});




//內機modal確認按鈕代入跳轉頁面
$inBtnModalConfirm.on("click", function check_on() {
  var displayName = row.display_name;
  var year = $("#inYear").val();
  var case_no = $("#inCase_no").val();
  var serialStart = Number($("#inSerialStart").val());
  var serials = [];
  var qty = $("#inQty").val();
  for (var i = 0; i < qty; i++) {
    serials.push(String(serialStart + i).padStart(6,0));
  }

  var spec_sm_indoor_c = `${host}pdf/spec_sm_indoor_c.html?product_name=${row.product_name}&brand=${row.brand}&display_name=${row.display_name}&serials=${serials.join(",")}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}`;
  var spec_sm_indoor_h = `${host}pdf/spec_sm_indoor_h.html?product_name=${row.product_name}&brand=${row.brand}&display_name=${row.display_name}&serials=${serials.join(",")}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}`;

  if (displayName == "分離式冷專室內機") {
    window.open(spec_sm_indoor_c, "_blank");
  }else{
    window.open(spec_sm_indoor_h, "_blank");
  };
  console.log(displayName);
  
});
//外機modal確認按鈕代入跳轉頁面
// //outdoor modal check btn 
$outBtnModalConfirm.on("click", function check_on() {
  var displayName = row.display_name;
  var barcode_no = $("#outBarcode_no").val();
  var year = $("#outYear").val();
  var case_no = $("#outCase_no").val();
  var serialStart = Number($("#outSerialStart").val());
  var serials = [];
  var qty = $("#outQty").val();
  for (var i = 0; i < qty; i++) {
    serials.push(String(serialStart + i).padStart(6,0));
  }
  

  var spec_sm_outdoor_h = `${local}pdf/spec_sm_outdoor_h.html?product_name=${row.product_name}&brand=${row.brand}&serials=${serials.join(",")}&display_name=${row.display_name}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&capacity_heat=${row.capacity_heat}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&operatingHeat=${row.operatingHeat}&consumptionHeat=${row.consumptionHeat}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspf}`;
  var spec_sm_outdoor_c = `${local}pdf/spec_sm_outdoor_c.html?product_name=${row.product_name}&brand=${row.brand}&serials=${serials.join(",")}&display_name=${row.display_name}&name=${row.name}&power_phase=${row.power_phase}&power_volt=${row.power_volt}&capacity_cold=${row.capacity_cold}&width=${row.width}&height=${row.height}&depth=${row.depth}&weight=${row.weight}&company_name=${row.company_name}&company_tel=${row.company_tel}&company_address=${row.company_address}&sticker_no=${row.sticker_no}&case_no=${case_no}&year=${year}&start_current=${row.start_current}&operatingCold=${row.operatingCold}&consumptionCold=${row.consumptionCold}&refrigerant=${row.refrigerant}&psig_h=${row.psig_h}&psig_l=${row.psig_l}&cspfNo=${row.cspf}`;
  
  
  if (displayName == "分離式冷專室外機") {
    window.open(spec_sm_outdoor_c, "_blank");
  }else{
    window.open(spec_sm_outdoor_h, "_blank");
  };
  
});


$barcodeBtn.on("click", function check_on(){

  var serialStart = Number($(".SerialStart").val());
  var serials = [];
  var qty = $(".qty").val();
 
  for (var i = 0; i < qty; i++) {
    serials.push(String(serialStart + i).padStart(6,0));
  }
var barcode = `${local}pdf/barcode.html?product_name=${row.product_name}&serials=${serials.join(",")}`

window.open(barcode, "_blank")

});
