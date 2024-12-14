<?php
$servername = "localhost"; // Replace with your server
$username = "root";        // Your MySQL username
$password = "";            // Your MySQL password
$database = "scholarship_db"; // Your database name

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);
    // Set the character set to avoid charset issues
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    // Log the error (optional) and display a friendly message
    error_log($e->getMessage()); // Logs to server error log
    die("Database connection failed. Please try again later."); // User-friendly message
}
?>
