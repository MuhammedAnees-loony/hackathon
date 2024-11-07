from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db
import hashlib
import time
import random
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Initialize Firebase with the Service Account Key
cred = credentials.Certificate("questgram-85ee9-firebase-adminsdk-adyge-ef3132d330.json")  # Replace with your JSON file path
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://questgram-85ee9-default-rtdb.asia-southeast1.firebasedatabase.app/'  # Replace with your Firebase Database URL
})

# Hash function for storing passwords securely
def hash_password(password):
    hashed = hashlib.sha256(password.encode()).hexdigest()
    print(f"[DEBUG] Hashed password: {hashed}")
    return hashed
def generate_otp():
    otp = random.randint(100000, 999999)
    return otp
otp_store = {}
# Route to register a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get JSON payload from client
    print(f"[DEBUG] Received registration data: {data}")
    
    username = data.get('username')
    password = data.get('password')
    phonenumber = data.get('phonenumber')
    role = data.get('role')
    
    if not username or not password or not phonenumber or not role:
        print("[ERROR] Missing required fields")
        return jsonify({"error": "All fields are required"}), 400

    # Reference to the "Credentials" table in Firebase
    credentials_ref = db.reference('credentials')
    
    # Check if the username already exists
    if credentials_ref.child(username).get():
        print(f"[ERROR] Username '{username}' already exists")
        return jsonify({"error": "Username already exists"}), 409
    
    # Save user data with hashed password
    user_data = {
        "username": username,
        "password": hash_password(password),
        "phonenumber": phonenumber,
        "role": role
    }
    credentials_ref.child(username).set(user_data)
    print(f"[DEBUG] User '{username}' registered successfully with data: {user_data}")
    
    return jsonify({"message": "User registered successfully"}), 200
@app.route('/generate-otp', methods=['POST'])
def generate_otp_route():
    data = request.json
    print(f"Received data for OTP generation: {data}")  # Log incoming data for OTP generation

    phone_number = data.get('phone_number')

    if not phone_number:
        return jsonify({"error": "Phone number is required!"}), 400

    # Generate OTP
    otp = generate_otp()

    # Store OTP with a timestamp (for expiration handling)
    otp_store[phone_number] = {'otp': otp, 'timestamp': time.time()}

    # In a real scenario, send the OTP via SMS service like Twilio or an email service.
    print(f"Generated OTP for {phone_number}: {otp}")  # For testing purposes

    return jsonify({"otp": otp, "message": f"OTP generated for phone number {phone_number}"}), 200


# Route to login a user
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON payload from client
    print(f"[DEBUG] Received login data: {data}")
    
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    
    if not username or not password or not role:
        print("[ERROR] Missing required fields")
        return jsonify({"error": "All fields are required"}), 400
    
    # Reference to the entire "Credentials" table in Firebase
    credentials_ref = db.reference('credentials')
    all_users = credentials_ref.get()  # Fetch the whole credentials table
    print(f"[DEBUG] Retrieved all user data from Firebase: {all_users}")

    # Iterate through all users to find a match
    for user in all_users.values():
        if user['username'] == username and user['password'] == hash_password(password) and user['role'] == role:
            print(f"[DEBUG] Login successful for user: {username}")
            return jsonify({"message": "Login successful"}), 200
    
    print("[ERROR] Invalid username, password, or role")
    return jsonify({"error": "Invalid username, password, or role"}), 401
# Main entry point
if __name__ == '__main__':
    app.run(debug=True)  
