// Function to highlight the selected sidebar menu item
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
});

// Function to simulate starting a lesson
function startLesson() {
    alert('Starting lesson...');
}

// Function to simulate opening the guidebook
function showGuidebook() {
    alert('Opening guidebook...');
}

// Function to simulate starting a free trial
function startTrial() {
    alert('Starting free trial!');
}

// Function to simulate viewing the leaderboards
function goToLeaderboards() {
    alert('Redirecting to leaderboards...');
}

// Function to simulate viewing all quests
function viewAllQuests() {
    alert('Viewing all quests...');
}
