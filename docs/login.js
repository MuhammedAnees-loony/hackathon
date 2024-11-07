
// Dummy user data storage using localStorage (only used temporarily until backend is connected)
const users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let generatedOTP = 1001; // For OTP validation

// Generate OTP
async function generateOTP() {
    const phone = document.getElementById("register-phone").value;
  
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
  
    // Send phone number to backend to generate OTP
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone_number: phone })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        generatedOTP = result.otp;  // Store the OTP returned by backend
        alert(`Your OTP is: ${generatedOTP}`);
      } else {
        alert(result.error || "OTP generation failed.");
      }
    } catch (error) {
      console.error("Error during OTP generation:", error);
      alert("An error occurred while generating OTP. Please try again.");
    }
  }
  

// Register a new user
async function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const phone = document.getElementById("register-phone").value;
  const role = document.getElementById("register-role").value;
  const enteredOTP = document.getElementById("register-otp").value;

  if (role === "") {
    alert("Please select a role.");
    return;
  }

  // Check if the OTP matches
  if (enteredOTP != generatedOTP) {
    alert("Invalid OTP. Please try again.");
    return;
  }

  // Prepare data to send to backend
  const userData = { username, password, phonenumber: phone, role };

  try {
    // Send data to backend
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert("Registration successful! Please log in.");
      showLoginForm();
    } else {
      alert(result.error || "Registration failed.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again.");
  }
}

// Log in the user
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const role = document.getElementById("login-role").value;

  // Prepare login data
  const loginData = { username, password, role };

  try {
    // Send login data to backend
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok) {
      currentUser = username;
      alert("Login successful!");
      
      window.location.href = "home.html";
    } else {
      alert(result.error || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
}

// Show login form
function showLoginForm() {
  document.getElementById("register-form").classList.remove("active");
  document.getElementById("login-form").classList.add("active");
}

// Show register form
function showRegisterForm() {
  document.getElementById("login-form").classList.remove("active");
  document.getElementById("register-form").classList.add("active");
}

// Log out the user
function logout() {
  currentUser = null;
  document.getElementById("profile-page").classList.remove("active");
  showLoginForm();
}
