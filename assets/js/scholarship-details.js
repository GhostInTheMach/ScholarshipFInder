document.addEventListener('DOMContentLoaded', () => {
    // Get scholarship ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const scholarshipId = urlParams.get('id');

    if (scholarshipId) {
        loadScholarshipDetails(scholarshipId);
    } else {
        window.location.href = '/pages/scholarships.html';
    }

    setupEventListeners();
});

async function loadScholarshipDetails(id) {
    try {
        // This would be an API call in production
        const scholarship = await getScholarshipDetails(id);
        updateUI(scholarship);
        initializeCountdown(scholarship.deadline);
    } catch (error) {
        console.error('Error loading scholarship details:', error);
        // Handle error state
    }
}

function updateUI(scholarship) {
    // Update basic information
    document.getElementById('scholarshipName').textContent = scholarship.title;
    document.getElementById('scholarshipTitle').textContent = scholarship.title;
    document.getElementById('providerName').textContent = scholarship.provider;
    document.getElementById('amount').textContent = scholarship.amount;
    document.getElementById('deadline').textContent = formatDate(scholarship.deadline);
    document.getElementById('deadlineFull').textContent = formatDate(scholarship.deadline, true);
    document.getElementById('level').textContent = scholarship.level;
    document.getElementById('description').textContent = scholarship.description;
    document.getElementById('awardType').textContent = scholarship.awardType;
    document.getElementById('location').textContent = scholarship.location;
    document.getElementById('fieldOfStudy').textContent = scholarship.fieldOfStudy;

    // Update eligibility list
    const eligibilityList = document.getElementById('eligibilityList');
    eligibilityList.innerHTML = scholarship.eligibility
        .map(item => `<li>${item}</li>`)
        .join('');

    // Update application steps
    const applicationSteps = document.getElementById('applicationSteps');
    applicationSteps.innerHTML = scholarship.applicationSteps
        .map((step, index) => `
            <div class="step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">${step}</div>
            </div>
        `)
        .join('');

    // Update required documents
    const documentsList = document.getElementById('documentsList');
    documentsList.innerHTML = scholarship.requiredDocuments
        .map(doc => `<li>${doc}</li>`)
        .join('');
}

function initializeCountdown(deadlineDate) {
    const countdown = document.getElementById('countdown');
    const deadline = new Date(deadlineDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = deadline - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-value">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = '<div class="expired">Application Closed</div>';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

function setupEventListeners() {
    document.getElementById('applyButton').addEventListener('click', handleApply);
    document.getElementById('saveButton').addEventListener('click', handleSave);
}

function handleApply() {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        window.location.href = '/pages/login.html';
        return;
    }
    // Handle application process
}

function handleSave() {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        window.location.href = '/pages/login.html';
        return;
    }
    // Handle saving scholarship
}

// Helper functions
function formatDate(dateString, full = false) {
    const options = full 
        ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function isUserLoggedIn() {
    // Replace with actual authentication check
    return false;
}

// Mock API function
async function getScholarshipDetails(id) {
    return {
        id: id,
        title: "Academic Excellence Scholarship 2024",
        provider: "Global Education Foundation",
        amount: "$10,000",
        deadline: "2024-06-30",
        level: "Undergraduate",
        description: "The Academic Excellence Scholarship is awarded to outstanding students who have demonstrated exceptional academic achievement and leadership potential...",
        awardType: "Merit-based",
        location: "Worldwide",
        fieldOfStudy: "All Fields",
        eligibility: [
            "Minimum GPA of 3.5",
            "Currently enrolled undergraduate student",
            "Demonstrated leadership experience",
            "Strong academic recommendations"
        ],
        applicationSteps: [
            "Complete the online application form",
            "Submit academic transcripts",
            "Provide two letters of recommendation",
            "Write a personal statement (500 words)",
            "Submit proof of enrollment"
        ],
        requiredDocuments: [
            "Official academic transcripts",
            "Letters of recommendation",
            "Personal statement",
            "Resume/CV",
            "Proof of enrollment",
            "Financial need documentation (if applicable)"
        ]
    };
} 