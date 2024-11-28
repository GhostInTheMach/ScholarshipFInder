<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the database connection file
require 'db.php';

try {
    // Create a new PDO instance for database connection
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection errors
    die("Database connection failed: " . $e->getMessage());
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data from POST request
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    // Hash the password for security
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Prepare SQL statement to insert user into the database
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
    // Execute the statement and check for success
    if ($stmt->execute([$fullName, $email, $password])) {
        // Redirect to login page after successful signup
        header("Location: /pages/login.html");
        exit();
    } else {
        // Output error message if registration fails
        echo "Error registering user: " . implode(", ", $stmt->errorInfo());
    }
}
?> 