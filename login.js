// Dummy user data storage using localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let generatedOTP = null; // For OTP validation

// Generate OTP
function generateOTP() {
  const phone = document.getElementById("register-phone").value;
  
  if (phone.length !== 10 || isNaN(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Generate a 4-digit OTP (for demonstration only)
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  alert(`Your OTP is: ${generatedOTP}`);
}

// Register a new user
function register() {
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

  // Check if username already exists
  if (users[username]) {
    alert("Username already exists.");
    return;
  }

  // Save user data
  users[username] = { password, phone, tasks: 0, points: 0, achievements: [], rewards: [] };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please log in.");
  showLoginForm();
}

// Log in the user
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const role = document.getElementById("login-role").value;

  if (users[username] && users[username].password === password) {
    currentUser = username;
    loadProfile();
  } else {
    alert("Invalid credentials or role.");
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
