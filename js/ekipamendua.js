// DATUAK TAULAN BISTARAZTEKO PAGINA KARGATZERAKOAN
window.addEventListener("load", function(){
    if(document.getElementById("ekipamenduaTable")!= undefined){
        getDataFromURL("ekipamenduaTable");
        const th = document.getElementsByTagName("th");
        for (let i = 0; i < th.length; i++) {
            th[i].addEventListener("click", headerClicked);
        }
    }
});



// DATUAK TAULA FORMATUAN BISTARATZEKO
function viewTable(dataAll, actualPag, tableId) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;

    for (let i = start; i < Math.min(end, tableData[tableId].data.length); i++) {
        if (tableId == "ekipamenduaTable"){
            tableHtml += "<tr><td><input type='checkbox' id=" + tableData[tableId].data[i]['id'] + "></td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["id"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["izena"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["deskribapena"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["marka"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["modelo"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["stock"] + "</td></tr>";
        }
    }
    
    //console.log("tableHtml" + tableHtml);
    document.getElementById("showDataEkipamendua").innerHTML = tableHtml;
}
var asc = true;
// DATUAK ZUBETATIK ORDENATZEKO
//const th = document.getElementsByTagName("th");
function headerClicked(e) {
    // console.log(e.target.parentNode.cellIndex);
    const sortColumn = e.target.cellIndex !== undefined ? e.target.cellIndex : e.target.parentNode.cellIndex;
    //console.log(sortColumn);
    asc = !asc;
    sortTableByColumn(sortColumn);
}

function sortTableByColumn(sortColumn) {
    const tableBody = document.getElementById("showDataEkipamendua");
    // console.log(tableBody);
    const rows = Array.from(tableBody.rows);
    // console.log(rows);
    //var asc = true;
    if (asc === true){
        var sortedRows = rows.sort(function(a,b){
            // console.log(a.cells[sortColumn]);
            const aText = a.cells[sortColumn].textContent;
            const bText = b.cells[sortColumn].textContent;
            return aText.localeCompare(bText);
        });
    }
    if (asc === false){
        var sortedRows = rows.sort(function(a,b){
            // console.log(a.cells[sortColumn]);
            const aText = a.cells[sortColumn].textContent;
            const bText = b.cells[sortColumn].textContent;
            return bText.localeCompare(aText);
        });
    }
    //console.log(sortedRows);
    tableBody.innerHTML = ""; 
    sortedRows.forEach(row=>{
        tableBody.appendChild(row);
    });
}