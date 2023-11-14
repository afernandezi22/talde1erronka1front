<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/grafiko.css">
    <link rel="icon" href="../img/favicon2.ico" type="image/x-icon">
    <link rel="shortcut icon" href="../img/favicon2.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel='stylesheet' href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
    <title>Ekipamendua</title>
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

        <!-- TABLA -->
        <div class="content">
            <h1>EKIPAMENDUA</h1>
            <div class="botoiak">
                    <form action="">
                        <button type="button" id="gehituButton"><i class="fa-solid fa-circle-plus"></i></button>
                        <button type="button" id="editatuButton" disabled><i class="fa-solid fa-pencil"></i></button>
                        <button type="button" id="ezabatuButton" disabled><i class="fa-solid fa-trash"></i></button>
                        <select name="filtro" id="filtro">
                            <option value="id">ID</option>
                            <option value="izena">Ekipamenduaren izena</option>
                            <option value="marka">Marka</option>
                            <option value="modelo">Modeloa</option>
                            <option value="stock">Stock</option>
                            <option value="kategoria">Kategoria</option>
                        </select>
                        <input type="number" id="bilaketa" placeholder="Bilatu...">
                        <select name="kategoria" id="kategoria" hidden></select>
                        <button class="lupa" id="bilaketaButton" type="button"><i class="fa fa-search"></i></button>
                        <button id="resetButton"><i class="fa-solid fa-rotate-right"></i></button>
                    </form>
                </div>

            <table id="ekipamenduaTable">
                <tr>
                    <th></th>
                    <th class="sortable" data-column="id">ID<i class='bx bxs-sort-alt'></i></th>
                    <th class="sortable" data-column="izena">Izena<i class='bx bxs-sort-alt'></i></th>
                    <th>Deskribapena</th>
                    <th class="sortable" data-column="marka">Marka<i class='bx bxs-sort-alt'></i></th>
                    <th class="sortable" data-column="modelo">Modelo<i class='bx bxs-sort-alt'></i></th>
                    <th class="sortable" data-column="stock">Stock<i class='bx bxs-sort-alt'></i></th>
                    <th class="sortable" data-colunm="kategoria">Kategoria<i class='bx bxs-sort-alt'></i></th>
                </tr>

                <tbody id="showDataEkipamendua"></tbody>
            </table>

            <div class="popup-container" id="gehituContainer">
                <div class="popup">
                    <h2>Gehitu</h2>
                    <form id="gehituForm">
                        <label for="gehituIzena">Izena:</label>
                        <input type="text" id="gehituIzena" name="gehituIzena" required>
                        <br><br>
                        <label for="gehituDeskribapena">Deskribapena:</label>
                        <input type="text" id="gehituDeskribapena" name="gehituDeskribapena" required>
                        <br><br>
                        <label for="gehituMarka">Marka:</label>
                        <input type="text" id="gehituMarka" name="gehituMarka" required>
                        <br><br>
                        <label for="gehituModelo">Modelo:</label>
                        <input type="text" id="gehituModelo" name="gehituModelo" required>
                        <br><br>
                        <label for="gehituKategoria">Kategoria:</label>
                        <select name="gehituKategoria" id="gehituKategoria"></select>
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
                        <label for="editatuId">ID:</label>
                        <input type="number" id="editatuId" name="editatuId" disabled>
                        <br><br>
                        <label for="editatuIzena">Izena:</label>
                        <input type="text" id="editatuIzena" name="editatuIzena" required>
                        <br><br>
                        <label for="editatuDeskribapena">Deskribapena:</label>
                        <input type="text" id="editatuDeskribapena" name="editatuDeskribapena" required>
                        <br><br>
                        <label for="editatuMarka">Marka:</label>
                        <input type="text" id="editatuMarka" name="editatuMarka" required>
                        <br><br>
                        <label for="editatuModelo">Modelo:</label>
                        <input type="text" id="editatuModelo" name="editatuModelo" required>
                        <br><br>
                        <label for="editatuKategoria">Kategoria:</label>
                        <select name="editatuKategoria" id="editatuKategoria"></select>
                        <br><br>
                        <button type="submit" id="editatuSubmit">Onartu</button>
                        <button type="button" id="itxiEditatuPopup">Itxi</button>
                    </form>
                </div>
            </div>

            <div class="tab-control">
                <img class="geziak" src="../img/flecha-izquierda.png" id="previous" onclick="paginarEkipamendua(-1)" />
                <span id="page-number">1</span> / <span id="total-pages">-</span>
                <img class="geziak" src="../img/flecha-derecha.png" id="next" onclick="paginarEkipamendua(1)" />
            </div>
        </div>


        <!-- SCRIPT -->
        <script src="../js/ekipamendua.js"></script>

        <!-- FOOTER -->
        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>
</body>

</html>
