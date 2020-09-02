<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from reg where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $conn->query("insert reg values(null,'$username','$password',NOW())");
    header("location:http://localhost/gelikongtiao/src/html/login.html");
    // echo '<script>location.href="http://localhost/phpmysql/gelishangcheng/login.html"</script>';
}
