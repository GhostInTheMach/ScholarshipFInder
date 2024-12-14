<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include the database connection
    include '../src/backend/db.php';

    // Ensure $conn is defined
    if (!isset($conn) || $conn->connect_error) {
        die("Database connection error: " . $conn->connect_error);
    }

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            header("Location: dashboard.php");
            exit;
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "User not found.";
    }

    $stmt->close();
    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ScholarQuest</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/login.css">
</head>
<body>
<header class="header">
    <div class="header-content">
        <div class="header-left">
            <a href="/" class="logo">
                <span class="brand-name">ScholarQuest</span>
            </a>
        </div>
    </div>
</header>

<div class="login-container">
    <div class="login-form-container">
        <h1>Login</h1>
        <button class="google-login">Login with Google</button>
        <div class="divider"><span>or Login with Email</span></div>

        <form action="" method="POST">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input">
                    <input type="password" id="password" name="password" required>
                    <button type="button" class="toggle-password"></button>
                </div>
            </div>

            <?php if (isset($error)): ?>
                <div class="form-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <a href="#" class="forgot-password">Forgot your password?</a>
            <button type="submit" class="login-button">Login</button>
        </form>

        <p class="signup-prompt">
            Don't have an account? <a href="signup.html">Sign up</a>
        </p>
    </div>

    <div class="benefits-container">
        <h2>3 REASONS TO LOVE SCHOLARQUEST</h2>
        <div class="benefit-items">
            <!-- Benefit content remains the same -->
        </div>
    </div>
</div>

<footer class="footer">
    <!-- Footer content remains the same -->
</footer>
</body>
</html>
