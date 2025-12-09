// register.js

// --- CONFIGURATION ---
// !!! IMPORTANT: REPLACE THIS WITH YOUR ACTUAL C# API BASE URL !!!
const API_BASE_URL = 'https://YOUR-SNACKBAR-API.com/api'; // Example: 'https://localhost:7000/api'
const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`; // Assuming your C# register endpoint is /auth/register

// --- DOM ELEMENTS ---
const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

/**
 * Handles the registration form submission and communicates with the backend.
 * @param {Event} e - The form submission event.
 */
async function handleRegister(e) {
    e.preventDefault(); // Stop the default form submission

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("Error: Passwords do not match.");
        return;
    }
    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const registerData = {
        name: name,
        email: email,
        password: password,
        // Include any other required fields for your C# RegisterRequest (e.g., role)
    };

    try {
        const response = await fetch(REGISTER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            // Registration successful (e.g., HTTP 201 Created)
            const result = await response.json();
            
            alert("Registration Successful! You can now log in.");
            console.log("Registration Response:", result);

            // Redirect the user to the login page after success
            window.location.href = 'login.html'; 

        } else if (response.status === 409) {
            // Conflict (e.g., user already exists)
             alert("Registration failed: A user with this email already exists.");
        } else {
            // Other errors
            const errorText = await response.text();
            alert(`Registration failed (${response.status}): ${errorText || "Server error."}`);
            console.error("Registration API Error:", response.status, errorText);
        }

    } catch (error) {
        // Network errors
        alert("A network error occurred. Please check your connection or API URL.");
        console.error("Network Error during registration:", error);
    }
}

// Attach the event listener to the form
registerForm.addEventListener('submit', handleRegister);