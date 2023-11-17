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
    const checkboxContainer = document.getElementById("ekipamenduaTable");
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
    var gehituIzena = document.getElementById("gehituIzena");
    var editatuIzena = document.getElementById("editatuIzena");
    var gehituDeskribapena = document.getElementById("gehituDeskribapena");
    var editatuDeskribapena = document.getElementById("editatuDeskribapena");
    var gehituMarka = document.getElementById("gehituMarka");
    var editatuMarka = document.getElementById("editatuMarka");
    var gehituModelo = document.getElementById("gehituModelo");
    var editatuModelo = document.getElementById("editatuModelo");
    karaktereakMugatu(gehituIzena, 50);
    karaktereakMugatu(editatuIzena, 50);
    karaktereakMugatu(gehituDeskribapena, 200);
    karaktereakMugatu(editatuDeskribapena, 200);
    karaktereakMugatu(gehituMarka, 20);
    karaktereakMugatu(editatuMarka, 20);
    karaktereakMugatu(gehituModelo, 100);
    karaktereakMugatu(editatuModelo, 100);
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
    kategoriaSelect.innerHTML = '';

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
    gehituMarkaModeloBerdina();
});

function gehituMarkaModeloBerdina() {
    var gehituMarka = document.getElementById("gehituMarka");
    var gehituModelo = document.getElementById("gehituModelo");
    const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?marka=${gehituMarka.value}&modelo=${gehituModelo.value}`;
    var gehituErrore = document.getElementById("gehituErrore");

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data === null) {
            insertData();
            gehituContainer.style.display = "none";
            gehituMarka.style.border = "1px solid black";
            gehituModelo.style.border = "1px solid black";
            gehituErrore.innerHTML = "";
        } else {
            gehituMarka.style.border = "1px solid red";
            gehituModelo.style.border = "1px solid red";
            gehituErrore.innerHTML = "<p style='color: red'><b>Marka eta modelo bera duen ekipamendu bat dago datu-basean.</b></p>";
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    });
}

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
    editKargatuDatuak();
    editatuContainer.style.display = "block";
});

itxiEditatuPopup.addEventListener("click", function () {
    editatuContainer.style.display = "none";
});

editatuForm.addEventListener("submit", function (e) {
    e.preventDefault();
    editatuMarkaModeloBerdina();
});

function editatuMarkaModeloBerdina() {
    var editatuMarka = document.getElementById("editatuMarka");
    var editatuModelo = document.getElementById("editatuModelo");
    const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?marka=${editatuMarka.value}&modelo=${editatuModelo.value}`;
    var editatuErrore = document.getElementById("editatuErrore");
    var editatuId = document.getElementById("editatuId");

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data === null || (data[0].id === editatuId.value && data[0].marka === editatuMarka.value && data[0].modelo === editatuModelo.value)) {
            editData();
            editatuContainer.style.display = "none";
            editatuMarka.style.border = "1px solid black";
            editatuModelo.style.border = "1px solid black";
            editatuErrore.innerHTML = "";
        } else {
            editatuMarka.style.border = "1px solid red";
            editatuModelo.style.border = "1px solid red";
            editatuErrore.innerHTML = "<p style='color: red'><b>Marka eta modelo bera duen ekipamendu bat dago datu-basean.</b></p>";
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    });
}

function editKargatuDatuak(){
    var checkbox = document.querySelector('.checkbox-item:checked');
    const editatuIdInputValue = document.getElementById("editatuId").value;
    const editatuIzenaInput = document.getElementById("editatuIzena");
    const editatuDeskribapenaInput = document.getElementById("editatuDeskribapena");
    const editatuMarkaInput = document.getElementById("editatuMarka");
    const editatuModeloInput = document.getElementById("editatuModelo");
    const editatuKategoriaInput = document.getElementById("editatuKategoria");

    const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?id=${editatuIdInputValue}`;
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
            editatuIzenaInput.value = data[0].izena;
            editatuDeskribapenaInput.value = data[0].deskribapena;
            editatuMarkaInput.value = data[0].marka;
            editatuModeloInput.value = data[0].modelo;
            editatuKategoriaInput.value = data[0].idKategoria;
            editatuKategoriaInput.text = data[0].kategoriaIzena;
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}

function editData(){
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
            ezEzabatu(checkboxIDs);
            getData();
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
        const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?id=${id}`;
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
            if (data != null && data[0].stock > 0) {
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
                alert("Hurrengo ekipamenduak ez dira ezabatu stock-a dutelako: " + ezEzabatu);
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
});

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
    if(kategoriaSelect.hidden == false){
        filtroSelectValue = "idKategoria";
        bilaketaInputValue = document.getElementById("kategoria").value;
    }

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
    var selectedOption = filtroSelect.value;

    if (selectedOption === 'kategoria') {
        bilaketaTestu.hidden = true;
        kategoriaSelect.hidden = false;
    } else if(selectedOption === 'id') {
        bilaketaTestu.hidden = false;
        kategoriaSelect.hidden = true;
        bilaketaTestu.type = 'number';
    } else if(selectedOption === 'stock') {
        bilaketaTestu.hidden = false;
        kategoriaSelect.hidden = true;
        bilaketaTestu.type = 'number';
    }else{
        bilaketaTestu.hidden = false;
        kategoriaSelect.hidden = true;
        bilaketaTestu.type = 'text';
    }
});

resetButton.addEventListener("click", function(){
    getData();
});

//Karaktereak limitatzeko
function karaktereakMugatu(input, muga) {
    input.addEventListener('input', function () {
        var texto = input.value;

        if (texto.length > muga) {
            input.value = texto.slice(0, muga);

            input.classList.add('exceeded');
        } else {
            input.classList.remove('exceeded');
        }
    });
}