CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    college VARCHAR(200),
    department VARCHAR(150),
    graduation_year INTEGER
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS student_skills (
    student_id INTEGER REFERENCES students(id),
    skill_id INTEGER REFERENCES skills(id),
    level VARCHAR(50),
    PRIMARY KEY (student_id, skill_id)
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    required_skills TEXT
);

CREATE TABLE IF NOT EXISTS internships (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    required_skills TEXT
);

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    job_id INTEGER REFERENCES jobs(id),
    internship_id INTEGER REFERENCES internships(id),
    status VARCHAR(50) DEFAULT 'applied'
);
