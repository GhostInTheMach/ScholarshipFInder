<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - ScholarQuest</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/auth.css">
</head>
<body>
    <nav class="navbar">
        <!-- Same navigation as index.html -->
    </nav>

    <main class="auth-container">
        <div class="auth-card">
            <h2>Create Account</h2>
            <p class="auth-subtitle">Join ScholarQuest to start your scholarship journey</p>

            <form action="signup.php" method="POST" id="signupForm" class="auth-form">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required placeholder="Full Name">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="Email">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required placeholder="Password">
                    <p class="password-requirements">
                        Password must be at least 8 characters long and include a number
                    </p>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm Password">
                </div>

                <div class="form-error" id="signupError"></div>

                <button type="submit" class="btn-primary btn-full">Create Account</button>
            </form>

            <div class="auth-footer">
                <p>Already have an account? <a href="login.html">Log in</a></p>
            </div>
        </div>
    </main>

    <script src="../assets/js/auth.js"></script>

    <?php
    // Include the database connection file
    require_once '../src/backend/db.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fullname = trim($_POST['fullName']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];

        // Validate password length
        if (strlen($password) < 8 || !preg_match('/\d/', $password)) {
            echo "<script>document.getElementById('signupError').innerText = 'Password must be at least 8 characters long and include a number.';</script>";
        } elseif ($password !== $confirmPassword) {
            echo "<script>document.getElementById('signupError').innerText = 'Passwords do not match.';</script>";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            try {
                $stmt = $pdo->prepare("INSERT INTO users (fullname, email, password) VALUES (:fullname, :email, :password)");
                $stmt->execute([
                    ':fullname' => $fullname,
                    ':email' => $email,
                    ':password' => $hashedPassword,
                ]);

                echo "<script>alert('Signup successful! Redirecting to login page.'); window.location.href='login.html';</script>";
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) { // Duplicate entry error (email already registered)
                    echo "<script>document.getElementById('signupError').innerText = 'Email is already registered.';</script>";
                } else {
                    echo "<script>document.getElementById('signupError').innerText = 'Error: " . $e->getMessage() . "';</script>";
                }
            }
        }
    }
    ?>
</body>
</html>
