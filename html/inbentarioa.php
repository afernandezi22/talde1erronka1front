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
            <h1>INBENTARIOA</h1>

            <!-- <div class="botoiak">
                <iframe src="botoiak.html" width="100%" height="120px" frameborder="0"></iframe>
            </div> -->

            <div class="botoiak">
                <form action="">
                    <button type="submit"><i class="fa-solid fa-circle-plus"></i></button>
                    <button type="submit"><i class="fa-solid fa-pencil"></i></button>
                    <button type="submit"><i class="fa-solid fa-trash"></i></button>
                    <select name="bilaketa" id="bilaketa">
                        <option value="etiketa">Etiketa</option>
                        <option value="idEkipamendu">Ekipameduaren ID</option>
                        <option value="erosketaData">Erosketa Data</option>
                    </select>
                    <input type="text" placeholder="Bilatu...">
                    <button class="lupa" type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>

            <table id="inbentarioaTable">
                <tr>
                    <th></th>
                    <th>Etiketa</th>
                    <th>ID Ekipamendu</th>
                    <th>Erosketa Data</th>
                </tr>

                <tbody id="showDataInbentarioa"></tbody>

            </table>

            <div class="tab-control">
                <img src="../img/flecha-izquierda.png" id="previous" onclick="paginar(-1, 'inbentarioaTable')" />
                <span id="page-number">1</span> / <span id="total-pages">-</span>
                <img src="../img/flecha-derecha.png" id="next" onclick="paginar(1, 'inbentarioaTable')" />
            </div>
        </div>

        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script src="../js/viewTables.js"></script>
    <script src="../js/inbentarioa.js"></script>
</body>

</html>
