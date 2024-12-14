-- Create the database
DROP DATABASE IF EXISTS scholarship_finder;
CREATE DATABASE scholarship_finder;
USE scholarship_finder;

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('student', 'provider', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student profiles table
CREATE TABLE student_profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    education_level VARCHAR(50) NOT NULL,
    gpa DECIMAL(3,2),
    field_of_study VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Provider profiles table
CREATE TABLE provider_profiles (
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_type VARCHAR(100),
    website VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Scholarships table
CREATE TABLE scholarships (
    scholarship_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES provider_profiles(provider_id)
);

-- Scholarship requirements table
CREATE TABLE scholarship_requirements (
    requirement_id INT PRIMARY KEY AUTO_INCREMENT,
    scholarship_id INT NOT NULL,
    min_gpa DECIMAL(3,2),
    required_documents TEXT,
    education_level VARCHAR(50),
    field_of_study VARCHAR(100),
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(scholarship_id)
);

-- Applications table
CREATE TABLE applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    scholarship_id INT NOT NULL,
    student_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(scholarship_id),
    FOREIGN KEY (student_id) REFERENCES student_profiles(profile_id)
);

-- Application documents table
CREATE TABLE application_documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(application_id)
);

-- Saved scholarships table (for favorite scholarships feature)
CREATE TABLE saved_scholarships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    scholarship_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_profiles(profile_id),
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(scholarship_id)
);

-- Notifications table
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_scholarship_deadline ON scholarships(deadline);
CREATE INDEX idx_application_status ON applications(status);
