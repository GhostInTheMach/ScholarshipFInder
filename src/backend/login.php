<?php

// Include the database connection file
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Fetch user from the database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();


    // Check if user exists and verify the password
    if ($user && password_verify($password, $user['password'])) {
        // Password is correct, start a session
        session_start();
        $_SESSION['user_id'] = $user['id'];
        echo "Login successful!";
        // Redirect to dashboard or another page
    } else {
        echo "Invalid email or password.";
    }
}
?> 