if (!sessionStorage.getItem("authenticated")) {
    window.location.href = "/index.html"; // Redirect to login if not authenticated
} else {
        const menuItems = document.querySelectorAll('.menu-item');
        const taskCategories = document.querySelectorAll('.task-category');
        const profileCard = document.querySelector('.profile-card');
        const statsAchievements = document.querySelector('.stats-achievements');
        const friendsSection = document.querySelector('.friends');
        const main2 = document.querySelector('.main2');
        const taskButtons = document.querySelectorAll('.task button');
        const taskDetailsSection = document.getElementById('taskDetails');
        const taskDescription = document.getElementById('taskDescription');
        const questSection = document.querySelector('.quests-section'); // Get the quest section element
        const learnMenu = document.getElementById('learnMenu'); // Learn menu item
        const questMenu = document.getElementById('questMenu'); // Quest menu item
        
        document.querySelector('.menu-item.active').classList.remove('active');
        menuItems[3].classList.add('active');
        
        const taskDescriptions = {
            "Task 1": "Use public transport for all your daily commutes this week",
            "Task 2": "Coordinate a cleanup event in a local area ",
            "Suggested Task 1": "Coordinate a cleanup event in a local area ",
            "Suggested Task 2": "Reduce 3-5% of monthly electricity consumption"
        };
        
        function showContent(menuIndex) {
            // Hide all sections by default
            taskCategories.forEach(taskCategory => taskCategory.style.display = 'none');
            profileCard.style.display = 'none';
            statsAchievements.style.display = 'none';
            friendsSection.style.display = 'none';
            main2.style.display = 'none';
            taskDetailsSection.style.display = 'none';
            questSection.style.display = 'none'; // Hide quest section by default
            document.getElementById('userManual').style.display = 'none'; // Hide user manual by default
            document.getElementById('qr-scanner').style.display = 'none'; // Hide QR scanner by default
            document.getElementById('image-uploader').style.display = 'none';
        
            // Display content based on the selected menu item
            if (menuIndex === 0) {
        
                document.getElementById('userManual').style.display = 'block'; // Show user manual when Learn is clicked
                console.log('Learn Section clicked');
            } else if (menuIndex === 1) {
                main2.style.display = 'block';
                console.log('Leaderboards Section clicked');
                fetchLeaderboardData();
            } else if (menuIndex === 2) {
                questSection.style.display = 'block'; // Show quest section when Quests menu is clicked
                console.log('Quests Section clicked');
            } else if (menuIndex === 3) {
                taskCategories.forEach(taskCategory => taskCategory.style.display = 'block');
            } else if (menuIndex === 4) {
                document.getElementById('qr-scanner').style.display = 'block';
                document.getElementById('image-uploader').style.display = 'block';
                console.log('Redeem Section clicked');
            } else if (menuIndex === 5) {
                profileCard.style.display = 'block';
                statsAchievements.style.display = 'block';
                friendsSection.style.display = 'block';
            } else if (menuIndex === 6) {
                console.log('More Section clicked');
            }
        }
        
        menuItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                item.classList.add('active');
                showContent(index);
            });
        });
        
        function setStatus(statusIcon) {
            const currentStatus = document.getElementById('currentStatus');
            currentStatus.textContent = `Your Status: ${statusIcon}`;
            currentStatus.classList.add('status-updated');
        
            setTimeout(() => {
                currentStatus.classList.remove('status-updated');
            }, 300);
        }
        
        function handleTaskButtonClick(taskName) {
            console.log(`Button clicked: ${taskName}`);
        }
        
        taskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                handleTaskButtonClick(button.textContent);
            });
        });
        
        function handleTaskButtonClick(taskName) {
            if (menuItems[3].classList.contains('active')) {
                taskDescription.textContent = taskDescriptions[taskName] || "No details available for this task.";
                taskDetailsSection.style.display = 'block';
            }
        }
        
        taskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                handleTaskButtonClick(button.textContent);
            });
        });
        async function fetchLeaderboardData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/leaderboard');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                populateLeaderboard(data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                // Show error message to user
                document.getElementById('leaderboard-content').innerHTML = 
                    '<p class="error-message">Unable to load leaderboard. Please try again later.</p>';
            }
        }
        // Populate leaderboard section with data received from backend
        function populateLeaderboard(data) {
            const leaderboardContainer = document.querySelector('.leaderboard');
            leaderboardContainer.innerHTML = ''; // Clear existing leaderboard
        
            data.forEach((entry, index) => {
                const leaderDiv = document.createElement('div');
                leaderDiv.className = 'leader animate';
                if (index === 4) leaderDiv.classList.add('current-user'); // Highlight current user if needed
        
                leaderDiv.innerHTML = `
                    <span class="rank">${index + 1}</span>
                    <span class="name">${entry.name}</span>
                    <span class="xp">${entry.xp} XP</span>
                `;
        
                leaderboardContainer.appendChild(leaderDiv);
            });
        }
        // Initialize with the content for the "Tasks" menu
        showContent(3);
        // QR Code Scanner Logic
        const qrInput = document.getElementById('qr-input');
        qrInput.addEventListener('change', function () {
            const file = qrInput.files[0];
            if (file) {
                // Initialize QR Code scanner logic here
                // You can use a library such as html5-qrcode to process the QR code scan
                const reader = new FileReader();
                reader.onload = function (e) {
                    const image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        // Process the image (e.g., use a library to scan for QR codes)
                        console.log('QR Code scanned successfully!');
                        setTimeout(() => {
                            alert('Task Verified');
                        }, 2000); // 2 seconds delay for the verification message
                    };
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Image Upload Logic
        const imageInput = document.getElementById('image-input');
        const preview = document.getElementById('preview');
        imageInput.addEventListener('change', function () {
            const file = imageInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result; // Set the preview image
                    setTimeout(() => {
                        alert('Task Verified');
                    }, 2000); // 2 seconds delay for the verification message
                };
                reader.readAsDataURL(file);
            }
        });
}
