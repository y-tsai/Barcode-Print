const content = document.querySelector(".print").innerHTML;
const newPage = window.open("", "", "width=200,height=280");
newPage.document.write(content);
newPage.print();


// var barcode_no = document.getElementById('type-barcode')

// for(var i = 0; i <= barcode_no; i++){

// }