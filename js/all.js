// const content = document.querySelector(".print").innerHTML;
// const newPage = window.open("", "", "width=200,height=280");
// newPage.document.write(content);
// newPage.print();

// var barcode_no = document.getElementById('type-barcode')

// for(var i = 0; i <= barcode_no; i++){

// }
$(document).ready(function(e){
    $("#inside-table2").hide();
});

fetch('https://backend.jin-ting.com.tw/api/items/product?fields=*.*&filter[name][eq]=JC-28NH').then(function(res){
    return res.json();
})
.then(function(nht_json){
    document.getElementById('brand').innerText= JSON.parse('company_name');

})
