window.addEventListener("load", function(){
    if (document.getElementById("inbentarioaTable") != undefined){
        getDataFromURL("inbentarioaTable");
    }
});

function viewTable(dataAll, actualPag, tableId) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;

    for (let i = start; i < Math.min(end, tableData[tableId].data.length); i++) {
        if (tableId == "inbentarioaTable") {
            tableHtml += "<tr><td><input type='checkbox' id=" + tableData[tableId].data[i]['etiketa'] + "></td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["etiketa"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["idEkipamendu"] + "</td>";
            tableHtml += "<td>" + tableData[tableId].data[i]["erosketaData"] + "</td></tr>";
        }
    }
    document.getElementById("showDataInbentarioa").innerHTML = tableHtml;
    //console.log(tableHtml);
}