
// Select all menu items and task categories
const menuItems = document.querySelectorAll('.menu-item');
const taskCategories = document.querySelectorAll('.task-category');
const profileCard = document.querySelector('.profile-card');
const statsAchievements = document.querySelector('.stats-achievements');
const friendsSection = document.querySelector('.friends');

// Set the default active menu item (Tasks)
document.querySelector('.menu-item.active').classList.remove('active');
menuItems[3].classList.add('active'); // "Tasks" menu-item is the 4th item (index 3)

// Function to show corresponding content based on active menu item
function showContent(menuIndex) {
    // Hide all sections
    taskCategories.forEach(taskCategory => taskCategory.style.display = 'none');
    profileCard.style.display = 'none';
    statsAchievements.style.display = 'none';
    friendsSection.style.display = 'none';
    
    // Show the corresponding content
    if (menuIndex === 0) {
        // Show Learn Section
        console.log('Learn Section clicked');
    } else if (menuIndex === 1) {
        // Show Leaderboards Section
        console.log('Leaderboards Section clicked');
    } else if (menuIndex === 2) {
        // Show Quests Section
        console.log('Quests Section clicked');
    } else if (menuIndex === 3) {
        // Show Tasks Section (default)
        taskCategories.forEach(taskCategory => taskCategory.style.display = 'block');
    } else if (menuIndex === 4) {
        // Show Redeem Section
        console.log('Redeem Section clicked');
    } else if (menuIndex === 5) {
        // Show Profile Section
        profileCard.style.display = 'block';
        statsAchievements.style.display = 'block';
        friendsSection.style.display = 'block';
    } else if (menuIndex === 6) {
        // Show More Section
        console.log('More Section clicked');
    }
}

// Add event listeners to menu items
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items
        menuItems.forEach(menuItem => menuItem.classList.remove('active'));
        // Add active class to the clicked menu item
        item.classList.add('active');
        
        // Show corresponding content based on menu item clicked
        showContent(index);
    });
});

// Initially show the content for "Tasks"
showContent(3);
