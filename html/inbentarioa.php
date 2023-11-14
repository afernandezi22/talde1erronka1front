<?php
    session_start();
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

    <title>Inbentarioa</title>
</head>

<body>
    <div class="container">

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
                <li><a href="erabiltzailea.php">Erabiltzailea</a></li>
                <li><a href="login.php">Logout</a></li>
            </ul>
        </nav>

        <div class="content">
            <h1>INBENTARIOA</h1>

            <div class="botoiak">
                    <form action="">
                        <button type="button" id="gehituButton"><i class="fa-solid fa-circle-plus"></i></button>
                        <button type="button" id="editatuButton" disabled><i class="fa-solid fa-pencil"></i></button>
                        <button type="button" id="ezabatuButton" disabled><i class="fa-solid fa-trash"></i></button>
                        <select name="filtro" id="filtro">
                            <option value="etiketa">Etiketa</option>
                            <option value="idEkipamendu">ID Ekipamendu</option>
                            <option value="ekipamenduIzena">Ekipamendu izena</option>
                            <option value="erosketaData">Erosketa Data</option>
                        </select>
                        <input type="text" id="bilaketa" placeholder="Bilatu...">
                        <button class="lupa" id="bilaketaButton" type="button"><i class="fa fa-search"></i></button>
                        <button id="resetButton"><i class="fa-solid fa-rotate-right"></i></button>
                    </form>
                </div>

            <table id="inbentarioaTable">
                <tr>
                    <th></th>
                    <th>Etiketa</th>
                    <th>ID Ekipamendu</th>
                    <th>Izena Ekipamendu</th>
                    <th>Erosketa Data</th>
                </tr>

                <tbody id="showDataInbentarioa"></tbody>
            </table>

            <div class="popup-container" id="gehituContainer">
                <div class="popup">
                    <h2>Gehitu</h2>
                    <form id="gehituForm">
                        <label for="gehituEkipamenduIzena">Ekipamendua:</label>
                        <select name="gehituEkipamenduIzena" id="gehituEkipamenduIzena"></select>
                        <br><br>
                        <label for="gehituZenbat">Kantitatea:</label>
                        <input type="number" id="gehituZenbat" name="gehituZenbat" required>
                        <br><br>
                        <label for="gehituErosketaData">Erosketa data:</label>
                        <input type="date" id="gehituErosketaData" name="gehituErosketaData" required>
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
                        <label for="editatuErosketaData">Erosketa data:</label>
                        <input type="date" id="editatuErosketaData" name="editatuErosketaData" required>
                        <br><br>
                        <button type="submit" id="editatuSubmit">Onartu</button>
                        <button type="button" id="itxiEditatuPopup">Itxi</button>
                    </form>
                </div>
            </div>

            <div class="tab-control">
                <img class="geziak" src="../img/flecha-izquierda.png" id="previous" onclick="paginarInbentarioa(-1)" />
                <span id="page-number">1</span> / <span id="total-pages">-</span>
                <img class="geziak" src="../img/flecha-derecha.png" id="next" onclick="paginarInbentarioa(1)" />
            </div>
        </div>

        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script src="../js/inbentarioa.js"></script>
</body>

</html>
