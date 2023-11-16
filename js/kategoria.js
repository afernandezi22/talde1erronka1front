//ERABILTZAILEAREN DATUAK
const username = document.getElementById("username");
const rol = document.getElementById("rol");
const name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const logo = document.getElementById("logo");
const erabiltzaileIzena = document.getElementById("erabiltzaileIzena");
const filtroSelect = document.getElementById("filtro");

//BOTOIAK
const ezabatuButton = document.getElementById("ezabatuButton");
const gehituButton = document.getElementById("gehituButton");
const editatuButton = document.getElementById("editatuButton");
const bilaketaButton = document.getElementById("bilaketaButton");
const resetButton = document.getElementById("resetButton");
const bilaketaTestu = document.getElementById("bilaketa");

// BOTOIAK AKTIBATU ETA DESAKTIBATZEKO
document.addEventListener("DOMContentLoaded", function () {
    const checkboxContainer = document.getElementById("kategoriaTable");
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
    var editatuIzena = document.getElementById("editatuIzena");
    var gehituIzena = document.getElementById("gehituIzena");
    karaktereakMugatu(gehituIzena, 20);
    karaktereakMugatu(editatuIzena, 20);
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
    gehituKategoriaBerdina();
});

function gehituKategoriaBerdina() {
    var gehituIzena = document.getElementById("gehituIzena");
    const url = `http://localhost/erronka1/controller/kategoriacontroller.php?zutabea=izena&datua=${gehituIzena.value}`;
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
            gehituIzena.style.border = "1px solid black";
            gehituErrore.innerHTML = "";
        } else {
            gehituIzena.style.border = "1px solid red";
            gehituErrore.innerHTML = "<p style='color: red'><b>Izena bera duen kategoria bat dago datu-basean.</b></p>";
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    });
}

function insertData(){
    var izenaInputValue = document.getElementById("gehituIzena").value;

    const data = {
        izena: izenaInputValue,
    };
    fetch('http://localhost/erronka1/controller/kategoriacontroller.php', {
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
    editatuKategoriaBerdina();
});

function editatuKategoriaBerdina() {
    var editatuIzena = document.getElementById("editatuIzena");
    var editatuId = document.getElementById("editatuId")
    const url = `http://localhost/erronka1/controller/kategoriacontroller.php?zutabea=izena&datua=${editatuIzena.value}`;
    var editatuErrore = document.getElementById("editatuErrore");

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data === null || (data[0].id === editatuId.value && data[0].izena === editatuIzena.value)) {
            editData();
            editatuContainer.style.display = "none";
            editatuIzena.style.border = "1px solid black";
            editatuErrore.innerHTML = "";
        } else {
            editatuIzena.style.border = "1px solid red";
            editatuErrore.innerHTML = "<p style='color: red'><b>Izena bera duen kategoria bat dago datu-basean.</b></p>";
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    });
}

function editData(){
    const checkbox = document.querySelector('.checkbox-item:checked');
    const izenaInputValue = document.getElementById("editatuIzena").value;

    const data = {
        id: checkbox.id,
        izena: izenaInputValue,
    }

    
    fetch('http://localhost/erronka1/controller/kategoriacontroller.php', {
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
    const checkboxContainer = document.getElementById("kategoriaTable");
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
        fetch('http://localhost/erronka1/controller/kategoriacontroller.php', {
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
        const url = `http://localhost/erronka1/controller/ekipamenduacontroller.php?zutabea=idKategoria&datua=${id}`;
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
                alert("Hurrengo kategoriak ez dira ezabatu ekipamenduak daudelako kategoria horrekin: " + ezEzabatu);
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
var dataKategoria = [];
const tableLines = 10;
var actualPag = 1;

//PAGINAR LA TABLA INBENTARIOA
function paginarKategoria(direccion) {
    let totalPages = Math.ceil(dataKategoria.length / tableLines);

    actualPag += direccion;
    if (actualPag < 1) {
        actualPag = 1;
    }
    if (actualPag > totalPages) {
        actualPag = totalPages;
    }

    viewTableKategoria(dataKategoria, actualPag);

    document.getElementById("page-number").innerHTML = actualPag;
    document.getElementById("total-pages").innerHTML = totalPages;
}

function getData() {
    fetch('http://localhost/erronka1/controller/kategoriacontroller.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataKategoria = data;
        totalPages = Math.ceil(dataKategoria.length / tableLines);
        paginarKategoria(0); // Para asegurar que se inicie en la página 1
    })
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}


function viewTableKategoria(dataKategoria, actualPag) {
    var tableHtml = "";
    var start = (actualPag - 1) * tableLines;
    var end = start + tableLines;
    
    for (var i = start; i < Math.min(end, dataKategoria.length); i++){
        tableHtml += "<tr><td><input type='checkbox' class='checkbox-item' id=" + dataKategoria[i]["id"] + "></td>";
        tableHtml += "<td>" + dataKategoria[i]["id"] + "</td>";
        tableHtml += "<td>" + dataKategoria[i]["izena"] + "</td><tr>";
    }
    document.getElementById("showDataKategoria").innerHTML = tableHtml;
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

    const url = `http://localhost/erronka1/controller/kategoriacontroller.php?datua=${bilaketaInputValue}&zutabea=${filtroSelectValue}`;

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
            dataKategoria = data;
            totalPages = Math.ceil(dataKategoria.length / tableLines);
            paginarKategoria(0); // Para asegurar que se inicie en la página 1
        }
    })  
    .catch(err => {
        console.error("ERROR: " + err.message);
    })
}

resetButton.addEventListener("click", function(){
    getDataFromURL("kategoriaTable");
});

filtroSelect.addEventListener('change', function() {
    var selectedOption = filtroSelect.value;

    if (selectedOption === 'id') {
        bilaketaTestu.type = 'number';
    }else{
        bilaketaTestu.type = 'text';
    }
});

//Karaktereak limitatzeko
function karaktereakMugatu(input, muga) {
    input.addEventListener('input', function () {
        var texto = input.value;

        if (texto.length > muga) {
            // Limitar el texto a la longitud máxima
            input.value = texto.slice(0, muga);

            // Opcional: Añadir una clase para resaltar que se ha alcanzado el límite
            input.classList.add('exceeded');
        } else {
            // Asegurarse de que se elimine la clase si no se ha alcanzado el límite
            input.classList.remove('exceeded');
        }
    });
}