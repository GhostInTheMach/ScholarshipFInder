<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the database connection file
require 'db.php';

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