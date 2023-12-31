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

// BOTOIAK AKTIBATU ETA DESAKTIBATZEKO
document.addEventListener("DOMContentLoaded", function () {
    const checkboxContainer = document.getElementById("inbentarioaTable");
    logo.src = avatar.value;
    erabiltzaileIzena.innerHTML = name.value + " (" + username.value + ")";
    //ERABILTZAILEA aukera ez da agertuko ADMIN rola ez baduzu
    const erabiltzaileaLink = document.getElementById("erabiltzaileaLink");
    if(rol.value != 0){
        erabiltzaileaLink.style.display = 'none';
    }

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
const gehituEkipamenduIzenaSelect = document.getElementById("gehituEkipamenduIzena");

function ekipamenduIzenakKargatu() {
    // Vacía los elementos del primer desplegable
    gehituEkipamenduIzenaSelect.innerHTML = '';

    fetch('http://localhost/erronka1/controller/ekipamenduacontroller.php')
        .then(response => response.json())
        .then(data => {
            // Itera sobre el JSON y agrega opciones al desplegable
            data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.id;
                option.text = item.izena;
                gehituEkipamenduIzenaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

gehituButton.addEventListener("click", function () {
    gehituContainer.style.display = "block";
});

itxiGehituPopup.addEventListener("click", function () {
    var gehituErosketaData = document.getElementById("gehituErosketaData");
    var gehituZenbat = document.getElementById("gehituZenbat");
    var gehituErrore = document.getElementById("gehituErrore");

    gehituErosketaData.style.border = "1px solid black";
    gehituZenbat.style.border = "1px solid black";
    gehituErrore.innerHTML = "";
    gehituContainer.style.display = "none";
});

gehituForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var gehituErosketaData = document.getElementById("gehituErosketaData");
    var gehituZenbat = document.getElementById("gehituZenbat");
    var gehituErrore = document.getElementById("gehituErrore");

    if(erosketaDataBegiratu(gehituErosketaData.value) && gehituZenbat.value > 0){
        insertData();
        gehituErosketaData.style.border = "1px solid black";
        gehituZenbat.style.border = "1px solid black";
        gehituErrore.innerHTML = "";
        gehituContainer.style.display = "none";
    } else if (gehituZenbat.value <= 0 && !erosketaDataBegiratu(gehituErosketaData.value)){
        gehituZenbat.style.border = "1px solid red";
        gehituErosketaData.style.border = "1px solid red";
        gehituErrore.innerHTML = "<p style='color: red'><b>Erosketa data gaur edo lehenagokoa izan behar da eta gutxienez 1 gehitu behar da.</b></p>";
    } else if(gehituZenbat.value <= 0){
        gehituErosketaData.style.border = "1px solid black";
        gehituZenbat.style.border = "1px solid red";
        gehituErrore.innerHTML = "<p style='color: red'><b>Gutxienez 1 gehitu behar da.</b></p>";
    } else {
        gehituErosketaData.style.border = "1px solid red";
        gehituZenbat.style.border = "1px solid black";
        gehituErrore.innerHTML = "<p style='color: red'><b>Erosketa data gaur edo lehenagokoa izan behar da.</b></p>";
    }
});

function insertData(){
    var gehituEkipamenduIzenaValue = document.getElementById("gehituEkipamenduIzena").value;
    var gehituZenbatValue = document.getElementById("gehituZenbat").value;
    var gehituErosketaData = document.getElementById("gehituErosketaData").value;

    const data = {
        zenbat: gehituZenbatValue,
        idEkipamendu: gehituEkipamenduIzenaValue,
        erosketaData: gehituErosketaData
    };
    fetch('http://localhost/erronka1/controller/inbentarioacontroller.php', {
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

editatuButton.addEventListener("click", function () {
    const checkbox = document.querySelector('.checkbox-item:checked');
    const editatuEtiketaInput = document.getElementById("editatuEtiketa");
    editatuEtiketaInput.value = checkbox.id;

    editatuContainer.style.display = "block";
});

itxiEditatuPopup.addEventListener("click", function () {
    var editatuErosketaData = document.getElementById("editatuErosketaData");
    var editatuErrore = document.getElementById("editatuErrore");

    editatuErosketaData.style.border = "1px solid black";
    editatuErrore.innerHTML = "";
    editatuContainer.style.display = "none";
});

editatuForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var editatuErosketaData = document.getElementById("editatuErosketaData");
    var editatuErrore = document.getElementById("editatuErrore");

    if(erosketaDataBegiratu(editatuErosketaData.value)){
        editData();
        editatuContainer.style.display = "none";
        editatuErosketaData.style.border = "1px solid black";
        editatuErrore.innerHTML = "";
    } else{
        editatuErosketaData.style.border = "1px solid red";
        editatuErrore.innerHTML = "<p style='color: red'><b>Erosketa data gaur edo lehenagokoa izan behar da.</b></p>";
    }
});

function editData(){
    const checkbox = document.querySelector('.checkbox-item:checked');
    const editatuEtiketaInputValue = document.getElementById("editatuEtiketa").value;
    const editatuErosketaDataInputValue = document.getElementById("editatuErosketaData").value;

    const data = {
        etiketa: editatuEtiketaInputValue,
        erosketaData: editatuErosketaDataInputValue
    }

    
    fetch('http://localhost/erronka1/controller/inbentarioacontroller.php', {
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
    const checkboxContainer = document.getElementById("inbentarioaTable");
    const checkedCheckboxes = Array.from(checkboxContainer.querySelectorAll('.checkbox-item:checked'));

    const checkboxIDs = [];

    checkedCheckboxes.forEach(checkbox => {
        checkboxIDs.push(checkbox.id);
    });

    console.log(checkboxIDs);

    const data = {
        etiketa: checkboxIDs
    }
    
    //Galdetu
    const konfirmatu = window.confirm("Ziur al zaude " + checkboxIDs + " elementuak ezabatu nahi dituzula?");
    if(konfirmatu){
        //Deia egin
        fetch('http://localhost/erronka1/controller/inbentarioacontroller.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(data),
        })
        .then(() => {
            console.log("ONDO EZABATUTA!");
            getData();
            ezEzabatu(checkboxIDs);
        })
        .catch(error => {
            console.log("ERROR! " + error);
        });
    }
    
    ezabatuButton.disabled = true;
    editatuButton.disabled = true;
}

function ezEzabatu(ids) {
    var promises = ids.map(id => {
        const url = `http://localhost/erronka1/controller/kokalekuacontroller.php?zutabea=etiketa&datua=${id}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data != null) {
                return id;
            }
        })
        .catch(err => {
            console.error("ERROR: " + err.message);
        });
    });

    Promise.all(promises)
        .then(ezEzabatu => {
            ezEzabatu = ezEzabatu.filter(Boolean);
            if (ezEzabatu.length > 0) {
                alert("Hurrengo erregistroak ez dira ezabatu kokalekuen erregistroan agertzen direlako: " + ezEzabatu);
            }
        })
        .catch(err => {
            console.error("ERROR: " + err.message);
        });
}

ezabatuButton.addEventListener("click", function (){
    deleteData();
});

//PAGINATZEKO LOGIKA
var dataInbentarioa = [];
const tableLines = 10;
var actualPag = 1;

//PAGINAR LA TABLA INBENTARIOA
function paginarInbentarioa(direccion) {
    let totalPages = Math.ceil(dataInbentarioa.length / tableLines);

    actualPag += direccion;
    if (actualPag < 1) {
        actualPag = 1;
    }
    if (actualPag > totalPages) {
        actualPag = totalPages;
    }

    viewTableInbentarioa(dataInbentarioa, actualPag);

    document.getElementById("page-number").innerHTML = actualPag;
    document.getElementById("total-pages").innerHTML = totalPages;
}

function getData() {
    fetch('http://localhost/erronka1/controller/inbentarioacontroller.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataInbentarioa = data;
        totalPages = Math.ceil(dataInbentarioa.length / tableLines);
        paginarInbentarioa(0); // Para asegurar que se inicie en la página 1
        ekipamenduIzenakKargatu();
    })
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function viewTableInbentarioa(dataInbentarioa, actualPag) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;
    
    for (var i = start; i < Math.min(end, dataInbentarioa.length); i++){
        tableHtml += "<tr><td><input type='checkbox' class='checkbox-item' id=" + dataInbentarioa[i]["etiketa"] + "></td>";
        tableHtml += "<td>" + dataInbentarioa[i]["etiketa"] + "</td>";
        tableHtml += "<td>" + dataInbentarioa[i]["idEkipamendu"] + "</td>";
        tableHtml += "<td>" + dataInbentarioa[i]["izenaEkipamendu"] + "</td>";
        tableHtml += "<td>" + dataInbentarioa[i]["erosketaData"] + "</td></tr>";
    }
    document.getElementById("showDataInbentarioa").innerHTML = tableHtml;
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

    const url = `http://localhost/erronka1/controller/inbentarioacontroller.php?datua=${bilaketaInputValue}&zutabea=${filtroSelectValue}`;

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
            dataInbentarioa = data;
            totalPages = Math.ceil(dataInbentarioa.length / tableLines);
            paginarInbentarioa(0); // Para asegurar que se inicie en la página 1
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
    if (selectedOption === 'erosketaData') {
        // Cambia el tipo de input a "date"
        bilaketaTestu.type = 'date';
    }else if(selectedOption === 'idEkipamendu') {
        bilaketaTestu.type = 'number';
    }else{
        bilaketaTestu.type = 'text';
    }
});

resetButton.addEventListener("click", function(){
    getData();
});

//Erosketa data begiratzeko
function erosketaDataBegiratu(erosketaDataValue){
    const erosketaData = new Date(erosketaDataValue);
    const gaur = new Date();
    // Verificar las condiciones
    if (erosketaData <= gaur || erosketaData == null) {
        return true;
    } else {
        return false;
    }
}