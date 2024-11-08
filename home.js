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

    // Display content based on the selected menu item
    if (menuIndex === 0) {

        document.getElementById('userManual').style.display = 'block'; // Show user manual when Learn is clicked
        console.log('Learn Section clicked');
    } else if (menuIndex === 1) {
        main2.style.display = 'block';
        console.log('Leaderboards Section clicked');
    } else if (menuIndex === 2) {
        questSection.style.display = 'block'; // Show quest section when Quests menu is clicked
        console.log('Quests Section clicked');
    } else if (menuIndex === 3) {
        taskCategories.forEach(taskCategory => taskCategory.style.display = 'block');
    } else if (menuIndex === 4) {
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

// Initialize with the content for the "Tasks" menu
showContent(3);