// login.js

// --- CONFIGURATION ---
// !!! IMPORTANT: REPLACE THIS WITH YOUR ACTUAL C# API BASE URL !!!
const API_BASE_URL = 'https://YOUR-SNACKBAR-API.com/api'; // Example: 'https://localhost:7000/api'
const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;

// --- DOM ELEMENTS ---
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

/**
 * Handles the login form submission and communicates with the backend.
 * @param {Event} e - The form submission event.
 */
async function handleLogin(e) {
    e.preventDefault(); // Stop the default form submission (page reload)

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const loginData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            // Login successful (e.g., HTTP 200 OK)
            const result = await response.json();
            
            // --- Success Handling ---
            
            // 1. Store the JWT Token (Crucial for protected routes)
            // Assuming your C# API returns a JWT token in the response body (e.g., result.token)
            if (result && result.token) {
                localStorage.setItem('snocks_auth_token', result.token);
            }
            
            alert("Login Successful! Welcome back.");
            console.log("Login Response:", result);

            // Redirect to the main menu page
            window.location.href = 'index.html'; 

        } else if (response.status === 401) {
            // Unauthorized (Bad credentials)
            alert("Login failed: Incorrect email or password.");
        } else {
            // Other errors (400, 500, etc.)
            const errorText = await response.text();
            alert(`Login failed (${response.status}): ${errorText || "Server error."}`);
            console.error("Login API Error:", response.status, errorText);
        }

    } catch (error) {
        // Network errors
        alert("A network error occurred. Please check your connection or API URL.");
        console.error("Network Error during login:", error);
    }
}

// Attach the event listener to the form
loginForm.addEventListener('submit', handleLogin);