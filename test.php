<?php
$mysqli = new mysqli('localhost', 'root', '', 'mybase');
?>
<?php
$mysqli = @new mysqli('localhost', 'root', '', 'mybase');
if (mysqli_connect_errno()) {
    echo "Подключение невозможно: " . mysqli_connect_error();
}
?>
<?php
$mysqli = @new mysqli('localhost', 'root', '', 'mybase');
if (mysqli_connect_errno()) {
    echo "Подключение невозможно: " . mysqli_connect_error();
}
$mysqli->close();
?>