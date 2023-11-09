var tableData = {
    'ekipamenduaTable': {
        data: [],
        totalPages: 0,
        actualPag: 1
    },
    'gelaTable': {
        data: [],
        totalPages: 0,
        actualPag: 1
    },
    'inbentarioaTable': {
        data: [],
        totalPages: 0,
        actualPag: 1
    },
    'kategoriaTable': {
        data: [],
        totalPages: 0,
        actualPag: 1
    },
    'kokalekuaTable': {
        data: [],
        totalPages: 0,
        actualPag: 1
    },
    'erabiltzaileaTable':{
        data:[],
        totalPages: 0,
        actualPag:1
    }
};

const tableLines = 10;

// PAGINAR LAS TABLAS
function paginar(direccion, tableId) {
    var table = tableData[tableId];

    table.actualPag += direccion;
    if (table.actualPag < 1) {
        table.actualPag = 1;
    }
    if (table.actualPag > table.totalPages) {
        table.actualPag = table.totalPages;
    }

    viewTable(table.data, table.actualPag, tableId);

    document.getElementById("page-number").innerHTML = table.actualPag;
    document.getElementById("total-pages").innerHTML = table.totalPages;
}

// OBTENER LOS DATOS DEL JSON USANDO FETCH
function getDataFromURL(tableId) {
    var options = { method: "GET", mode: 'cors' };
    var url = "";

    if (tableId == "ekipamenduaTable"){
        url = "http://localhost/erronka1/controller/ekipamenduacontroller.php";
    } else if (tableId == "gelaTable"){
        url = "http://localhost/erronka1/controller/gelacontroller.php";
    } else if (tableId == "inbentarioaTable"){
        url = "http://localhost/erronka1/controller/inbentarioacontroller.php";
    } else if (tableId == "kategoriaTable"){
        url = "http://localhost/erronka1/controller/kategoriacontroller.php";
    } else if (tableId == "kokalekuaTable"){
        url = "http://localhost/erronka1/controller/kokalekuacontroller.php";
    } else if (tableId == "erabiltzaileaTable"){
        url = "http://localhost/erronka1/controller/erabiltzaileacontroller.php";
    } else {
        console.error("ERROR: Invalid tableID");
        return;
    }

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            var table = tableData[tableId];
            table.data = data;

            table.totalPages = Math.ceil(data.length / tableLines);
            paginar(0, tableId);  // Para asegurar que se inicie en la página 1
        })
        .catch(err => {
            console.error("ERROR: " + err.message);
        });
}