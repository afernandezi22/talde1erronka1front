<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/grafiko.css">
    <link rel="icon" href="../img/favicon2.ico" type="image/x-icon">
    <link rel="shortcut icon" href="../img/favicon2.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js"> -->

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
                <img class="logo" src="../img/julian cabeza.jpg" />
                <p>Julian (#erabiltzaile_izena)</p>
            </div>
            <ul class="nav-links">
                <li><a href="kokalekua.php">Kokalekua</a></li>
                <li><a href="ekipamendua.php">Ekipamendua</a></li>
                <li><a href="kategoria.php">Kategoria</a></li>
                <li><a href="gela.php">Gela</a></li>
                <li><a href="inbentarioa.php">Inbentarioa</a></li>
                <li><a href="erabiltzailea.php">Erabiltzailea</a></li>
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
                            <option value="nan">Etiketa</option>
                            <option value="izena">Ekipamendu izena</option>
                            <option value="abizena">Gela izena</option>
                            <option value="erabiltzailea">Hasiera Data</option>
                            <option value="rola">Amaiera Data</option>
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
                        <label for="gehituEtiketa">Etiketa:</label>
                        <input type="text" id="gehituEtiketa" name="nan" required>
                        <br><br>
                        <label for="gehituIdGela">Id Gela:</label>
                        <input type="text" id="gehituIdGela" name="idGela" required>
                        <br><br>
                        <label for="gehituHasieraData">Hasiera data:</label>
                        <input type="date" id="gehituHasieraData" name="hasieraData" required>
                        <br><br>
                        <label for="gehituAmaieraData">Amaiera data:</label>
                        <input type="date" id="gehituAmaieraData" name="amaieraData" required>
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
                        <label for="editatuNAN">Etiketa:</label>
                        <input type="text" id="editatuNAN" name="nan" required>
                        <br><br>
                        <label for="editatuIzena">Id Gela:</label>
                        <input type="text" id="editatuIzena" name="izena" required>
                        <br><br>
                        <label for="editatuAbizena">Hasiera data:</label>
                        <input type="text" id="editatuAbizena" name="abizena" required>
                        <br><br>
                        <label for="editatuErabiltzailea">Amaiera data:</label>
                        <input type="text" id="editatuErabiltzailea" name="erabiltzailea" required>
                        <br><br>
                        <button type="submit" id="editatuSubmit">Onartu</button>
                        <button type="button" id="itxiEditatuPopup">Itxi</button>
                    </form>
                </div>
            </div>

            <div class="tab-control">
                <img src="../img/flecha-izquierda.png" id="previous" onclick="paginar(-1, 'kokalekuaTable')" />
                <span id="page-number">1</span> / <span id="total-pages">-</span>
                <img src="../img/flecha-derecha.png" id="next" onclick="paginar(1, 'kokalekuaTable')" />
            </div>
        </div>

        <h1>ORDENAGAILUEN EGOERA</h1>

        <canvas id="grafikoa"></canvas>

        <script>
            // Obtén el contexto del canvas
            var ctx = document.getElementById('grafikoa').getContext('2d');
        
            // Datos del gráfico
            var datos = {
            labels: ['Libre', 'Hartuta'],
            datasets: [{
                label: 'Ordenagailuak',
                data: [12, 19], // Datos para el gráfico de rosquilla
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
        </script>
        
        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>
    
    <!-- SCRIPTS -->
    <script src="../js/viewTables.js"></script>
    <script src="../js/kokalekua.js"></script>

</body>

</html>
