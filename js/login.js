document.addEventListener("DOMContentLoaded", function() {
    const bidaliButton = document.getElementById("bidali");
    const erabiltzaileaInput = document.getElementById("erabil");
    const pasahitzaInput = document.getElementById("pass");
    const erantzunaDiv = document.getElementById("erantzuna");


    function bidali() {
        //Balioak lortu
        const erabiltzailea = erabiltzaileaInput.value;
        const pasahitza = pasahitzaInput.value;
        
        
        //JSON-a egin
        const data = {
            erabil: erabiltzailea,
            pass: pasahitza
        };

        //Eskaera
        // Realizar una solicitud POST al servidor
        fetch('http://localhost/erronka1/controller/erabiltzaileacontroller.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.erabil == false) {
                erabiltzaileaInput.style.border = "2px solid red";
                pasahitzaInput.style.border = "2px solid red";
                erantzunaDiv.innerHTML = "<p style='color: red;'><b>Erabiltzailea eta pasahitza txarto daude.</b></p>";                  
            } else if (data.pass == false) {
                erabiltzaileaInput.style.border = null;
                pasahitzaInput.style.borderColor = "red";
                erantzunaDiv.innerHTML = "<p style='color: red;'><b>Pasahitza txarto dago.</b></p>";                 
            } else {
                erabiltzaileaInput.style.border = null;
                pasahitzaInput.style.border = null;
                console.log("Ondo!");
                window.location.replace("http://localhost/erronka1/ERRONKA/html/kokalekua.php");
                erantzunaDiv.innerHTML = "";                 
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    bidaliButton.addEventListener("click", bidali);

    pasahitzaInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            bidali();
        }
    });

    erabiltzaileaInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            bidali();
        }
    });
});