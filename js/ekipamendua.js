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
    const checkboxContainer = document.getElementById("ekipamenduaTable");
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
const gehituKategoriaSelect = document.getElementById("gehituKategoria");
const editatuKategoriaSelect = document.getElementById("editatuKategoria");
const kategoriaSelect = document.getElementById("kategoria");

function kategoriakKargatu() {
    // Vacía los elementos del desplegable
    gehituKategoriaSelect.innerHTML = '';
    editatuKategoriaSelect.innerHTML = '';

    fetch('http://localhost/erronka1/controller/kategoriacontroller.php')
        .then(response => response.json())
        .then(data => {
            // Itera sobre el JSON y agrega opciones al desplegable
            data.forEach(item => {
                var optionGehi = document.createElement('option');
                optionGehi.value = item.id;
                optionGehi.text = item.izena;
                var optionEdit = document.createElement('option');
                optionEdit.value = item.id;
                optionEdit.text = item.izena;
                var optionFilter = document.createElement('option');
                optionFilter.value = item.id;
                optionFilter.text = item.izena;
                gehituKategoriaSelect.appendChild(optionGehi);
                editatuKategoriaSelect.appendChild(optionEdit);
                kategoriaSelect.appendChild(optionFilter);
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
    var gehituIzenaValue = document.getElementById("gehituIzena").value;
    var gehituDeskribapenaValue = document.getElementById("gehituDeskribapena").value;
    var gehituMarkaValue = document.getElementById("gehituMarka").value;
    var gehituModeloValue = document.getElementById("gehituModelo").value;
    var gehituKategoriaValue = document.getElementById("gehituKategoria").value;

    const data = {
        izena: gehituIzenaValue,
        deskribapena: gehituDeskribapenaValue,
        marka: gehituMarkaValue,
        modelo: gehituModeloValue,
        idKategoria: gehituKategoriaValue
    };
    fetch('http://localhost/erronka1/controller/ekipamenduacontroller.php', {
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
    const editatuIdInput = document.getElementById("editatuId");
    editatuIdInput.value = checkbox.id;

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
    const checkbox = document.querySelector('.checkbox-item:checked');
    const editatuIdInputValue = document.getElementById("editatuId").value;
    const editatuIzenaInputValue = document.getElementById("editatuIzena").value;
    const editatuDeskribapenaInputValue = document.getElementById("editatuDeskribapena").value;
    const editatuMarkaInputValue = document.getElementById("editatuMarka").value;
    const editatuModeloInputValue = document.getElementById("editatuModelo").value;
    const editatuKategoriaInputValue = document.getElementById("editatuKategoria").value;

    const data = {
        id: editatuIdInputValue,
        izena: editatuIzenaInputValue,
        deskribapena: editatuDeskribapenaInputValue,
        marka: editatuMarkaInputValue,
        modelo: editatuModeloInputValue,
        idKategoria: editatuKategoriaInputValue
    }

    
    fetch('http://localhost/erronka1/controller/ekipamenduacontroller.php', {
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
    const checkboxContainer = document.getElementById("ekipamenduaTable");
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
        fetch('http://localhost/erronka1/controller/ekipamenduacontroller.php', {
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
var dataEkipamendua = [];
const tableLines = 10;
var actualPag = 1;

//PAGINAR LA TABLA EKIPAMENDUA
function paginarEkipamendua(direccion) {
    let totalPages = Math.ceil(dataEkipamendua.length / tableLines);

    actualPag += direccion;
    if (actualPag < 1) {
        actualPag = 1;
    }
    if (actualPag > totalPages) {
        actualPag = totalPages;
    }

    viewTableEkipamendua(dataEkipamendua, actualPag);

    document.getElementById("page-number").innerHTML = actualPag;
    document.getElementById("total-pages").innerHTML = totalPages;
}

function getData() {
    fetch('http://localhost/erronka1/controller/ekipamenduacontroller.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataEkipamendua = data;
        totalPages = Math.ceil(dataEkipamendua.length / tableLines);
        paginarEkipamendua(0); // Para asegurar que se inicie en la página 1
        kategoriakKargatu();
    })
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function viewTableEkipamendua(dataEkipamendua, actualPag) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;
    
    for (var i = start; i < Math.min(end, dataEkipamendua.length); i++){
        tableHtml += "<tr><td><input type='checkbox' class='checkbox-item' id=" + dataEkipamendua[i]["id"] + "></td>";
        tableHtml += "<td>" + dataEkipamendua[i]["id"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["izena"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["deskribapena"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["marka"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["modelo"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["stock"] + "</td>";
        tableHtml += "<td>" + dataEkipamendua[i]["kategoriaIzena"] + "</td></th>";
    }
    document.getElementById("showDataEkipamendua").innerHTML = tableHtml;
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
    // FALTA PONER AQUÍ LO DE KATEGORIA!!!!

    const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?datua=${bilaketaInputValue}&zutabea=${filtroSelectValue}`;

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
            dataEkipamendua = data;
            totalPages = Math.ceil(dataEkipamendua.length / tableLines);
            paginarEkipamendua(0); // Para asegurar que se inicie en la página 1
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
    if (selectedOption === 'kategoria') {
        // Cambia el tipo de input a "date"
        bilaketaTestu.hidden = true;
        kategoriaSelect.hidden = false;
    } else if(selectedOption === 'id') {
        bilaketaTestu.hidden = false;
        bilaketaTestu.type = 'number';
    } else{
        bilaketaTestu.hidden = false;
        bilaketaTestu.type = 'text';
    }
});

resetButton.addEventListener("click", function(){
    getData();
});
