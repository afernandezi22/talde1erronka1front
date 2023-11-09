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
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js"> -->

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
                    <button type="submit"><i class="fa-solid fa-circle-plus"></i></button>
                    <button type="submit"><i class="fa-solid fa-pencil"></i></button>
                    <button type="submit"><i class="fa-solid fa-trash"></i></button>
                    <select name="bilaketa" id="bilaketa">
                        <option value="id">ID zenbakia</option>
                        <option value="izena">Ekipoaren izena</option>
                        <option value="marka">marka</option>
                        <option value="modelo">Modeloa</option>
                        <option value="stock">Stock</option>
                        <option value="idKategoria">Kategoria ID</option>
                    </select>
                    <input type="text" placeholder="Bilatu...">
                    <button class="lupa" type="submit"><i class="fa fa-search"></i></button>
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
            </tr>

                <tbody id="showDataEkipamendua"></tbody>
            </table>

            <div class="tab-control">
                <img class="geziak" src="../img/flecha-izquierda.png" id="previous" onclick="paginar(-1, 'ekipamenduaTable')" />
                <span id="page-number">1</span> / <span id="total-pages">-</span>
                <img class="geziak" src="../img/flecha-derecha.png" id="next" onclick="paginar(1, 'ekipamenduaTable')" />
            </div>
        </div>

        <script src="../js/viewTables.js"></script>
        <script src="../js/ekipamendua.js"></script>

        <!-- FOOTER -->
        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>
</body>

</html>
