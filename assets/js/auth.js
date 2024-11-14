document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');

    try {
        // Basic validation
        if (!email || !password) {
            throw new Error('Please fill in all fields');
        }

        // This would typically be an API call
        // For now, we'll simulate a successful login
        await simulateApiCall({ email, password });
        
        // Redirect to dashboard on success
        window.location.href = '/pages/dashboard.html';
    } catch (error) {
        errorElement.textContent = error.message;
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('signupError');

    try {
        // Validation
        if (!fullName || !email || !password || !confirmPassword) {
            throw new Error('Please fill in all fields');
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        if (password.length < 8 || !/\d/.test(password)) {
            throw new Error('Password must be at least 8 characters and contain a number');
        }

        // This would typically be an API call
        await simulateApiCall({ fullName, email, password });
        
        // Redirect to dashboard on success
        window.location.href = '/pages/dashboard.html';
    } catch (error) {
        errorElement.textContent = error.message;
    }
}

// Simulate API call (remove this in production)
function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate API validation
            if (data.email === 'test@example.com') {
                reject(new Error('Email already exists'));
            } else {
                resolve({ success: true });
            }
        }, 1000);
    });
} 