//BOTOIAK
const ezabatuButton = document.getElementById("ezabatuButton");
const gehituButton = document.getElementById("gehituButton");
const editatuButton = document.getElementById("editatuButton");
const bilaketaButton = document.getElementById("bilaketaButton");
const resetButton = document.getElementById("resetButton");
const bilaketaTestu = document.getElementById("bilaketa");
const filtroSelect = document.getElementById("filtro");
const rolaSelect = document.getElementById("rolaSelect");

// BOTOIAK AKTIBATU ETA DESAKTIBATZEKO
document.addEventListener("DOMContentLoaded", function () {
    const checkboxContainer = document.getElementById("erabiltzaileaTable");
    const editatuButton = document.getElementById("editatuButton");
    const ezabatuButton = document.getElementById("ezabatuButton");

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
    const gehituNanInput = document.getElementById("gehituNAN");
    const gehituIzenaInput = document.getElementById("gehituIzena");
    const gehituAbizenaInput = document.getElementById("gehituAbizena");
    const gehituErabiltzaileaInput = document.getElementById("gehituErabiltzailea");
    const gehituPasahitzaInput = document.getElementById("gehituPasahitza");
    const gehituRolaInput = document.getElementById("gehituRola");
    const gehituIrudiaInput = document.getElementById("gehituIrudia");

    const data = {
        nan: gehituNanInput.value,
        izena: gehituIzenaInput.value,
        abizena: gehituAbizenaInput.value,
        erabiltzailea: gehituErabiltzaileaInput.value,
        pasahitza: gehituPasahitzaInput.value,
        rola: gehituRolaInput.value,
        irudia: gehituIrudiaInput.value
    };

    fetch('http://localhost/erronka1/controller/erabiltzaileacontroller.php', {
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
    editKargatuDatuak();
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

function editKargatuDatuak(){
    var checkbox = document.querySelector('.checkbox-item:checked');
    const editatuNanInput = document.getElementById("editatuNAN");
    const editatuIzenaInput = document.getElementById("editatuIzena");
    const editatuAbizenaInput = document.getElementById("editatuAbizena");
    const editatuErabiltzaileaInput = document.getElementById("editatuErabiltzailea");
    const editatuPasahitzaInput = document.getElementById("editatuPasahitza");
    const editatuRolaInput = document.getElementById("editatuRola");
    const editatuIrudiaInput = document.getElementById("editatuIrudia");

    const url = `http://localhost/erronka1/controller/erabiltzaileacontroller.php?id=${checkbox.id}`;
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
            editatuNanInput.value = data[0].nan;
            editatuIzenaInput.value = data[0].izena;
            editatuAbizenaInput.value = data[0].abizena;
            editatuErabiltzaileaInput.value = data[0].erabiltzailea;
            editatuPasahitzaInput.value = data[0].pasahitza;
            editatuRolaInput.value = data[0].rola;
            editatuIrudiaInput.value = data[0].irudia;
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function editData(){
    const nanInputValue = document.getElementById("editatuNAN").value;
    const izenaInputValue = document.getElementById("editatuIzena").value;
    const abizenaInputValue = document.getElementById("editatuAbizena").value;
    const erabiltzaileaInputValue = document.getElementById("editatuErabiltzailea").value;
    const pasahitzaInputValue = document.getElementById("editatuPasahitza").value;
    const rolaInputValue = document.getElementById("editatuRola").value;
    const irudiaInputValue = document.getElementById("editatuIrudia").value;

    const data = {
        nan: nanInputValue,
        izena: izenaInputValue,
        abizena: abizenaInputValue,
        erabiltzailea: erabiltzaileaInputValue,
        pasahitza: pasahitzaInputValue,
        rola: rolaInputValue,
        irudia: irudiaInputValue
    }

    
    fetch('http://localhost/erronka1/controller/erabiltzaileacontroller.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        console.log("ONDO!");
        console.log(data);
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
    const checkboxContainer = document.getElementById("erabiltzaileaTable");
    const checkedCheckboxes = Array.from(checkboxContainer.querySelectorAll('.checkbox-item:checked'));

    const checkboxIDs = [];

    checkedCheckboxes.forEach(checkbox => {
        checkboxIDs.push(checkbox.id);
    });

    console.log(checkboxIDs);

    const data = {
        nan: checkboxIDs
    }
    
    //Galdetu
    const konfirmatu = window.confirm("Ziur al zaude " + checkboxIDs + " elementuak ezabatu nahi dituzula?");
    if(konfirmatu){
        //Deia egin
        fetch('http://localhost/erronka1/controller/erabiltzaileacontroller.php', {
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
var dataErabiltzailea = [];
const tableLines = 10;
var actualPag = 1;

//PAGINAR LA TABLA INBENTARIOA
function paginarErabiltzailea(direccion) {
    let totalPages = Math.ceil(dataErabiltzailea.length / tableLines);

    actualPag += direccion;
    if (actualPag < 1) {
        actualPag = 1;
    }
    if (actualPag > totalPages) {
        actualPag = totalPages;
    }

    viewTableErabiltzailea(dataErabiltzailea, actualPag);

    document.getElementById("page-number").innerHTML = actualPag;
    document.getElementById("total-pages").innerHTML = totalPages;
}

function getData() {
    fetch('http://localhost/erronka1/controller/erabiltzaileacontroller.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataErabiltzailea = data;
        totalPages = Math.ceil(dataErabiltzailea.length / tableLines);
        paginarErabiltzailea(0); // Para asegurar que se inicie en la página 1
    })
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function viewTableErabiltzailea(dataErabiltzailea, actualPag) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;
    
    for (var i = start; i < Math.min(end, dataErabiltzailea.length); i++){
        var irudia;
        var rola;
        if(dataErabiltzailea[i]["irudia"] == null){
            irudia = "../img/avatar/default.jpg";
        } else{
            irudia = dataErabiltzailea[i]["irudia"];
        }
        if(dataErabiltzailea[i]["rola"] == 0){
            rola = "Admin";
        } else{
            rola = "Erabiltzaile";
        }

        tableHtml += "<tr><td><input type='checkbox' class='checkbox-item' id=" + dataErabiltzailea[i]["nan"] + "></td>";
        tableHtml += "<td>" + dataErabiltzailea[i]["nan"] + "</td>";
        tableHtml += "<td>" + dataErabiltzailea[i]["izena"] + "</td>";
        tableHtml += "<td>" + dataErabiltzailea[i]["abizena"] + "</td>";
        tableHtml += "<td>" + dataErabiltzailea[i]["erabiltzailea"] + "</td>";
        tableHtml += "<td>" + rola + "</td>";
        tableHtml += "<td><img src='" + irudia + "' class='argazkiak'></td></tr>";
    }
    document.getElementById("showDataErabiltzailea").innerHTML = tableHtml;
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
    var bilaketaInputValue = document.getElementById("bilaketa").value;
    var filtroSelectValue = document.getElementById("filtro").value;

    if(rolaSelect.hidden == false){
        filtroSelectValue = "rola";
        bilaketaInputValue = document.getElementById("rolaSelect").value;
    }

    const url = `http://localhost/erronka1/controller/erabiltzaileacontroller.php?datua=${bilaketaInputValue}&zutabea=${filtroSelectValue}`;

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
            dataErabiltzailea = data;
            totalPages = Math.ceil(dataErabiltzailea.length / tableLines);
            paginarErabiltzailea(0); // Para asegurar que se inicie en la página 1
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}

filtroSelect.addEventListener('change', function() {
    var selectedOption = filtroSelect.value;

    if (selectedOption === 'rola') {
        bilaketaTestu.hidden = true;
        rolaSelect.hidden = false;
    }else{
        bilaketaTestu.hidden = false;
        rolaSelect.hidden = true;
    }
});


resetButton.addEventListener("click", function(){
    getData();
});
