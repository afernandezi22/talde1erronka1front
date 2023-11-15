<?php
    session_start();    
    if(!isset($_SESSION["username"])){
        echo "<h1>Ez dago erabiltzailerik</h1>";
    } else{
        echo "<input type='hidden' id='username' value=" . $_SESSION["username"] . ">";
        echo "<input type='hidden' id='rol' value=" . $_SESSION["rol"] . ">";
        echo "<input type='hidden' id='name' value=" . $_SESSION["name"] . ">";
        echo "<input type='hidden' id='avatar' value=" . $_SESSION["avatar"] . ">";
        ?>
        <!DOCTYPE html>
        <html lang="eu">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/styles.css">
            <link rel="stylesheet" href="../css/grafiko.css">
            <link rel="icon" href="../img/favicon2.ico" type="image/x-icon">
            <link rel="shortcut icon" href="../img/favicon2.ico" type="image/x-icon">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>

            <title>Kokalekua</title>
        </head>

        <body>
            <div class="container">
                <!-- MENU DE NAVEGACION -->
                <nav>
                    <input type="checkbox" id="check"> 
                    <label for="check" class="checkbtn">
                        <i class="fas fa-bars"></i>
                    </label>
                    <div class="logo-container">
                        <img id="logo" class="logo" src="../img/julian cabeza.jpg" />
                        <p id="erabiltzaileIzena">Julian (#erabiltzaile_izena)</p>
                    </div>
                    <ul class="nav-links">
                        <li><a href="kokalekua.php">Kokalekua</a></li>
                        <li><a href="ekipamendua.php">Ekipamendua</a></li>
                        <li><a href="kategoria.php">Kategoria</a></li>
                        <li><a href="gela.php">Gela</a></li>
                        <li><a href="inbentarioa.php">Inbentarioa</a></li>
                        <li id="erabiltzaileaLink"><a href="erabiltzailea.php">Erabiltzailea</a></li>
                        <li><a href="login.php">Logout</a></li>
                    </ul>
                </nav>

                <div class="content">
                    <h1>KOKALEKUA</h1>


                    <div class="botoiak">
                            <form action="">
                                <button type="button" id="gehituButton"><i class="fa-solid fa-circle-plus"></i></button>
                                <button type="button" id="editatuButton" disabled><i class="fa-solid fa-pencil"></i></button>
                                <button type="button" id="ezabatuButton" disabled><i class="fa-solid fa-trash"></i></button>
                                <select name="filtro" id="filtro">
                                    <option value="etiketa">Etiketa</option>
                                    <option value="ekipamenduIzena">Ekipamendu izena</option>
                                    <option value="idGela">ID Gela</option>
                                    <option value="gelaIzena">Gela izena</option>
                                    <option value="hasieraData">Hasiera Data</option>
                                    <option value="amaieraData">Amaiera Data</option>
                                </select>
                                <input type="text" id="bilaketa" placeholder="Bilatu...">
                                <button class="lupa" id="bilaketaButton" type="button"><i class="fa fa-search"></i></button>
                                <button id="resetButton"><i class="fa-solid fa-rotate-right"></i></button>
                            </form>
                        </div>
                            
                    <table id="kokalekuaTable">
                        <tr>
                            <th></th>
                            <th>Etiketa</th>
                            <th>Ekipamendu izena</th>
                            <th>ID Gela</th>
                            <th>Gela izena</th>
                            <th>Hasiera Data</th>
                            <th>Amaiera Data</th>
                        </tr>

                        <tbody id="showDataKokalekua"></tbody>
                    </table>

                    <div class="popup-container" id="gehituContainer">
                        <div class="popup">
                            <h2>Gehitu</h2>
                            <form id="gehituForm">
                                <label for="gehituEkipamenduIzena">Ekipamendua:</label>
                                <select name="gehituEkipamenduIzena" id="gehituEkipamenduIzena"></select>
                                <br><br>
                                <label for="gehituGela">Gela:</label>
                                <select name="gehituGela" id="gehituGela"></select>
                                <br><br>
                                <label for="gehituHasieraData">Hasiera data:</label>
                                <input type="date" id="gehituHasieraData" name="hasieraData" required>
                                <br><br>
                                <label for="gehituAmaieraData">Amaiera data:</label>
                                <input type="date" id="gehituAmaieraData" name="amaieraData">
                                <br><br>
                                <button type="submit" id="gehituSubmit">Onartu</button>
                                <button type="button" id="itxiGehituPopup">Itxi</button>
                            </form>
                        </div>
                    </div>

                    <div class="popup-container" id="editatuContainer">
                        <div class="popup">
                            <h2>Editatu</h2>
                            <form id="editatuForm">
                                <label for="editatuEtiketa">Etiketa:</label>
                                <input type="text" id="editatuEtiketa" name="editatuEtiketa" disabled>
                                <br><br>
                                <label for="editatuHasieraData">Hasiera data:</label>
                                <input type="date" id="editatuHasieraData" name="editatuHasieraData" disabled>
                                <br><br>
                                <label for="editatuAmaieraData">Amaiera data:</label>
                                <input type="date" id="editatuAmaieraData" name="editatuAmaieraData" required>
                                <br><br>
                                <button type="submit" id="editatuSubmit">Onartu</button>
                                <button type="button" id="itxiEditatuPopup">Itxi</button>
                            </form>
                        </div>
                    </div>

                    <div class="tab-control">
                        <img class="geziak" src="../img/flecha-izquierda.png" id="previous" onclick="paginarKokalekua(-1)" />
                        <span id="page-number">1</span> / <span id="total-pages">-</span>
                        <img class="geziak" src="../img/flecha-derecha.png" id="next" onclick="paginarKokalekua(1)" />
                    </div>
                </div>

                <h1>PORTATILEN EGOERA</h1>

                <canvas id="grafikoa"></canvas>

                <script>
                    // Grafikoan erabiliko diren datuak lortu
                    fetch('http://localhost/erronka1/controller/kokalekuacontroller.php?portatil=true', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Puedes asignarlos a variables si lo necesitas
                        var total = data.TOTAL;
                        var libre = data.LIBRE;
                        
                        // Obtén el contexto del canvas
                        var ctx = document.getElementById('grafikoa').getContext('2d');
                    
                        // Datos del gráfico
                        var datos = {
                        labels: ['Libre', 'Hartuta'],
                        datasets: [{
                            label: 'Ordenagailuak',
                            data: [libre, (total-libre)], // Datos para el gráfico de rosquilla
                            backgroundColor: [
                                'rgba(80, 135, 236, 0.7)', // Color de fondo para el primer dato
                                'rgba(255, 99, 132, 0.7)', // Color de fondo para el segundo dato
                                
                            ],
                            borderColor: [
                                'rgba(80, 135, 236, 1)', // Color del borde para el primer dato
                                'rgba(255, 99, 132, 1)', // Color del borde para el segundo dato
                            ],  
                            borderWidth: 1 // Ancho del borde del gráfico de rosquilla
                        }]
                    };
                    
                        // Configuración del gráfico
                        var config = {
                        type: 'doughnut', // Tipo de gráfico (gráfico de rosquilla)
                        data: datos,
                        options: {
                            responsive: true,
                        }
                        };
                    
                        // Crea el gráfico
                        var miGrafico = new Chart(ctx, config);
                    })
                    .catch(err => {
                        console.error("ERROR: " + err.message);
                    });

                </script>
                
                <div class="footer">
                    <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
                </div>
            </div>
            
            <!-- SCRIPTS -->
            <script src="../js/kokalekua.js"></script>

        </body>

        </html>
<?php
    }
 ?>

