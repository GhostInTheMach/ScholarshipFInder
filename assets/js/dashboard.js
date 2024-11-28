document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
    loadUserData();
});

function initializeDashboard() {
    // Load initial data
    loadRecentActivity();
    loadApplications();
    loadSavedScholarships();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
}

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
        }
    });
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    const activities = [
        {
            type: 'application',
            description: 'Submitted application for Academic Excellence Scholarship',
            date: '2024-03-15'
        },
        {
            type: 'save',
            description: 'Saved STEM Innovation Scholarship',
            date: '2024-03-14'
        },
        // Add more activities
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <p>${activity.description}</p>
            <small>${new Date(activity.date).toLocaleDateString()}</small>
        </div>
    `).join('');
}

function loadApplications() {
    const applicationsList = document.getElementById('applicationsList');
    const applications = [
        {
            title: 'Academic Excellence Scholarship',
            status: 'Under Review',
            deadline: '2024-06-30',
            progress: 75
        },
        //will be modified later to handle dynamic cards 
    ];

    applicationsList.innerHTML = applications.map(app => `
        <div class="application-card">
            <h3>${app.title}</h3>
            <p class="status ${app.status.toLowerCase().replace(' ', '-')}">${app.status}</p>
            <p>Deadline: ${new Date(app.deadline).toLocaleDateString()}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${app.progress}%"></div>
            </div>
        </div>
    `).join('');
}

function loadSavedScholarships() {
    const savedList = document.getElementById('savedScholarshipsList');
    const saved = [
        {
            title: 'STEM Innovation Scholarship',
            amount: '$10,000',
            deadline: '2024-07-15'
        },
        // will be added later to handle dynamic saved scholarships
    ];

    savedList.innerHTML = saved.map(scholarship => `
        <div class="scholarship-card">
            <h3>${scholarship.title}</h3>
            <p>Amount: ${scholarship.amount}</p>
            <p>Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}</p>
            <button class="btn-primary">Apply Now</button>
        </div>
    `).join('');
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        education: document.getElementById('profileEducation').value
    };

    try {
        // This would be an API call in production
        await updateProfile(formData);
        alert('Profile updated successfully!');
    } catch (error) {
        alert('Error updating profile');
    }
}

function handleLogout() {
    // Clear session/local storage
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/pages/login.html';
}

// Mock API functions
async function updateProfile(data) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ success: true }), 1000);
    });
}

function loadUserData() {
    // This would typically fetch user data from an API
    const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        education: 'Undergraduate'
    };

    document.getElementById('userName').textContent = userData.name;
    document.getElementById('profileName').value = userData.name;
    document.getElementById('profileEmail').value = userData.email;
    document.getElementById('profileEducation').value = userData.education;
} 