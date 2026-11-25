# SKILLORA AI — Complete Project Audit & Implementation Status Report

**Target Platform:** SKILLORA AI — Intelligent Academia–Industry Career Collaboration Platform  
**Problem Statement ID:** SIH26044 | **Category:** Software | **Theme:** Smart Automation  
**Team:** BYTE SQUAD (Team ID: SIH-EGTKXT)  
**Audit Date:** November 25, 2026  
**Auditor:** Senior Software Architect, Full-Stack Developer & AI/ML Systems Engineer  
**Workspace Root:** `C:\Users\M. VIGNESH RAHUL\.gemini\antigravity\scratch\skillora-ai`

---

## 1. Project Structure Audit

### 1.1 Complete Project Folder Tree
```text
skillora-ai/
├── .env                                  # Root env (DATABASE_URL configured)
├── .gitignore                            # Standard Python & Node ignores
├── README.md                             # Quick start guide & high-level architecture
├── Skillora_Demo_Resume.pdf              # Demo resume artifact for ATS testing
├── builder.py                            # Standalone scratch script (1 line)
├── write_file_b64.py                     # Utility base64 file writer
├── scripts/                              # Empty directory
├── ai/                                   # AI / RAG & Matching Module
│   ├── __init__.py
│   ├── knowledge_base/                   # 21 JSON domain documents
│   │   ├── career_roles/                 # (10 JSON files: ai_ml, backend, cloud, etc.)
│   │   ├── certifications/               # (5 JSON files: aws, cka, meta, comptia, etc.)
│   │   ├── courses/                      # Course catalogs
│   │   ├── industry_requirements/        # (4 JSON files: ai, cloud, security, etc.)
│   │   ├── internship_descriptions/      # Internship profiles
│   │   └── job_descriptions/             # Job specifications
│   ├── matching/
│   │   ├── ranking.py                    # Re-export of RankingEngine
│   │   └── student_matcher.py            # Set-intersection student-to-job matching
│   ├── rag/
│   │   ├── chunker.py                    # Word-based text chunker (300 words, 40 overlap)
│   │   ├── document_processor.py         # PyPDF2 text extraction & JSON reader
│   │   ├── embeddings.py                 # Scikit-learn TfidfVectorizer (NOT neural)
│   │   ├── generator.py                  # Gemini 2.5 Flash API caller + rule-based fallback
│   │   ├── rag_pipeline.py               # Central coordinator singleton
│   │   ├── retriever.py                  # Dot-product vector search wrapper
│   │   └── vector_store.py               # In-memory NumPy cosine similarity index
│   ├── recommendation/
│   │   ├── career_recommender.py         # Career & learning path wrappers
│   │   ├── job_recommender.py            # Re-export
│   │   └── learning_recommender.py       # Re-export
│   ├── resume/
│   │   └── parser.py                     # Resume file reader calling RAG pipeline
│   └── skill_analysis/
│       ├── gap_analyzer.py               # Skill gap analysis wrappers
│       └── skill_analyzer.py             # Re-export
├── backend/                              # FastAPI REST Backend
│   ├── .env                              # Backend-specific environment configuration
│   ├── config.py                         # Pydantic Settings (paths, JWT, DB URLs)
│   ├── main.py                           # FastAPI application entrypoint & CORS
│   ├── requirements.txt                  # Python dependencies
│   ├── schemas.py                        # Pydantic v2 validation models
│   ├── security.py                       # bcrypt password hashing, JWT encoding/decoding, RBAC
│   ├── seed.py                           # Database seed script (demo users, courses, jobs)
│   ├── setup_postgres.py                 # PostgreSQL connection & table initializer
│   ├── skillora.db                       # SQLite fallback database
│   ├── database/
│   │   ├── __init__.py
│   │   ├── connection.py                 # SQLAlchemy engine with SQLite fallback
│   │   └── database.py                   # Re-exports connection symbols
│   ├── models/                           # SQLAlchemy ORM Models (29 DB tables)
│   │   ├── __init__.py
│   │   ├── academician.py                # Academician, ResearchProject, Mentorship, Consultancy
│   │   ├── common.py                     # Notification, Document
│   │   ├── industry.py                   # Industry, Job, Internship, JobApplication, Interview, FacultyTraining
│   │   ├── institution.py                # Institution, StudentSkillAnalytics, PlacementAnalytics, CurriculumFeedback
│   │   ├── student.py                    # Student, StudentSkill, SkillAssessment, AssessmentQuestion, Course, etc.
│   │   └── user.py                       # User model, RoleEnum
│   ├── routes/                           # 12 APIRouter Modules (59 total endpoints)
│   │   ├── __init__.py
│   │   ├── academician.py                # Faculty profiles, research, sabbaticals
│   │   ├── ai.py                         # RAG analysis endpoints (gap, match, curriculum)
│   │   ├── analytics.py                  # Institutional, placement & skill demand metrics
│   │   ├── assessment.py                 # Questions, submission, history
│   │   ├── auth.py                       # Register, login, me
│   │   ├── courses.py                    # Course catalog, enrollment, progress tracking
│   │   ├── industry.py                   # Company profile, jobs, internships, candidate search
│   │   ├── institution.py                # College profile, student roster, partners
│   │   ├── internships.py                # Internship search, application pipeline
│   │   ├── jobs.py                       # Job search, application pipeline
│   │   ├── resume.py                     # Resume PDF upload & parsing
│   │   └── students.py                   # Student profile, skills, daily challenges
│   └── uploads/                          # Upload directory for uploaded resumes
└── frontend/                             # React 18 + Vite SPA Frontend
    ├── index.html                        # HTML entry
    ├── package.json                      # NPM dependencies & scripts
    ├── vite.config.js                    # Vite configuration with `/api` reverse proxy
    ├── dist/                             # Compiled production bundle
    └── src/
        ├── App.jsx                       # React Router v6 route manifest
        ├── index.css                     # Tailwind CSS v4 directives
        ├── main.jsx                      # React 18 createRoot bootstrap
        ├── theme.js                      # Dead/Orphaned Material-UI theme file
        ├── components/                   # Reusable UI components
        │   ├── Layout.jsx                # Unified sidebar, navbar, responsive container
        │   ├── RoleLogo.jsx              # Quad-stakeholder SVG logos
        │   ├── StatCard.jsx              # Metric tile component
        │   ├── WorkflowBanner.jsx        # Step progression indicator
        │   ├── academician/              # ResearchCard, TrainingCard
        │   ├── common/                   # Dead/Orphaned legacy components (Sidebar, Navbar, Modal, etc.)
        │   ├── industry/                 # ApplicantCard
        │   ├── institution/              # PlacementChart, SkillDemandChart, StudentTable
        │   └── student/                  # CourseCard, InternshipCard, JobCard, ProfileCard, SkillCard
        ├── pages/                        # Views & Dashboards
        │   ├── LandingPage.jsx           # Public home page
        │   ├── Login.jsx                 # Public role-based login
        │   ├── LoginPage.jsx             # Duplicate orphaned login page
        │   ├── academician/              # 10 pages (Dashboard, FDPTraining, Research, Collaborations, etc.)
        │   ├── company/                  # 4 routed pages (Dashboard, PostJob, CandidateSearch, Applications)
        │   ├── industry/                 # 13 unrouted/orphaned pages (IndustryDashboard, CreateJob, etc.)
        │   ├── institution/              # 11 pages (Dashboard, StudentAnalytics, PlacementTracker, etc.)
        │   └── student/                  # 21 pages (Dashboard, ResumeAnalyzer, SkillAssessment, etc.)
        └── services/                     # Axios API communication layers
            ├── api.js                    # Base Axios instance with Bearer JWT interceptor
            ├── academicianService.js
            ├── aiService.js
            ├── authService.js
            ├── industryService.js
            ├── institutionService.js
            └── studentService.js
```

### 1.2 Purpose of Important Folders & Components
* **`ai/rag/`**: Implements an in-memory Retrieval-Augmented Generation (RAG) system. Indexes 21 JSON documents via scikit-learn `TfidfVectorizer`, performs dot-product cosine similarity ranking, and interfaces with Gemini Flash (`gemini-2.5-flash`) via `google-genai` with a deterministic rule-based fallback.
* **`backend/models/`**: Defines 29 SQLAlchemy declarative models representing users, stakeholders, jobs, applications, assessments, courses, and curriculum analytics.
* **`backend/routes/`**: Exposes 59 REST API endpoints across 12 domain routers under `/api/v1`.
* **`backend/database/`**: Configures the PostgreSQL database connection pool on `localhost:5432/skillora`, with an automatic fallback to SQLite (`skillora.db`) if unreachable.
* **`frontend/src/pages/`**: Hosts React views and dashboards for all four stakeholder roles.

### 1.3 Identification of Duplicated or Orphaned Files
1. **Industry vs. Company Split (Critical Disconnect):**
   * Two separate industry directories exist: `frontend/src/pages/company/` (4 files) and `frontend/src/pages/industry/` (13 files).
   * `frontend/src/App.jsx` routes exclusively to `pages/company/`. The 13 fully developed pages in `pages/industry/` (`IndustryDashboard.jsx`, `CreateJob.jsx`, `CreateInternship.jsx`, `ManageJobs.jsx`, `ManageInternships.jsx`, `StudentSearch.jsx`, `Interview.jsx`, `FacultyTraining.jsx`, `IndustryProfile.jsx`) are **unrouted dead code**.
2. **Duplicate/Orphaned Views Across Roles:**
   * **Student:** `student/Dashboard.jsx` is routed; `student/StudentDashboard.jsx` is orphaned. `student/ResumeAnalyzer.jsx` is routed; `student/ResumeUpload.jsx` is orphaned. `student/ApplicationTracker.jsx` is routed; `student/JobApplications.jsx` is orphaned. `student/Courses.jsx`, `student/Certifications.jsx`, `student/Projects.jsx`, `student/DailyChallenges.jsx`, and `student/StudentProfile.jsx` are not routed in `App.jsx`.
   * **Institution:** `institution/Dashboard.jsx` is routed; `institution/InstitutionDashboard.jsx` is orphaned. `CurriculumModification.jsx` (the highlighted Board of Studies feature) is **not routed** in `App.jsx`.
   * **Academician:** `academician/Dashboard.jsx` is routed; `academician/AcademicianDashboard.jsx` is orphaned. `academician/Research.jsx` is routed; `academician/ResearchProjects.jsx` is orphaned. `academician/Collaborations.jsx` is routed; `academician/Collaboration.jsx` is orphaned.
   * **Auth:** Both `Login.jsx` and `LoginPage.jsx` exist; only `Login.jsx` is wired to routes.
3. **Dead Code Importing Uninstalled Packages:**
   * `frontend/src/components/common/Sidebar.jsx` and `frontend/src/theme.js` import from `@mui/material`. `@mui/material` is not installed in `package.json`. These files are unused legacy code; if imported into active modules, they would break compilation.
   * `components/common/UnifiedLayout.jsx` and `components/common/Navbar.jsx` are superseded by `components/Layout.jsx`.
4. **Root Scratch Scripts:**
   * `builder.py` and `write_file_b64.py` are leftover scratch scripts.

---

## 2. Frontend Audit

### 2.1 Existing Pages & Component Coverage
A modern, dark-theme UI with responsive sidebars and role-specific color accents covers all four stakeholders in `frontend/src/components/Layout.jsx`:
* **Student:** Dashboard, Resume AI, Skill Assessment, Skill Gap, Career AI, Jobs & Internships, Applications, Learning Path, Portfolio.
* **Company / Industry:** Dashboard, Post Job / Intern, Candidate Search, Applications.
* **Academician:** Dashboard, FDP & Training, Research, Collaborations.
* **Institution:** Dashboard, Student Analytics, Placement Tracker, Industry Demand.

### 2.2 Navigation and Routing Status
* **Router:** `react-router-dom` v6 is configured in `frontend/src/App.jsx`.
* **Sidebar:** Built into `Layout.jsx` with full route switching.
* **Demo Switcher:** `DemoAccountSwitcher.jsx` on the top bar enables instant role switching for demonstrations.

### 2.3 Live Backend API vs. Static/Mock Data Discrepancy
While the UI is visually polished, the majority of frontend views render **hardcoded static mock data arrays** rather than consuming the 59 available backend endpoints:

| Frontend View / Component | Data Source in Code | Specific Code Reference |
|---|---|---|
| **Student Dashboard** | **Static Fallback (Broken API)** | Calls non-existent `/students/dashboard` (`Dashboard.jsx:16`), catches 404 silently, and displays hardcoded numbers: 74% readiness, 14 skills, 9 matches. |
| **Resume Analyzer** | **Live API + Default Mock** | Connected to `POST /api/v1/resume/upload` (`ResumeAnalyzer.jsx:30`). Functional end-to-end. |
| **Skill Assessment** | **Static Questions + Broken Submit** | Questions are hardcoded in the component (`SkillAssessment.jsx:6-35`). Does not call `GET /assessment/questions`. The submit payload fails FastAPI validation (422 error). |
| **Skill Gap Analysis** | **100% Static Mock Data** | Hardcoded `RADAR_DATA` and `GAPS` arrays (`SkillGap.jsx:13-50`). Does not call `POST /api/v1/ai/skill-gap`. |
| **Career Recommendations** | **100% Static Mock Data** | Hardcoded `RECOMMENDATIONS` array (`CareerRec.jsx:5-33`). Does not call `POST /api/v1/ai/recommend-career`. |
| **Job Matching** | **100% Static Mock Data** | Hardcoded `JOBS` array (`JobMatching.jsx:5-50`). Does not call `GET /api/v1/jobs` or `POST /api/v1/ai/match-job`. |
| **Learning Path** | **100% Static Mock Data** | Hardcoded `PHASES` array (`LearningPath.jsx:5-40`). Does not call `GET /api/v1/courses` or `POST /api/v1/ai/recommend-courses`. |
| **Portfolio** | **100% Static Mock Data** | Hardcoded `profile` object for "Aarav Sharma" (`Portfolio.jsx:6-31`). Does not call `GET /api/v1/students/me`. |
| **Company Dashboard** | **100% Static Mock Data** | Zero API calls. Hardcoded stats (`6`, `142`, `28`, `3`) and job listings (`Company/Dashboard.jsx:68-115`). |
| **Company Candidate Search** | **100% Static Mock Data** | Hardcoded `CANDIDATES` array of 4 students (`CandidateSearch.jsx:4-40`). Does not call `GET /api/v1/industry/students/search`. |
| **Company Applications** | **100% Static Mock Data** | Hardcoded `APPLICANTS` array (`Applications.jsx:4-9`). Does not call `GET /api/v1/industry/applications`. |
| **Company Post Job** | **Cosmetic Only (No API call)** | `handleSubmit` only executes `setSuccess(true)` (`PostJob.jsx:21-24`). Does not call `POST /api/v1/industry/jobs`. |
| **Institution Dashboard** | **100% Static Mock Data** | Hardcoded `TREND_DATA` and stats (`institution/Dashboard.jsx:8-138`). Does not call `/api/v1/analytics/institution`. |
| **Institution Student Roster** | **100% Static Mock Data** | Hardcoded `STUDENTS` array of 5 students (`StudentAnalytics.jsx:4-10`). Does not call `GET /api/v1/institution/students`. |
| **Institution Demand / RAG** | **Broken Endpoint + Static Fallback** | Calls `/api/v1/ai/curriculum` which 404s (`IndustryDemand.jsx:19`); the `catch` block renders hardcoded curriculum strings. |
| **Academician Views (All)** | **100% Static Mock Data** | `Dashboard.jsx`, `FDPTraining.jsx`, `Research.jsx`, and `Collaborations.jsx` all use hardcoded arrays (`FDPTraining.jsx:4-32`, `Research.jsx:4-23`, `Collaborations.jsx:4-8`). Zero API consumption. |

### 2.4 UI Errors and Broken Components
1. **Assessment Submission Schema Mismatch (422 Error):** In `SkillAssessment.jsx:55`:
   ```javascript
   API.post('/assessment/submit', { answers: selected, score: finalPct }).catch(() => {});
   ```
   FastAPI's `AssessmentSubmission` (`schemas.py:62-65`) requires `title: str` and `category: str`. The request fails validation and is rejected; the assessment is never recorded in PostgreSQL.
2. **Missing Backend Route in Student Dashboard (404 Error):** In `Dashboard.jsx:16`, the frontend requests `/api/v1/students/dashboard`. No such route exists in `backend/routes/students.py`.
3. **Mismatched Curriculum Route in Institution Portal (404 Error):** In `IndustryDemand.jsx:19`, the frontend posts to `/api/v1/ai/curriculum`. The actual FastAPI route in `backend/routes/ai.py:98` is `/api/v1/ai/curriculum-insights`.

---

## 3. Backend Audit

### 3.1 FastAPI Configuration
* Configured in `backend/main.py:29-33`.
* Table creation on startup: `Base.metadata.create_all(bind=engine)` runs automatically.
* Upload directory mounted at `/uploads` via `StaticFiles`.
* Interactive OpenAPI documentation operates at `http://localhost:8000/docs`.

### 3.2 Endpoint Inventory (59 Endpoints)
The backend registers 59 endpoints across 12 modules:
* **Authentication (`/api/v1/auth`):** `POST /register`, `POST /login`, `GET /me`.
* **Students (`/api/v1/students`):** `GET /me`, `PUT /me`, `GET /skills`, `POST /skills`, `DELETE /skills/{id}`, `GET /projects`, `POST /projects`, `GET /certifications`, `POST /certifications`, `GET /daily-challenges`, `POST /daily-challenges/{id}/complete`.
* **Resume (`/api/v1/resume`):** `POST /upload`, `GET /my-resume`.
* **Skill Assessment (`/api/v1/assessment`):** `GET /questions`, `POST /submit`, `GET /history`.
* **Courses (`/api/v1/courses`):** `GET /`, `GET /{id}`, `POST /{id}/enroll`, `PUT /{id}/progress`, `GET /my-courses/enrolled`.
* **Jobs (`/api/v1/jobs`):** `GET /`, `GET /{id}`, `POST /{id}/apply`, `GET /my-applications/list`.
* **Internships (`/api/v1/internships`):** `GET /`, `GET /{id}`, `POST /{id}/apply`, `GET /my-applications/list`.
* **Industry (`/api/v1/industry`):** `GET /profile`, `PUT /profile`, `GET /jobs`, `POST /jobs`, `GET /internships`, `POST /internships`, `GET /applications`, `PUT /applications/{id}/status`, `GET /interviews`, `POST /interviews`, `GET /training`, `POST /training`, `GET /students/search`.
* **Institution (`/api/v1/institution`):** `GET /profile`, `GET /students`, `GET /departments`, `GET /partners`, `POST /curriculum-feedback`.
* **Academician (`/api/v1/academician`):** `GET /profile`, `PUT /profile`, `GET /opportunities`, `GET /research`, `POST /research`, `GET /mentorships`, `GET /consultancy`.
* **Analytics (`/api/v1/analytics`):** `GET /institution`, `GET /placement`, `GET /skill-demand`.
* **AI Engine (`/api/v1/ai`):** `POST /analyze-student`, `POST /analyze-resume`, `POST /skill-gap`, `POST /recommend-career`, `POST /recommend-courses`, `POST /match-job`, `POST /match-internship`, `POST /curriculum-insights`.

### 3.3 Functional Status of Backend Endpoints
* **Functional when tested with Swagger/curl:** All Auth, Student CRUD, Course CRUD, Job/Internship posting and applying, and Resume Upload endpoints execute without crash when provided with valid JSON bodies matching Pydantic schemas.
* **Database persistence:** Data posted to functional endpoints is persisted to PostgreSQL.

### 3.4 Authentication & Authorization Assessment
* **Password Hashing:** Implemented with `bcrypt.hashpw` with a random salt in `backend/security.py:23-25`.
* **JWT Implementation:** Implemented using `jose.jwt` (HS256). Expiry set to 7 days (`config.py:16`).
* **Role-Based Access Control (RBAC):** `require_roles(allowed_roles)` helper exists in `backend/security.py:58-66`. **However, it is not used in route handlers.** Route endpoints either call `get_current_user` without checking the role, or omit authentication dependencies entirely.

---

## 4. PostgreSQL Database Audit

### 4.1 Connection Verification
* **PostgreSQL Server:** Active and verified on `localhost:5432`.
* **Database Name:** `skillora`
* **Connection String:** Configured in `backend/.env`.
* **Engine Verification:** Verified via live SQLAlchemy engine inspection:
  ```text
  Engine URL: postgresql://postgres:***@localhost:5432/skillora
  ```
* **Fallback Mechanism:** `backend/database/connection.py:19-23` automatically catches connection failures and falls back to SQLite (`skillora.db`).

### 4.2 Database Schema & Existing Tables (29 Tables)
All 29 tables are created in PostgreSQL:
1. `users`
2. `students`
3. `student_skills`
4. `assessment_questions`
5. `skill_assessments`
6. `assessment_results`
7. `courses`
8. `course_progress`
9. `certifications`
10. `projects`
11. `resumes`
12. `daily_challenges`
13. `industries`
14. `jobs`
15. `job_applications`
16. `internships`
17. `internship_applications`
18. `interviews`
19. `faculty_trainings`
20. `institutions`
21. `student_skill_analytics`
22. `placement_analytics`
23. `curriculum_feedbacks`
24. `academicians`
25. `research_projects`
26. `mentorship_programs`
27. `consultancy_opportunities`
28. `notifications`
29. `documents`

### 4.3 Missing Foreign Keys & Relationship Flaws
1. **No Foreign Key Linking Student to Institution:**
   * In `backend/models/student.py:12`, the college is stored as a plain text string:
     ```python
     institution_name = Column(String(255), default="National Institute of Technology")
     ```
   * There is **no `institution_id = ForeignKey('institutions.id')`**.
2. **Missing Academician Foreign Keys:**
   * In `backend/models/academician.py`, `MentorshipProgram` has `faculty_name = Column(String(100))` instead of a foreign key to `academicians.id`.
   * `ConsultancyOpportunity` has `industry_partner = Column(String(255))` instead of a foreign key to `industries.id`.
3. **JSON Strings Instead of Normalized Tables:**
   * `Student.top_skills`, `Student.missing_skills`, `Job.required_skills`, `Job.preferred_skills`, `Project.tech_stack`, and `Course.syllabus` are stored as serialized JSON strings in `Text` columns rather than normalized relational tables or PostgreSQL `JSONB` with GIN indexes.

---

## 5. AI/ML Implementation Audit — In-Depth Analysis

### 5.1 Is a real pre-trained AI model used?
* **Local Neural Models:** **NO**. No pre-trained neural network (BERT, RoBERTa, Sentence-BERT, DeBERTa) is downloaded or running locally.
* **External LLM:** **YES (Optional)**. Google's `gemini-2.5-flash` model is integrated via the `google-genai` SDK in `ai/rag/generator.py:15-16`. However, because `GEMINI_API_KEY` is empty by default in `.env`, it defaults to the offline fallback synthesizer.

### 5.2 Are Sentence Transformers, spaCy, or scikit-learn used?
* **scikit-learn:** **YES**. Used for `TfidfVectorizer` in `ai/rag/embeddings.py:2`.
* **spaCy:** **NO**. Not imported in any source file, not present in `requirements.txt`.
* **Sentence Transformers:** **NO**. Not imported, not present in `requirements.txt`.

### 5.3 Is skill extraction implemented using AI or rule-based code?
* **Implementation:** **Pure rule-based Python substring matching**.
* In `ai/rag/rag_pipeline.py:66-74`, skill extraction consists of a hardcoded list of 22 keyword strings:
  ```python
  known_skills = [
      "Python", "Java", "C++", "JavaScript", "TypeScript", "React", "Node.js", "Express",
      "SQL", "PostgreSQL", "MongoDB", "Linux", "Docker", "Kubernetes", "AWS", "Git",
      "TensorFlow", "PyTorch", "HTML", "CSS", "Tailwind", "Machine Learning", "FastAPI"
  ]
  found_skills = [s for s in known_skills if s.lower() in resume_text.lower()]
  if not found_skills:
      found_skills = ["Python", "SQL", "Git"]
  ```
* No Named Entity Recognition (NER), token classification, or contextual parsing is performed.

### 5.4 Is RAG implemented?
* **Architecture:** Custom in-memory TF-IDF RAG pipeline.
  * **Corpus:** 21 JSON files in `ai/knowledge_base/` containing job roles, requirements, courses, and certifications.
  * **Chunking:** Handled by `ai/rag/chunker.py:8-25` (word-based chunking with 40-word overlap).
  * **Vector Store:** In-memory NumPy dot-product index in `ai/rag/vector_store.py:24-25`. No external vector database (pgvector, Qdrant, ChromaDB, FAISS) is used.
  * **Retrieval:** Cosine dot product on normalized TF-IDF term vectors.
  * **Generation:** Calls Gemini Flash if an API key is present; otherwise executes `_synthesize_deterministic_rag` in `ai/rag/generator.py:85-158`, which uses dictionary lookups.

### 5.5 Is semantic matching implemented?
* True dense semantic vector matching is **not present**. Matching is based on **TF-IDF n-gram overlap** or **Jaccard set-intersection**:
  * In `ai/matching/student_matcher.py:15-16`:
    ```python
    overlap = set(s.lower() for s in skills).intersection(set(r.lower() for r in required_skills))
    score = (len(overlap) / max(len(required_skills), 1)) * 100
    ```
  * Synonyms or related skills (e.g., PyTorch vs. TensorFlow) receive zero credit unless both strings match lexically.

### 5.6 Is confidence scoring implemented?
* **Methodology:** Basic percentage ratio: `(matched_count / required_count) * 100`. There is no multi-factor Bayesian probability, confidence interval, or calibrated uncertainty scoring.

### 5.7 Is explainable skill-gap analysis implemented?
* **Methodology:** Templated string formatting in `ai/rag/generator.py:143-149`:
  ```python
  explanation = (
      f"Based on retrieved competency frameworks for '{target_role}', candidates require strong command "
      f"over {', '.join([s.title() for s in expected_skills[:4]])}. "
      f"You have demonstrated strong alignment in: {', '.join(matched_display) if matched_display else 'Foundational concepts'}. "
      f"To achieve placement readiness, prioritize closing the critical gaps in: {', '.join(gaps[:3])}."
  )
  ```

### 5.8 Are recommendations generated using real logic or hardcoded values?
* In the offline mode, recommendations are generated by interpolating missing skill strings into hardcoded sentence templates:
  ```python
  for gap in gaps[:3]:
      recs.append(f"Complete hands-on laboratory modules and projects for {gap}")
  ```

### 5.9 Is there any model training or fine-tuning?
* **NONE**. There are no training pipelines, loss functions, datasets, checkpoints, or fine-tuning scripts in the repository.

### 5.10 Hardware Requirements
* **RAM:** < 500 MB RAM (the in-memory TF-IDF matrix for 21 JSON files is under 2 MB).
* **Compute:** Standard low-end CPU (runs on any basic dual-core cloud instance).
* **GPU:** Zero GPU requirement.

---

## 6. Core Feature Audit Matrix

| Feature | Audit Status | Code Reference / Finding |
|---|---|---|
| **Student registration and login** | **Fully implemented and tested** | Working end-to-end via `backend/routes/auth.py:15-100`. Returns JWT and creates profile. |
| **Faculty registration and login** | **Fully implemented and tested** | Supported in `auth.py`; auto-initializes `Academician` profile record. |
| **Institution registration and login** | **Fully implemented and tested** | Supported in `auth.py`; auto-initializes `Institution` profile record. |
| **Industry registration and login** | **Fully implemented and tested** | Supported in `auth.py`; auto-initializes `Industry` profile record. |
| **Role-based dashboards** | **UI only / static data** | Pages exist with high-quality design, but use static data or fail silently on 404s. |
| **Resume upload** | **Fully implemented and tested** | PDF upload, text extraction with PyPDF2, and parsing work in `backend/routes/resume.py:14-80`. |
| **Certificate upload** | **Partially implemented** | Backend model and endpoints exist (`/api/v1/students/certifications`), but the routed frontend UI lacks an upload form. |
| **Project evidence upload** | **Partially implemented** | Backend model and endpoints exist (`/api/v1/students/projects`), but routed frontend page is static. |
| **Assessment module** | **Partially implemented** | 20 seeded MCQs exist in DB; frontend has 4 hardcoded questions; submit payload triggers 422 error. |
| **Skill extraction** | **Partially implemented** | Implemented as 22-keyword regex matching in `ai/rag/rag_pipeline.py:66-73`. No NLP/NER model. |
| **Evidence-Based Skill Graph** | **Not implemented** | No Neo4j, NetworkX, or graph data structures exist. Skills are flat strings. |
| **Skill verification** | **Not implemented** | Skills extracted from resumes are automatically hardcoded as `verified=True` (`backend/routes/resume.py:42`). No actual verification logic exists. |
| **Verified Competency Passport** | **UI only / static data** | Rendered as hardcoded static cards in `frontend/src/pages/student/Portfolio.jsx`. |
| **Confidence scoring** | **Partially implemented** | Simple ratio calculation `(len(matched) / total_req) * 100`. |
| **Industry requirement matching** | **Implemented but not tested** | Implemented in backend `backend/routes/jobs.py:72`; frontend uses static mock job cards. |
| **Explainable match score** | **Partially implemented** | Generates templated text strings explaining matched skills and gaps. |
| **Individual skill-gap analysis** | **Partially implemented** | Backend logic functional in `ai/rag/rag_pipeline.py:92`; frontend displays static mock radar chart. |
| **Institution-level skill-gap analytics**| **UI only / static data** | Frontend renders hardcoded static charts; backend endpoint returns mock JSON. |
| **Learning recommendations** | **Partially implemented** | Backend recommends templated text; frontend renders static phases. |
| **Internship & job opportunities** | **Implemented but not tested** | Functional backend CRUD endpoints; frontend company pages are static mock lists. |
| **Faculty development (FDP)** | **Partially implemented** | Backend model `FacultyTraining` exists; frontend pages are static mock data. |
| **Industry talent discovery** | **Partially implemented** | Backend endpoint `GET /industry/students/search` works; frontend renders static table. |
| **What-if skill simulator** | **Not implemented** | No interactive what-if simulation logic or UI exists in the repository. |

---

## 7. Security and Multi-Tenant Architecture

### 7.1 Cross-College Data Leakage (Critical Multi-Tenancy Vulnerability)
* In `backend/routes/institution.py:25-45`:
  ```python
  @router.get("/students")
  def list_institution_students(db: Session = Depends(get_db)):
      students = db.query(Student).all()
  ```
  * **No Authentication Required:** Unauthenticated requests can query this endpoint.
  * **Zero Tenant Isolation:** Returns **all** student records across all institutions, exposing full names, emails, CGPAs, roll numbers, and readiness scores.
  * Any registered college administrator can view every student from rival colleges.

### 7.2 Insecure File Upload & Path Traversal Risk
* In `backend/routes/resume.py:15-24`:
  * **No File Type or Extension Whitelist:** Accepts any uploaded file extension (`.exe`, `.sh`, `.php`, `.bat`).
  * **No File Size Limit:** An attacker could upload arbitrarily large files, causing disk exhaustion.
  * **Path Concatenation:** `file_path = settings.UPLOAD_DIR / f"resume_{student.id}_{file.filename}"`. If `file.filename` contains `../` sequences, it could write outside `UPLOAD_DIR`.

### 7.3 Insecure CORS Middleware
* In `backend/main.py:38-41`:
  ```python
  allow_origins=["*"],
  allow_credentials=True,
  ```
  Configuring wildcard origin `*` together with `allow_credentials=True` violates the CORS specification and exposes credentials to cross-origin abuse.

### 7.4 Hardcoded Plaintext Secrets in Tracked Files
* Root `.env` and `backend/.env` contain plaintext database credentials.
* In `backend/config.py:14`, `SECRET_KEY` falls back to a hardcoded default string (`"skillora_super_secret_jwt_key_sih26044_byte_squad"`).

---

## 8. Testing and Deployment Audit

### 8.1 Automated Test Suites
* **Unit Tests / Integration Tests:** **ZERO**. There is not a single test file (`test_*.py`, `*_test.py`, `*.spec.js`, `*.test.jsx`) anywhere in the repository.
* **Test Runners:** Neither `pytest` nor `vitest` is installed or configured.

### 8.2 Frontend Build Status
* Executed command: `npm run build` in `frontend/`.
* **Result:** **PASSED CLEANLY** in 8.23 seconds.
* Output: `dist/index.html` (0.98 kB), `dist/assets/index-DdE9MNvA.css` (40.87 kB), `dist/assets/index-B6KxxDHq.js` (777.64 kB). No syntax or bundling errors.

### 8.3 Backend Startup Status
* Executed command: `python -c "from backend.main import app"`.
* **Result:** **PASSED**. App imports cleanly with 59 registered OpenAPI routes.
* **Working Directory Dependency Issue:** If launched outside the project root, `ai/rag/rag_pipeline.py:25` outputs `Knowledge base directory ai\knowledge_base does not exist.` because it relies on a relative path instead of `settings.KNOWLEDGE_BASE_DIR`.

### 8.4 Docker & Cloud Readiness
* **Docker:** **NOT CONFIGURED**. There is no `Dockerfile` or `docker-compose.yml` in the project.
* **Google Cloud:** **NOT CONFIGURED**. There are no Cloud Run manifests, App Engine configs (`app.yaml`), or Cloud Build pipelines (`cloudbuild.yaml`).

---

## 9. Final Project Status Report

### A. Project Overview
SKILLORA AI is designed as a quad-stakeholder career collaboration ecosystem for SIH26044 (Smart Automation). The project features a functional backend with 59 REST endpoints, an active PostgreSQL database with 29 tables, and a styled React 18 frontend. However, there is a disconnect between the frontend and backend: while the backend has database persistence and a lightweight custom TF-IDF RAG pipeline, the majority of frontend dashboards currently render static mock data.

### B. Existing Project Architecture
* **Frontend:** React 18, Vite 5, Tailwind CSS v4, Recharts, Lucide Icons. (Ant Design and Material-UI are not present in active dependencies).
* **Backend:** FastAPI, Pydantic v2, SQLAlchemy 2.0, bcrypt, python-jose.
* **Database:** PostgreSQL (active on localhost:5432, 29 tables) with an automatic fallback to SQLite (`skillora.db`).
* **AI/RAG:** Custom TF-IDF vectorizer (scikit-learn) + in-memory NumPy dot-product similarity search over 21 JSON documents, with an external Gemini Flash API integration and an offline rule-based fallback.

### C. Completed Features
1. **User Authentication & Authorization Engine:** User registration, password hashing (bcrypt), and JWT access tokens for Student, Industry, Institution, and Academician roles.
2. **PostgreSQL Relational Schema:** 29 functional tables supporting students, jobs, applications, assessments, courses, and analytics.
3. **Resume PDF Parsing & ATS Scoring Pipeline:** Full end-to-end integration from frontend file upload to PyPDF2 text extraction, skill matching, and database storage.
4. **Interactive Demo Role Switcher:** Navbar switcher enabling instant UI role switching for presentation purposes.
5. **FastAPI OpenAPI Route Coverage:** 59 endpoints implemented across 12 domain routers.
6. **Frontend Production Build:** Vite bundle compiles cleanly with zero JSX or styling syntax errors.

### D. Partially Completed Features
1. **Adaptive Skill Assessment Module:** Backend question bank and scoring are implemented, but the frontend uses hardcoded questions and sends a payload that triggers a 422 schema validation error.
2. **AI Skill Extraction:** Functional, but implemented via a 22-keyword regex array rather than an NLP/NER model.
3. **Student-to-Opportunity Matching:** Implemented in the backend via Jaccard set intersection; the frontend currently displays static mock listings.
4. **Explainable AI Skill-Gap Analysis:** Implemented using templated string formatting over TF-IDF search results; frontend charts use hardcoded data.
5. **Course Enrollment & Progress Tracking:** Functional backend API endpoints exist, but corresponding UI views are not wired into the main application routes.

### E. Features Not Yet Implemented
1. **Evidence-Based Skill Graph:** No graph database (Neo4j) or network ontology (NetworkX) exists.
2. **Formal Skill Verification:** Skills are hardcoded as `verified=True` upon extraction; no DigiLocker, academic credential, or GitHub AST verification logic exists.
3. **Interactive What-If Skill Simulator:** No logic or UI exists for simulating the impact of acquiring specific skills on match percentages.
4. **Multi-Tenant College Data Isolation:** Colleges lack tenant separation; any user can read all student records across all institutions.
5. **Automated Test Suites:** Zero unit, integration, or E2E tests exist.
6. **Containerization & Deployment:** No Dockerfiles, Docker Compose, or Cloud deployment configurations exist.

### F. Actual AI/ML Architecture
* **Embedding Model:** Scikit-learn's `TfidfVectorizer(ngram_range=(1,2), max_features=5000, sublinear_tf=True)` (`ai/rag/embeddings.py:7-12`).
* **Vector Store:** In-memory NumPy dot-product matrix multiplication (`ai/rag/vector_store.py:25`).
* **LLM Engine:** Google Gemini Flash API (`gemini-2.5-flash`) via `google-genai` SDK (`ai/rag/generator.py:16`), falling back to dictionary lookup rules if no API key is provided.
* **Skill Extraction:** Python substring check over 22 hardcoded tech strings (`ai/rag/rag_pipeline.py:66-73`).
* **Match Scoring:** Set intersection count divided by required skills count (`ai/matching/student_matcher.py:16`).

### G. Actual Database Architecture
* **Database Management System:** PostgreSQL on port 5432 with automatic SQLite fallback.
* **Tables (29):** Full relational schema covering all core entities.
* **Key Relational Gaps:** `Student` lacks an `institution_id` foreign key (uses plain text string); `MentorshipProgram` and `ConsultancyOpportunity` lack foreign keys; array attributes are stored as serialized JSON strings rather than normalized tables or native JSONB.

### H. Security and Multi-Tenancy Status
* **Authentication:** Implemented using bcrypt and JWT.
* **Tenant Isolation:** **Missing**. Cross-college data leakage exists on `GET /api/v1/institution/students`.
* **File Upload Security:** Lacks extension whitelisting, MIME validation, and size restrictions.
* **CORS:** Uses `allow_origins=["*"]` alongside `allow_credentials=True`.
* **Secrets Handling:** Plaintext credentials stored in version-controlled `.env` files.

### I. Errors and Technical Problems
1. **Frontend-Backend Integration Mismatches:**
   * `/students/dashboard` called by `Dashboard.jsx:16` does not exist (404).
   * `/ai/curriculum` called by `IndustryDemand.jsx:19` does not exist (404); actual route is `/ai/curriculum-insights`.
   * `/assessment/submit` called by `SkillAssessment.jsx:55` fails Pydantic validation (422) due to missing `title` and `category` fields.
2. **Unrouted Views in `App.jsx`:**
   * 13 views in `pages/industry/` are unrouted because `App.jsx` points to `pages/company/`.
   * `CurriculumModification.jsx` (the highlighted institutional feature) is unrouted.
3. **Relative Path Bug:**
   * `ai/rag/rag_pipeline.py:25` hardcodes `Path("ai/knowledge_base")`, which fails if the process is launched from outside the root directory.

### J. Missing Dependencies and Configuration
1. **Frontend Dependencies:**
   * `@mui/material` and `antd` are referenced in documentation and orphaned files (`Sidebar.jsx`, `theme.js`), but are not installed in `package.json`.
2. **Backend Dependencies:**
   * `spacy`, `sentence-transformers`, `torch`, `neo4j`, `networkx`, and `redis` are not installed or included in `requirements.txt`.
3. **Environment Configuration:**
   * `GEMINI_API_KEY` is empty by default, running the AI module in rule-based fallback mode.

### K. Cloud Deployment Readiness
* **Current Status:** **Not Ready for Cloud Deployment**.
* **Missing Assets:** No `Dockerfile`, no `docker-compose.yml`, no Nginx reverse proxy configuration, no CI/CD pipelines, and no Google Cloud deployment manifests.

### L. Top 10 Pending Tasks in Priority Order
1. **Resolve Route Discrepancies in `App.jsx`:** Route `pages/industry/` instead of `pages/company/`, and expose `CurriculumModification.jsx`.
2. **Fix API Integration Bugs:**
   * Add `GET /api/v1/students/dashboard` to `backend/routes/students.py`.
   * Align `POST /assessment/submit` payload in `SkillAssessment.jsx` with `AssessmentSubmission`.
   * Update `IndustryDemand.jsx` to call `/api/v1/ai/curriculum-insights`.
3. **Connect Frontend Dashboards to Live APIs:** Replace hardcoded static arrays in `StudentAnalytics.jsx`, `CandidateSearch.jsx`, `JobMatching.jsx`, `SkillGap.jsx`, and `Applications.jsx` with `API.get()` calls.
4. **Fix Multi-Tenancy Data Isolation:** Add `institution_id` to `Student`, require authentication on `GET /institution/students`, and filter by `current_user.institution_profile.id`.
5. **Secure the Resume Upload Endpoint:** Add extension whitelisting (`.pdf`), check file size limits (< 5MB), and sanitize filenames using `Path(file.filename).name`.
6. **Fix Knowledge Base Relative Path:** Update `ai/rag/rag_pipeline.py:25` to use `settings.KNOWLEDGE_BASE_DIR`.
7. **Clean Up Orphaned and Dead Code:** Remove orphaned files (`LoginPage.jsx`, `StudentDashboard.jsx`, `theme.js`, `Sidebar.jsx`, `builder.py`).
8. **Add Containerization:** Author a multi-stage `Dockerfile` for the FastAPI backend and React frontend, alongside a `docker-compose.yml` orchestrating PostgreSQL and the web services.
9. **Upgrade Skill Extraction NLP:** Replace the 22-keyword substring check with spaCy or a Hugging Face NER token classification model.
10. **Write Automated Smoke Tests:** Implement basic tests using `pytest` and `httpx` to validate auth, resume parsing, and matching routes.

### M. Recommended Development Roadmap
* **Milestone 1 — Critical Fixes & Wiring (Days 1–2):** Fix the 3 broken API endpoints (404/422), route the 13 `pages/industry/` components, and resolve the relative path issue in the RAG pipeline.
* **Milestone 2 — Full API-Frontend Integration (Days 3–5):** Replace static mock arrays across student, company, and institution dashboards with real API responses.
* **Milestone 3 — Security & Multi-Tenancy Hardening (Days 6–7):** Add `institution_id` foreign keys, enforce RBAC checks on institution and industry endpoints, and validate file uploads.
* **Milestone 4 — AI & Verification Enhancements (Days 8–10):** Integrate spaCy NER for skill extraction and implement external credential verification.
* **Milestone 5 — Containerization & CI/CD (Days 11–12):** Add `Dockerfile`, `docker-compose.yml`, and GitHub Actions pipelines for automated builds and deployment.

### N. Honest Overall Project Completion Estimate
* **Backend Architecture & Database:** **75% Complete** (Solid schema with 29 tables, PostgreSQL connectivity, and 59 working endpoints, though multi-tenancy filtering is absent).
* **AI / ML & RAG Engine:** **40% Complete** (Functional in-memory TF-IDF pipeline and optional Gemini integration, but skill extraction is rule-based and matching uses lexical overlap).
* **Frontend UI Design:** **85% Complete** (Modern layout, responsive components, and clean styling).
* **Frontend-Backend Integration:** **20% Complete** (Only resume upload and login are fully integrated; most pages display hardcoded mock data).
* **Security & Multi-Tenancy:** **30% Complete** (bcrypt and JWT are implemented, but cross-college data leaks and unrestricted file uploads remain).
* **DevOps & Testing:** **5% Complete** (Frontend builds cleanly, but there are zero tests, no Docker configuration, and no cloud manifests).
* **Overall Working Software Completion:** **~42% Production-Ready** (Strong presentation and UI layer with working backend services, requiring integration wiring, multi-tenant isolation, and deployment packaging).
