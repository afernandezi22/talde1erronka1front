<!DOCTYPE html>
<html lang="eu">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/styles.css" />
    <link rel="icon" href="../img/favicon2.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../img/favicon2.ico" type="image/x-icon" />
    <title>Login</title>
</head>

<body>
    <div class="container">
        <!-- LOGIN -->
        <div class="content">
            <h1 class="loginTitle">Login</h1>

            <form id="loginForm">
                <label><b>Erabiltzailea:</b></label>
                <input id="erabil" type="text" name="erabil"><br><br>
                <label><b>Pasahitza:</b></label>
                <input id="pass" type="password" name="pass"><br><br>

                <button id="bidali" type="button" name="bidali">Bidali</button>
                <div id="erantzuna"></div>
                
            </form>

        </div>

        <script src="../js/login.js"></script>

        <!-- FOOTER -->
        <div class="footer">
            <iframe src="footer.php" width="100%" height="70px" frameborder="0"></iframe>
        </div>
    </div>
</body>
</html>