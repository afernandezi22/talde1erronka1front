//ERABILTZAILEAREN DATUAK
const username = document.getElementById("username");
const rol = document.getElementById("rol");
const name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const logo = document.getElementById("logo");
const erabiltzaileIzena = document.getElementById("erabiltzaileIzena");

//BOTOIAK
const ezabatuButton = document.getElementById("ezabatuButton");
const gehituButton = document.getElementById("gehituButton");
const editatuButton = document.getElementById("editatuButton");
const bilaketaButton = document.getElementById("bilaketaButton");
const resetButton = document.getElementById("resetButton");
const bilaketaTestu = document.getElementById("bilaketa");
const filtroSelect = document.getElementById("filtro");

document.addEventListener("DOMContentLoaded", function() {
    const checkboxContainer = document.getElementById("kokalekuaTable");
    logo.src = avatar.value;
    erabiltzaileIzena.innerHTML = name.value + " (" + username.value + ")";

    checkboxContainer.addEventListener("change", function (event) {
        if (event.target.classList.contains("checkbox-item")) {
            const checkedCheckboxes = Array.from(checkboxContainer.querySelectorAll('.checkbox-item:checked'));
            if(checkedCheckboxes.length === 0) {
                ezabatuButton.disabled = true;
                editatuButton.disabled = true;
            } else if (checkedCheckboxes.length === 1) {
                editatuButton.disabled = false;
                ezabatuButton.disabled = false;
            } else {
                editatuButton.disabled = true;
            }
        }
    });
});

//GEHITZEKO LOGIKA
const gehituContainer = document.getElementById("gehituContainer");
const itxiGehituPopup = document.getElementById("itxiGehituPopup");
const gehituForm = document.getElementById("gehituForm");
const gehituEkipamenduIzenaSelect = document.getElementById('gehituEkipamenduIzena');
const gehituGelaSelect = document.getElementById('gehituGela');

function ekipamenduGelakKargatu() {
    // Vacía los elementos del primer desplegable
    gehituEkipamenduIzenaSelect.innerHTML = '';

    fetch('http://localhost/erronka1/controller/kokalekuacontroller.php?free=true')
        .then(response => response.json())
        .then(data => {
            // Itera sobre el JSON y agrega opciones al desplegable
            data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.etiketa;
                option.text = item.izena;
                gehituEkipamenduIzenaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Vacía los elementos del segundo desplegable
    gehituGelaSelect.innerHTML = '';

    fetch('http://localhost/erronka1/controller/gelacontroller.php')
        .then(response => response.json())
        .then(data => {
            // Itera sobre el JSON y agrega opciones al desplegable
            data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.id;
                option.text = item.izena;
                gehituGelaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

gehituButton.addEventListener("click", function () {
    gehituContainer.style.display = "block";
});

itxiGehituPopup.addEventListener("click", function () {
    gehituContainer.style.display = "none";
});

gehituForm.addEventListener("submit", function (e) {
    e.preventDefault();
    insertData();
    gehituContainer.style.display = "none";
});

function insertData(){
    var etiketaInputValue = gehituEkipamenduIzenaSelect.value;
    var gelaInputValue = gehituGelaSelect.value;
    var hasieraDataValue = document.getElementById("gehituHasieraData").value;
    var amaieraDataValue = document.getElementById("gehituAmaieraData").value;
    if(amaieraDataValue.trim() == ''){
        console.log("sartu da");
        amaieraDataValue = "null";
    }
    const data = {
        etiketa: etiketaInputValue,
        idGela: gelaInputValue,
        hasieraData: hasieraDataValue,
        amaieraData: amaieraDataValue
    };

    fetch('http://localhost/erronka1/controller/kokalekuacontroller.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        console.log("ONDO!");
        getData();
    })
    .catch(error => {
        console.log("ERROR! " + error);
    });

}

//EDITATZEKO LOGIKA
const editatuContainer = document.getElementById("editatuContainer");
const itxiEditatuPopup = document.getElementById("itxiEditatuPopup");
const editatuForm = document.getElementById("editatuForm");
const editatuEtiketaInput = document.getElementById("editatuEtiketa");
const editatuHasieraDataInput = document.getElementById("editatuHasieraData");
const editatuAmaieraDataInput = document.getElementById("editatuAmaieraData");

editatuButton.addEventListener("click", function () {
    const checkbox = document.querySelector('.checkbox-item:checked');
    const editatuIdValue = checkbox.id.split("!");
    editatuEtiketaInput.value = editatuIdValue[0];
    editatuHasieraDataInput.value = editatuIdValue[1];

    editatuContainer.style.display = "block";
});

itxiEditatuPopup.addEventListener("click", function () {
    editatuContainer.style.display = "none";
});

editatuForm.addEventListener("submit", function (e) {
    e.preventDefault();
    editData();
    editatuContainer.style.display = "none";
});

function editData(){
    const data = {
        etiketa: editatuEtiketaInput.value,
        hasieraData: editatuHasieraDataInput.value,
        amaieraData: editatuAmaieraDataInput.value
    }
        
    fetch('http://localhost/erronka1/controller/kokalekuacontroller.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        console.log("ONDO!");
        getData();
    })
    .catch(error => {
        console.log("ERROR! " + error);
    });

    ezabatuButton.disabled = true;
    editatuButton.disabled = true;
}

//EZABATZEKO LOGIKA
function deleteData(){
    // Lortu ID-ak
    const checkboxContainer = document.getElementById("kokalekuaTable");
    const checkedCheckboxes = Array.from(checkboxContainer.querySelectorAll('.checkbox-item:checked'));

    const checkboxIDs = [];

    checkedCheckboxes.forEach(checkbox => {
        checkboxIDs.push(checkbox.id);
    });

    console.log(checkboxIDs);

    const data = {
        id: checkboxIDs
    }
    
    //Galdetu
    const konfirmatu = window.confirm("Ziur al zaude " + checkboxIDs + " elementuak ezabatu nahi dituzula?");
    if(konfirmatu){
        //Deia egin
        fetch('http://localhost/erronka1/controller/kokalekuacontroller.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(data),
        })
        .then(() => {
            console.log("ONDO EZABATUTA!");
            getData();
        })
        .catch(error => {
            console.log("ERROR! " + error);
        });
    }
    
    ezabatuButton.disabled = true;
    editatuButton.disabled = true;
}

ezabatuButton.addEventListener("click", function (){
    deleteData();
});

//PAGINATZEKO LOGIKA
var dataKokalekua = [];
const tableLines = 10;
var actualPag = 1;

//PAGINAR LA TABLA INBENTARIOA
function paginarKokalekua(direccion) {
    let totalPages = Math.ceil(dataKokalekua.length / tableLines);

    actualPag += direccion;
    if (actualPag < 1) {
        actualPag = 1;
    }
    if (actualPag > totalPages) {
        actualPag = totalPages;
    }

    viewTableKokalekua(dataKokalekua, actualPag);

    document.getElementById("page-number").innerHTML = actualPag;
    document.getElementById("total-pages").innerHTML = totalPages;
}

function getData() {
    fetch('http://localhost/erronka1/controller/kokalekuacontroller.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataKokalekua = data;
        totalPages = Math.ceil(dataKokalekua.length / tableLines);
        paginarKokalekua(0); // Para asegurar que se inicie en la página 1
        ekipamenduGelakKargatu();
    })
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function viewTableKokalekua(dataKokalekua, actualPag) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;
    
    for (var i = start; i < Math.min(end, dataKokalekua.length); i++){
        tableHtml += "<tr><td><input type='checkbox' class='checkbox-item' id=" + dataKokalekua[i]["etiketa"] + "!" + dataKokalekua[i]["hasieraData"] + "></td>";
        tableHtml += "<td>" + dataKokalekua[i]["etiketa"] + "</td>";
        tableHtml += "<td>" + dataKokalekua[i]["ekipamenduIzena"] + "</td>";
        tableHtml += "<td>" + dataKokalekua[i]["idGela"] + "</td>";
        tableHtml += "<td>" + dataKokalekua[i]["gelaIzena"] + "</td>";
        tableHtml += "<td>" + dataKokalekua[i]["hasieraData"] + "</td>";
        tableHtml += "<td>" + dataKokalekua[i]["amaieraData"] + "</td></tr>";
    }
    document.getElementById("showDataKokalekua").innerHTML = tableHtml;
}

window.addEventListener("load", function(){
    getData();
})

// FILTROA
bilaketaButton.addEventListener("click", function(){
    filterData();
});

bilaketaTestu.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        filterData();
    }
});

function filterData(){
    const bilaketaInputValue = document.getElementById("bilaketa").value;
    const filtroSelectValue = document.getElementById("filtro").value;

    const url = `http://localhost/erronka1/controller/kokalekuacontroller.php?datua=${bilaketaInputValue}&zutabea=${filtroSelectValue}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data == null){
            alert("Kontuz! Ez dago daturik kontsulta horrekin!");
        } else {
            dataKokalekua = data;
            totalPages = Math.ceil(dataKokalekua.length / tableLines);
            paginarKokalekua(0); // Para asegurar que se inicie en la página 1
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}

filtroSelect.addEventListener('change', function() {
    // Obtén el valor seleccionado
    var selectedOption = filtroSelect.value;

    // Verifica si la opción seleccionada es "hasieraData" o "amaieraData"
    if (selectedOption === 'hasieraData' || selectedOption === 'amaieraData') {
        // Cambia el tipo de input a "date"
        bilaketaTestu.type = 'date';
    } else if(selectedOption === 'idGela') {
        bilaketaTestu.type = 'number';
    } else{
        bilaketaTestu.type = 'text';
    }
});

resetButton.addEventListener("click", function(){
    getData();
});
