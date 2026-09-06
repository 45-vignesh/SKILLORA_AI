import json
import random
from datetime import datetime
from backend.database.connection import SessionLocal, engine, Base
from backend.models.user import User, RoleEnum
from backend.models.student import (
    Student, StudentSkill, AssessmentQuestion, Course,
    Certification, Project, DailyChallenge
)
from backend.models.industry import (
    Industry, Job, JobApplication, Internship, InternshipApplication,
    Interview, FacultyTraining
)
from backend.models.institution import (
    Institution, StudentSkillAnalytics, PlacementAnalytics
)
from backend.models.academician import (
    Academician, ResearchProject, MentorshipProgram, ConsultancyOpportunity
)
from backend.models.common import Notification
from backend.security import get_password_hash

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("Seeding SKILLORA AI Database...")
    pwd = get_password_hash("password123")

    # 1. Users & Profiles for Each Role
    demo_users = [
        ("student@skillora.ai", "Aarav Sharma", RoleEnum.STUDENT.value),
        ("industry@skillora.ai", "Vikram Malhotra (TechNova Systems)", RoleEnum.INDUSTRY.value),
        ("institution@skillora.ai", "Dr. Rajesh Iyer (NIT)", RoleEnum.INSTITUTION.value),
        ("academician@skillora.ai", "Prof. Ananya Sen", RoleEnum.ACADEMICIAN.value),
        ("admin@skillora.ai", "Byte Squad Administrator", RoleEnum.ADMIN.value)
    ]
    created_demo_users = {}
    for email, name, role in demo_users:
        u = User(email=email, full_name=name, role=role, hashed_password=pwd)
        db.add(u)
        db.commit()
        db.refresh(u)
        created_demo_users[role] = u

    # Primary Student Profile
    primary_student = Student(
        user_id=created_demo_users[RoleEnum.STUDENT.value].id,
        roll_number="22CS0104",
        institution_name="National Institute of Technology",
        department="Computer Science & Engineering",
        year_of_study=3,
        cgpa=8.9,
        phone="+91 98765 43210",
        bio="Passionate Full Stack & Cloud enthusiast. Building scalable web services and learning distributed architectures.",
        target_role="Cloud Engineer",
        github_url="https://github.com/aarav-sharma-dev",
        linkedin_url="https://linkedin.com/in/aarav-sharma",
        portfolio_url="https://aarav.dev",
        readiness_score=78.5,
        top_skills=json.dumps(["Python", "Linux", "Networking", "React", "SQL", "Git"]),
        missing_skills=json.dumps(["AWS", "Docker", "Terraform", "Kubernetes", "CI/CD"])
    )
    db.add(primary_student)
    db.commit()
    db.refresh(primary_student)

    # Primary Student Skills
    student_skills_data = [
        ("Python", "Advanced", "Technical"),
        ("Linux", "Intermediate", "Technical"),
        ("Networking", "Intermediate", "Technical"),
        ("React", "Advanced", "Technical"),
        ("SQL", "Advanced", "Technical"),
        ("Git", "Advanced", "Tools"),
        ("FastAPI", "Intermediate", "Frameworks"),
        ("Problem Solving", "Advanced", "Soft"),
        ("Team Leadership", "Intermediate", "Soft")
    ]
    for s_name, s_lvl, s_cat in student_skills_data:
        db.add(StudentSkill(student_id=primary_student.id, skill_name=s_name, proficiency_level=s_lvl, category=s_cat, verified=True))

    # Primary Student Projects
    db.add(Project(
        student_id=primary_student.id,
        title="Distributed Task Queue & Telemetry",
        description="Engineered high-throughput task queue in Python using Redis and background workers with Prometheus metrics.",
        tech_stack=json.dumps(["Python", "Redis", "Docker", "FastAPI"]),
        github_url="https://github.com/aarav-sharma-dev/task-queue",
        live_url="https://tasks.aarav.dev",
        duration="2 Months",
        role="Lead Backend Engineer"
    ))
    db.add(Project(
        student_id=primary_student.id,
        title="Interactive Collaborative Canvas",
        description="Real-time multi-user collaborative whiteboard with WebSockets and React canvas rendering.",
        tech_stack=json.dumps(["React", "TypeScript", "WebSockets", "Tailwind CSS"]),
        github_url="https://github.com/aarav-sharma-dev/canvas-app",
        live_url="https://canvas.aarav.dev",
        duration="3 Months",
        role="Frontend Architect"
    ))

    # Primary Student Certifications
    db.add(Certification(
        student_id=primary_student.id,
        title="AWS Certified Cloud Practitioner",
        issuing_org="Amazon Web Services",
        issue_date="2025-11-20",
        credential_id="AWS-CP-89217",
        credential_url="https://aws.amazon.com/verify",
        verified=True
    ))

    # 2. 5 Verified Industries
    industries_data = [
        ("TechNova Systems", "Enterprise Cloud & Software", "1000-5000", "Bengaluru, India", "https://technova.example.com", "Tier-1 Cloud solutions provider"),
        ("CloudScale Networks", "Networking & Infrastructure", "500-1000", "Hyderabad, India", "https://cloudscale.example.com", "Hyper-scale infrastructure provider"),
        ("FinTech Dynamics", "Financial Technology", "2000-10000", "Mumbai, India", "https://fintechdynamics.example.com", "Digital banking platform"),
        ("HealthAI Labs", "Healthcare & Deep Tech", "100-500", "Pune, India", "https://healthai.example.com", "Generative AI diagnostic solutions"),
        ("CyberArmor Security", "Cybersecurity", "500-1000", "Chennai, India", "https://cyberarmor.example.com", "Zero-trust network defense")
    ]
    created_industries = []
    for idx, (cname, itype, csize, loc, web, desc) in enumerate(industries_data):
        if idx == 0:
            user_id = created_demo_users[RoleEnum.INDUSTRY.value].id
        else:
            u_ind = User(email=f"hr@{cname.lower().replace(' ', '')}.com", full_name=f"{cname} Recruiting", role=RoleEnum.INDUSTRY.value, hashed_password=pwd)
            db.add(u_ind)
            db.commit()
            db.refresh(u_ind)
            user_id = u_ind.id
        
        ind = Industry(user_id=user_id, company_name=cname, industry_type=itype, company_size=csize, location=loc, website=web, description=desc, verified=True)
        db.add(ind)
        db.commit()
        db.refresh(ind)
        created_industries.append(ind)

    # 3. 20+ Realistic Students
    student_names = [
        ("Rohan Verma", "Computer Science & Engineering", 3, 9.1, "Full Stack Developer"),
        ("Priya Nair", "Artificial Intelligence & Data Science", 4, 8.8, "AI/ML Engineer"),
        ("Aditya Kulkarni", "Computer Science & Engineering", 4, 8.5, "Cloud Engineer"),
        ("Sneha Patel", "Information Technology", 3, 8.7, "Backend Engineer"),
        ("Kavya Iyer", "Computer Science & Engineering", 3, 9.3, "DevOps Engineer"),
        ("Manish Reddy", "Electronics & Communication", 4, 8.2, "Embedded Systems Engineer"),
        ("Ankit Gupta", "Information Technology", 3, 7.9, "Frontend Engineer"),
        ("Meera Menon", "Artificial Intelligence & Data Science", 3, 9.0, "Data Scientist"),
        ("Siddharth Joshi", "Computer Science & Engineering", 4, 8.4, "Cybersecurity Analyst"),
        ("Divya Balan", "Information Technology", 3, 8.6, "Full Stack Developer"),
        ("Varun Singhal", "Computer Science & Engineering", 4, 8.9, "Cloud Engineer"),
        ("Tanvi Deshmukh", "Artificial Intelligence & Data Science", 4, 8.7, "AI/ML Engineer"),
        ("Harshvardhan Rao", "Computer Science & Engineering", 3, 8.3, "DevOps Engineer"),
        ("Pooja Hegde", "Information Technology", 4, 8.5, "Backend Engineer"),
        ("Naveen Chawla", "Electronics & Communication", 3, 7.8, "QA Automation Engineer"),
        ("Ishita Sen", "Computer Science & Engineering", 4, 9.2, "Data Engineer"),
        ("Kunal Bhatt", "Information Technology", 3, 8.1, "Frontend Engineer"),
        ("Ritika Roy", "Artificial Intelligence & Data Science", 3, 8.9, "Data Scientist"),
        ("Gaurav Pandey", "Computer Science & Engineering", 4, 8.6, "Full Stack Developer"),
        ("Swati Mishra", "Information Technology", 4, 8.8, "Cloud Engineer")
    ]
    created_students = [primary_student]
    for idx, (s_name, dept, yr, cg, role) in enumerate(student_names):
        u_st = User(email=f"student{idx+1}@skillora.ai", full_name=s_name, role=RoleEnum.STUDENT.value, hashed_password=pwd)
        db.add(u_st)
        db.commit()
        db.refresh(u_st)
        
        st = Student(
            user_id=u_st.id,
            roll_number=f"22CS{105+idx:03d}",
            institution_name="National Institute of Technology",
            department=dept,
            year_of_study=yr,
            cgpa=cg,
            phone=f"+91 98765 {10000+idx}",
            target_role=role,
            readiness_score=round(random.uniform(65.0, 92.0), 1),
            top_skills=json.dumps(["Python", "SQL", "React"] if "Full Stack" in role else ["Python", "Linux", "AWS"] if "Cloud" in role else ["Python", "PyTorch", "TensorFlow"]),
            missing_skills=json.dumps(["Docker", "Kubernetes", "CI/CD"])
        )
        db.add(st)
        db.commit()
        db.refresh(st)
        created_students.append(st)

    # 4. 10+ Jobs
    jobs_data = [
        ("Associate Cloud Engineer", created_industries[0].id, "Full-time", "Bengaluru, India", "0-2 Years", "₹9,00,000 - ₹14,00,000 P.A.", ["Linux", "AWS", "Docker", "Networking", "Python"], ["Terraform", "Kubernetes"], "Deploy and maintain cloud infrastructure on AWS, configure VPCs, IAM policies, and automated deployment pipelines."),
        ("Graduate Full Stack Developer", created_industries[0].id, "Full-time", "Bengaluru, India", "0-1 Years", "₹8,50,000 - ₹13,00,000 P.A.", ["React", "Node.js", "JavaScript", "SQL", "REST APIs"], ["TypeScript", "MongoDB"], "Build responsive user interfaces and backend services for enterprise cloud monitoring suite."),
        ("Junior DevOps Specialist", created_industries[1].id, "Full-time", "Hyderabad, India", "0-2 Years", "₹9,50,000 - ₹15,00,000 P.A.", ["Linux", "Docker", "CI/CD", "Bash", "Git"], ["Ansible", "Terraform"], "Maintain automated CI/CD build runners, Docker base images, and deployment verification test beds."),
        ("Frontend Engineer (React/TypeScript)", created_industries[2].id, "Full-time", "Mumbai, India", "1-3 Years", "₹10,00,000 - ₹16,00,000 P.A.", ["React", "TypeScript", "HTML5", "CSS3", "Redux"], ["Next.js", "Web Vitals"], "Develop customer-facing financial dashboards with real-time trading feeds and high chart responsiveness."),
        ("AI/ML Research Engineer", created_industries[3].id, "Full-time", "Pune, India", "0-2 Years", "₹12,00,000 - ₹18,00,000 P.A.", ["Python", "PyTorch", "Vector Databases", "LangChain", "Data Preprocessing"], ["TensorFlow", "FastAPI"], "Fine-tune clinical domain language models, build RAG semantic retrieval systems, and deploy inference microservices."),
        ("Cybersecurity Operations Analyst", created_industries[4].id, "Full-time", "Chennai, India", "0-2 Years", "₹8,00,000 - ₹13,00,000 P.A.", ["Networking", "Linux", "SIEM", "Wireshark", "OWASP"], ["Cryptography", "Python"], "Monitor SOC alerts, triage vulnerability scanner reports, and conduct network packet anomaly analysis."),
        ("Backend Services Engineer (FastAPI/Postgres)", created_industries[2].id, "Full-time", "Mumbai, India", "0-2 Years", "₹9,00,000 - ₹14,50,000 P.A.", ["Python", "FastAPI", "PostgreSQL", "SQL", "Docker"], ["Redis", "Kafka"], "Design scalable transaction APIs, database query indexes, and event-driven ledger sync services."),
        ("Data Engineer - ETL & Warehousing", created_industries[1].id, "Full-time", "Hyderabad, India", "1-3 Years", "₹10,50,000 - ₹16,00,000 P.A.", ["Python", "SQL", "Apache Spark", "Airflow", "AWS"], ["Snowflake"], "Construct robust automated ingestion pipelines from telecommunications data streams into cloud lakehouses."),
        ("Site Reliability Engineer (SRE)", created_industries[0].id, "Full-time", "Bengaluru, India", "1-3 Years", "₹11,00,000 - ₹17,00,000 P.A.", ["Linux", "Kubernetes", "Prometheus", "Python", "Networking"], ["Grafana", "Go"], "Define SLOs, error budgets, telemetry dashboards, and automated incident recovery runbooks."),
        ("QA Automation Engineer (Playwright/Python)", created_industries[3].id, "Full-time", "Pune, India", "0-2 Years", "₹7,50,000 - ₹12,00,000 P.A.", ["Python", "Selenium", "Postman", "CI/CD", "Git"], ["Playwright", "Docker"], "Create automated regression test suites, mock API test fixtures, and continuous deployment test stage gates.")
    ]
    created_jobs = []
    for title, ind_id, jtype, loc, exp, sal, req_s, pref_s, desc in jobs_data:
        j = Job(
            industry_id=ind_id, title=title, job_type=jtype, location=loc,
            experience_required=exp, salary_range=sal,
            required_skills=json.dumps(req_s), preferred_skills=json.dumps(pref_s),
            description=desc, deadline="2026-12-31", is_active=True
        )
        db.add(j)
        db.commit()
        db.refresh(j)
        created_jobs.append(j)

    # 5. 10+ Internships
    internships_data = [
        ("Cloud Infrastructure Intern", created_industries[0].id, "Cloud Engineering", "Remote / Hybrid", "6 Months", "₹35,000 / month", 6, ["Linux", "Networking", "AWS", "Python"], ["Docker"], "Gain hands-on experience deploying AWS VPCs, EC2 instances, S3 storage policies, and Terraform modules."),
        ("Full Stack Web Development Intern", created_industries[0].id, "Product Engineering", "Bengaluru, India", "6 Months", "₹30,000 / month", 8, ["React", "Node.js", "JavaScript", "SQL"], ["Tailwind CSS"], "Build customer onboarding workflows, reusable UI components, and backend authentication endpoints."),
        ("Generative AI & LLM Intern", created_industries[3].id, "AI Research", "Pune / Remote", "6 Months", "₹40,000 / month", 4, ["Python", "Vector Databases", "PyTorch", "NLP"], ["LangChain"], "Experiment with embedding models, chunking strategies, and retrieval-augmented generation benchmarks."),
        ("DevOps & Platform Engineering Intern", created_industries[1].id, "Platform Engineering", "Hyderabad, India", "6 Months", "₹32,000 / month", 5, ["Linux", "Docker", "CI/CD", "Git"], ["Kubernetes"], "Assist engineering teams with Docker containerization, GitLab CI runners, and environment provisioning."),
        ("Cyber Defense & Vulnerability Intern", created_industries[4].id, "Security Operations", "Chennai, India", "6 Months", "₹28,000 / month", 4, ["Networking", "Linux", "OWASP", "Python"], ["Wireshark"], "Shadow SOC analysts, inspect firewall rule sets, and run automated application security tests."),
        ("Data Analytics & Visualization Intern", created_industries[2].id, "Business Intelligence", "Mumbai, India", "6 Months", "₹30,000 / month", 5, ["SQL", "Python", "Tableau", "Statistics"], ["PowerBI"], "Build financial executive dashboards, cohort retention analysis, and revenue reconciliation scripts."),
        ("Backend Systems Intern", created_industries[2].id, "Core Platform", "Mumbai, India", "6 Months", "₹32,000 / month", 6, ["Python", "PostgreSQL", "REST APIs", "Git"], ["FastAPI"], "Develop high-throughput REST endpoints, optimize database indexes, and write automated integration tests."),
        ("Mobile App Engineering Intern", created_industries[0].id, "Mobile Division", "Bengaluru, India", "6 Months", "₹28,000 / month", 4, ["React Native", "JavaScript", "REST APIs"], ["TypeScript"], "Build cross-platform mobile screens, biometric authentication, and offline data sync."),
        ("Computer Vision Research Intern", created_industries[3].id, "Medical Imaging", "Pune, India", "6 Months", "₹38,000 / month", 3, ["Python", "PyTorch", "OpenCV", "TensorFlow"], ["Scikit-Learn"], "Train image segmentation models on MRI and X-ray radiology scans with physician validation."),
        ("QA Automation Engineering Intern", created_industries[1].id, "Quality Assurance", "Hyderabad, India", "6 Months", "₹25,000 / month", 5, ["Selenium", "Python", "Postman", "Git"], ["Playwright"], "Write regression test scripts, API response assertions, and automated smoke test triggers.")
    ]
    created_internships = []
    for title, ind_id, dept, loc, dur, stip, vac, req_s, pref_s, desc in internships_data:
        item = Internship(
            industry_id=ind_id, title=title, department=dept, location=loc,
            duration=dur, stipend=stip, vacancies=vac,
            required_skills=json.dumps(req_s), preferred_skills=json.dumps(pref_s),
            description=desc, deadline="2026-11-30", is_active=True
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        created_internships.append(item)

    # 6. 15+ Courses
    courses_data = [
        ("AWS Cloud Practitioner Essentials", "Skillora Academy", "AWS Certified Lead", "6 Weeks", "Beginner", "Master AWS core services: EC2, S3, RDS, VPC, and IAM with live cloud console labs.", ["Cloud Architecture", "AWS Services", "Security & IAM", "Cost Optimization"], ["AWS", "Cloud Computing", "Networking", "Linux"]),
        ("Docker & Container Orchestration", "Cloud Native Institute", "Senior DevOps Architect", "5 Weeks", "Intermediate", "Learn Docker containerization, multi-stage builds, Docker Compose, and Kubernetes deployment manifests.", ["Docker Fundamentals", "Multi-stage Builds", "Networking & Volumes", "K8s Intro"], ["Docker", "Linux", "Kubernetes", "DevOps"]),
        ("Full-Stack Modern React & Node.js", "Web Dev Masters", "Principal UI Engineer", "8 Weeks", "Intermediate", "Build end-to-end applications with React, React Router, Node.js, Express, and PostgreSQL.", ["React Component Architecture", "State Management", "RESTful API Server", "Database Modeling"], ["React", "JavaScript", "Node.js", "SQL"]),
        ("Generative AI & Vector Search with RAG", "Deep Intelligence Labs", "AI Research Scientist", "6 Weeks", "Advanced", "Implement end-to-end RAG pipelines using embeddings, vector stores, and LLM reasoning.", ["Document Ingestion", "Embeddings & Vectors", "Retrieval Strategies", "Explainable LLM Prompts"], ["Python", "Vector Databases", "PyTorch", "Machine Learning"]),
        ("Enterprise CI/CD Pipelines with GitHub Actions", "DevOps Pro", "Lead Site Reliability Engineer", "4 Weeks", "Intermediate", "Automate build, test, and containerized deployment workflows using GitHub Actions and cloud webhooks.", ["Workflow Syntax", "Secret Management", "Docker Image Publishing", "Production Deployments"], ["CI/CD", "Git", "Docker", "Linux"]),
        ("Advanced SQL & Database Performance Tuning", "Data Systems Academy", "Database Architect", "5 Weeks", "Intermediate", "Master relational database schema normalization, indexing, query execution plans, and transaction isolation.", ["Complex Queries", "Indexes & B-Trees", "Transactions & ACID", "Query Optimization"], ["SQL", "PostgreSQL", "DBMS", "Performance"]),
        ("Cybersecurity Defense & OWASP Top 10", "Cyber Defense Center", "Certified Ethical Hacker", "6 Weeks", "Intermediate", "Understand application vulnerabilities, SQL injection, XSS, CSRF, and defensive penetration testing.", ["Threat Modeling", "Web Vulnerabilities", "Authentication Defenses", "Security Headers"], ["Cybersecurity", "Networking", "Linux", "OWASP"]),
        ("Data Structures & Algorithmic Problem Solving", "CodeCraft Academy", "Competitive Programmer", "10 Weeks", "Intermediate", "Master arrays, trees, graphs, dynamic programming, and interview coding patterns.", ["Arrays & Two Pointers", "Trees & Graphs", "Dynamic Programming", "System Design Patterns"], ["Data Structures", "Algorithms", "Python", "Problem Solving"]),
        ("TypeScript for Large-Scale Applications", "Frontend League", "Staff Software Engineer", "4 Weeks", "Intermediate", "Leverage TypeScript static types, generics, union types, and utility types in production React apps.", ["Type Inference", "Generics", "Strict Configuration", "React Integration"], ["TypeScript", "JavaScript", "React"]),
        ("Kubernetes in Production: CKA Preparation", "Cloud Native Institute", "Kubernetes Architect", "8 Weeks", "Advanced", "Comprehensive preparation for CKA covering cluster architecture, pods, ingress, and troubleshooting.", ["Cluster Setup", "Workloads & Scheduling", "Cluster Networking", "Security & RBAC"], ["Kubernetes", "Docker", "Linux", "Networking"]),
        ("Microservices Architecture with FastAPI", "Python Guild", "Backend Systems Lead", "6 Weeks", "Intermediate", "Architect decoupled REST microservices with async Python, Pydantic validation, and Redis caching.", ["Async FastAPI", "Pydantic Schemas", "JWT Auth & RBAC", "Service Communication"], ["Python", "FastAPI", "SQL", "Microservices"]),
        ("Data Science & Machine Learning with Scikit-Learn", "DataLab Global", "Lead Data Scientist", "8 Weeks", "Intermediate", "End-to-end machine learning from data wrangling to regression, classification, and model validation.", ["Exploratory Data Analysis", "Feature Engineering", "Ensemble Methods", "Model Evaluation"], ["Python", "Scikit-Learn", "Pandas", "Machine Learning"]),
        ("Linux System Administration & Shell Scripting", "SysAdmin World", "Senior Systems Engineer", "5 Weeks", "Beginner", "Master terminal navigation, process management, permissions, and automated Bash maintenance scripts.", ["Bash Scripting", "Systemd Services", "User & Group Permissions", "Network Config"], ["Linux", "Bash", "Networking"]),
        ("Mobile App Development with React Native", "AppDev Studio", "Mobile Architect", "7 Weeks", "Intermediate", "Build cross-platform iOS and Android apps with native device APIs and responsive layouts.", ["Native Components", "Navigation Stacks", "Device Storage", "App Store Publishing"], ["React Native", "JavaScript", "Mobile"]),
        ("Infrastructure as Code with Terraform", "Cloud Pro Academy", "Cloud Automation Engineer", "4 Weeks", "Intermediate", "Declaratively define and manage cloud infrastructure across AWS using Terraform state files and modules.", ["Terraform Providers", "State Management", "Reusable Modules", "Multi-Cloud IaC"], ["Terraform", "AWS", "Cloud Computing", "DevOps"])
    ]
    for title, prov, inst, dur, lvl, desc, syl, sk in courses_data:
        c = Course(
            title=title, provider=prov, instructor=inst, duration=dur,
            level=lvl, description=desc, syllabus=json.dumps(syl),
            skills_covered=json.dumps(sk), rating=round(random.uniform(4.7, 4.9), 1)
        )
        db.add(c)
    db.commit()

    # 7. Assessment Questions across 4 Categories
    questions_data = [
        ("Technical Skills", "Python", "Medium", "What is the primary difference between a list and a tuple in Python?", ["Lists are immutable, tuples are mutable", "Lists are mutable, tuples are immutable", "Tuples can only store numbers", "There is no performance difference"], 1, "Tuples are immutable sequence types in Python, allowing memory optimization and hashability."),
        ("Technical Skills", "Docker", "Medium", "Which Dockerfile instruction creates a new intermediate layer and executes build commands?", ["CMD", "RUN", "EXPOSE", "ENTRYPOINT"], 1, "The RUN instruction executes build-time commands and commits results to a new image layer."),
        ("Technical Skills", "AWS", "Medium", "Which AWS service provides serverless compute execution triggered by HTTP or S3 events?", ["Amazon EC2", "AWS Lambda", "Amazon ECS", "AWS Outposts"], 1, "AWS Lambda allows running code without provisioning or managing servers."),
        ("Technical Skills", "React", "Easy", "What hook in React is primarily used to perform side effects such as data fetching?", ["useState", "useEffect", "useMemo", "useCallback"], 1, "useEffect handles component lifecycle operations and side effects after render."),
        ("Technical Skills", "Networking", "Medium", "Which protocol operates at the Transport Layer to ensure reliable, ordered byte-stream delivery?", ["UDP", "TCP", "IP", "ICMP"], 1, "TCP provides connection-oriented, reliable, and sequenced transmission with flow control."),
        ("Technical Skills", "SQL", "Medium", "Which SQL clause is used to filter aggregated group records after a GROUP BY clause?", ["WHERE", "HAVING", "ORDER BY", "FILTER"], 1, "HAVING filters groups created by the GROUP BY clause, whereas WHERE filters individual rows."),
        ("Technical Skills", "Linux", "Easy", "Which Linux command changes file read/write/execute permissions?", ["chown", "chmod", "ps", "top"], 1, "chmod modifies file mode bits and permission attributes."),
        ("Soft Skills", "Collaboration", "Easy", "During an engineering sprint retro, your pull request is constructively critiqued. How should you respond?", ["Defend code aggressively", "Listen attentively, discuss tradeoffs, and iterate positively", "Ignore feedback and merge", "Blame the reviewer"], 1, "Professional engineering thrives on open, blameless feedback and continuous code improvement."),
        ("Soft Skills", "Communication", "Easy", "When communicating a severe production latency bug to stakeholders, what is the best approach?", ["Hide the issue until fixed", "Provide clear incident timeline, impact summary, and root cause mitigation steps", "Send raw stack trace without context", "Blame the cloud provider"], 1, "Clear, factual communication with actionable mitigation reassures stakeholders."),
        ("Problem Solving", "Algorithms", "Medium", "What is the average time complexity of searching an element in a balanced Binary Search Tree?", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 1, "In a balanced BST, each comparison halves the search space, yielding O(log n) complexity.")
    ]
    for cat, sk_test, diff, q_txt, opts, corr, expl in questions_data:
        db.add(AssessmentQuestion(
            category=cat, skill_tested=sk_test, difficulty=diff,
            question_text=q_txt, options=json.dumps(opts),
            correct_option=corr, explanation=expl
        ))
    db.commit()

    # 8. Institution Profile & Analytics
    inst = Institution(
        user_id=created_demo_users[RoleEnum.INSTITUTION.value].id,
        institution_name="National Institute of Technology",
        institution_code="NIT-ENG-2026",
        institution_type="Autonomous Institute of National Importance",
        address="Academic Ridge, Bengaluru",
        state="Karnataka",
        contact_email="director@nit.ac.in",
        accredited=True
    )
    db.add(inst)
    db.commit()
    db.refresh(inst)

    db.add(PlacementAnalytics(
        institution_id=inst.id,
        academic_year="2025-2026",
        total_eligible=350,
        placed_count=298,
        higher_studies_count=32,
        entrepreneurship_count=8,
        avg_package_lpa=9.8,
        highest_package_lpa=44.0,
        top_recruiters=json.dumps(["TechNova Systems", "CloudScale Networks", "FinTech Dynamics", "HealthAI Labs", "CyberArmor Security"])
    ))
    db.commit()

    # 9. Academician Profile & Opportunities
    acad = Academician(
        user_id=created_demo_users[RoleEnum.ACADEMICIAN.value].id,
        faculty_name="Prof. Ananya Sen",
        institution_name="National Institute of Technology",
        department="Computer Science & Engineering",
        designation="Associate Professor & Head of Research",
        specialization="Distributed Cloud Architectures & Explainable AI",
        experience_years=14,
        research_interests=json.dumps(["Edge Cloud Computing", "Retrieval-Augmented Generation", "Autonomous Multi-Agent Systems"]),
        bio="Leading collaborative research labs connecting undergraduate engineering talent with cutting-edge industry R&D."
    )
    db.add(acad)
    db.commit()
    db.refresh(acad)

    db.add(ResearchProject(
        academician_id=acad.id,
        title="Privacy-Preserving Federated RAG in Healthcare",
        domain="AI & Healthcare",
        abstract="Investigating distributed embedding vector retrieval models on decentralized patient records with differential privacy guarantees.",
        lead_institution="National Institute of Technology",
        industry_partner="HealthAI Labs",
        funding_amount="₹35,00,000",
        status="Active",
        open_positions=3,
        duration="24 Months"
    ))
    db.add(ResearchProject(
        academician_id=acad.id,
        title="Resilient Zero-Trust Cloud Edge Orchestration",
        domain="Cloud Security",
        abstract="Developing automated identity verification and dynamic service mesh traffic routing for microservices at the network edge.",
        lead_institution="National Institute of Technology",
        industry_partner="TechNova Systems",
        funding_amount="₹28,00,000",
        status="Active",
        open_positions=2,
        duration="18 Months"
    ))
    db.add(MentorshipProgram(
        faculty_name="Prof. Ananya Sen",
        topic="Cloud Systems & Kubernetes Architecture Masterclass",
        domain="Cloud Computing",
        max_mentees=12,
        current_mentees=8,
        duration_weeks=8,
        status="Active"
    ))
    db.add(ConsultancyOpportunity(
        title="Enterprise Microservices Audit & Cloud Architecture Review",
        industry_partner="CyberArmor Security",
        domain="Systems Security",
        budget="₹8,00,000",
        duration="3 Months",
        description="Comprehensive architecture review of container ingress security, secrets management, and automated failover pipelines.",
        status="Open"
    ))

    # 10. Faculty Training Programs (FDPs)
    fdps_data = [
        ("Industry Immersion FDP on Generative AI & RAG", created_industries[3].id, "Artificial Intelligence", "2 Weeks", "Hybrid", "2026-10-15", "Hands-on faculty development covering embeddings, vector databases, and LLM fine-tuning.", "Faculty in CS/IT with min 2 years teaching experience", "Sponsored / Free"),
        ("Advanced Cloud Native Architecture & Kubernetes FDP", created_industries[0].id, "Cloud Engineering", "1 Week", "Online", "2026-11-01", "Equipping educators with container orchestration, cloud monitoring, and Terraform lab assignments.", "All engineering faculty", "Sponsored"),
        ("Zero-Trust Security & Cyber Threat Hunting Immersion", created_industries[4].id, "Cybersecurity", "2 Weeks", "On-site", "2026-11-15", "Practical lab immersion inside industrial Security Operations Centers (SOC).", "Faculty in Cybersecurity/Networking", "Sponsored")
    ]
    for title, ind_id, dom, dur, mode, s_date, desc, elig, st_fee in fdps_data:
        db.add(FacultyTraining(
            industry_id=ind_id, title=title, domain=dom, duration=dur,
            mode=mode, start_date=s_date, description=desc,
            eligibility=elig, stipend_or_fee=st_fee, vacancies=30, status="Open"
        ))

    # 11. Sample Applications for Primary Student
    db.add(JobApplication(
        job_id=created_jobs[0].id,
        student_id=primary_student.id,
        status="Interview Scheduled",
        match_score=82.5,
        why_matched=json.dumps(["Python", "Linux", "Networking", "SQL"]),
        skill_gaps=json.dumps(["AWS", "Docker", "Terraform"]),
        notes="Strong fundamental knowledge in scripting and networks. Interview scheduled for technical rounds."
    ))
    db.add(InternshipApplication(
        internship_id=created_internships[0].id,
        student_id=primary_student.id,
        status="Shortlisted",
        match_score=85.0,
        why_matched=json.dumps(["Linux", "Networking", "Python"]),
        skill_gaps=json.dumps(["AWS", "Docker"]),
        notes="High compatibility with cloud operations internship criteria."
    ))

    # 12. Interview Schedule
    db.add(Interview(
        application_id=1,
        application_type="Job",
        scheduled_time="Tomorrow, 11:00 AM IST",
        meeting_link="https://meet.google.com/xyz-skillora-interview",
        interviewer="Sundeep Rao (Senior Cloud Architect)",
        status="Scheduled"
    ))

    # 13. Notifications
    db.add(Notification(
        user_id=created_demo_users[RoleEnum.STUDENT.value].id,
        title="Interview Scheduled with TechNova Systems",
        message="Your interview for Associate Cloud Engineer is confirmed for tomorrow at 11:00 AM IST.",
        type="INTERVIEW"
    ))
    db.add(Notification(
        user_id=created_demo_users[RoleEnum.STUDENT.value].id,
        title="New Course Recommendation from RAG Engine",
        message="Based on your Cloud Engineer career target, close your Docker gap with 'Docker & Container Orchestration'.",
        type="COURSE"
    ))

    db.commit()
    db.close()
    print("SKILLORA AI Database Seeded Successfully!")
    print("Demo Credentials:")
    print("  Student:     student@skillora.ai     / password123")
    print("  Industry:    industry@skillora.ai    / password123")
    print("  Institution: institution@skillora.ai / password123")
    print("  Academician: academician@skillora.ai / password123")
    print("  Admin:       admin@skillora.ai       / password123")

if __name__ == "__main__":
    seed_database()
