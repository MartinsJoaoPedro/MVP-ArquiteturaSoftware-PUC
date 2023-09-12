//Possibilita a exportação da tabela
document.getElementById("sheetjsexport").addEventListener('click', function () {
    /* Create worksheet from HTML DOM TABLE */
    var wb = XLSX.utils.table_to_book(document.getElementById("myTable"));
    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
});