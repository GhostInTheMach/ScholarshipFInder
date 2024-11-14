// Sample scholarship data (would typically come from a backend)
const scholarships = [
    {
        id: 1,
        title: "Academic Excellence Scholarship",
        amount: "$5,000",
        deadline: "2024-06-30",
        category: "academic",
        location: "domestic",
        description: "For students with outstanding academic achievements"
    },
    // More scholarship entries would go here
];

function createScholarshipCard(scholarship) {
    return `
        <div class="scholarship-card">
            <h3>${scholarship.title}</h3>
            <div class="scholarship-info">
                <p><strong>Amount:</strong> ${scholarship.amount}</p>
                <p><strong>Deadline:</strong> ${new Date(scholarship.deadline).toLocaleDateString()}</p>
                <p>${scholarship.description}</p>
            </div>
            <div class="card-actions">
                <button class="btn-primary" onclick="viewDetails(${scholarship.id})">
                    View Details
                </button>
                <button class="btn-secondary" onclick="saveScholarship(${scholarship.id})">
                    Save
                </button>
            </div>
        </div>
    `;
}

function filterScholarships() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;

    const filtered = scholarships.filter(scholarship => {
        const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm) ||
                            scholarship.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || scholarship.category === category;
        const matchesLocation = !location || scholarship.location === location;
        
        return matchesSearch && matchesCategory && matchesLocation;
    });

    displayScholarships(filtered);
}

function displayScholarships(scholarshipsToShow) {
    const grid = document.getElementById('scholarshipsGrid');
    grid.innerHTML = scholarshipsToShow.map(createScholarshipCard).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayScholarships(scholarships);
    
    document.getElementById('searchInput').addEventListener('input', filterScholarships);
    document.getElementById('categoryFilter').addEventListener('change', filterScholarships);
    document.getElementById('locationFilter').addEventListener('change', filterScholarships);
});

function viewDetails(id) {
    window.location.href = `/pages/details.html?id=${id}`;
}

function saveScholarship(id) {
    // This would typically interact with a backend
    alert('Please log in to save scholarships');
} 