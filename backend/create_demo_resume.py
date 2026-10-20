import os
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_demo_resume(output_paths):
    for out in output_paths:
        Path(out).parent.mkdir(parents=True, exist_ok=True)
        doc = SimpleDocTemplate(
            out,
            pagesize=letter,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )
        
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'NameTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            textColor=colors.HexColor('#1E1B4B'),
            spaceAfter=2
        )
        
        subtitle_style = ParagraphStyle(
            'Subtitle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=11,
            leading=14,
            textColor=colors.HexColor('#4F46E5'),
            spaceAfter=4
        )
        
        contact_style = ParagraphStyle(
            'Contact',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9,
            leading=12,
            textColor=colors.HexColor('#475569'),
            spaceAfter=12
        )
        
        section_style = ParagraphStyle(
            'SectionHeader',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=15,
            textColor=colors.HexColor('#1E1B4B'),
            spaceBefore=8,
            spaceAfter=4
        )
        
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13.5,
            textColor=colors.HexColor('#334155'),
            spaceAfter=4
        )

        bold_item_style = ParagraphStyle(
            'BoldItem',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=13,
            textColor=colors.HexColor('#0F172A')
        )

        story = []

        # 1. Header
        story.append(Paragraph("AARAV SHARMA", title_style))
        story.append(Paragraph("Full Stack Software Engineer & Cloud Systems Developer", subtitle_style))
        story.append(Paragraph("Bengaluru, India • +91 98765 43210 • aarav.sharma@skillora.ai • github.com/aarav-sharma • linkedin.com/in/aarav-sharma", contact_style))
        story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#4F46E5'), spaceAfter=8))

        # 2. Executive Summary
        story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
        story.append(Paragraph(
            "Performance-driven Computer Science Engineer with deep expertise in Python, FastAPI, React, PostgreSQL, and cloud containerization. "
            "Proven track record building high-throughput microservices, vector semantic search pipelines with RAG, and scalable reactive frontend dashboards. "
            "Strong foundation in data structures, algorithms, distributed systems architecture, and automated CI/CD deployments.",
            body_style
        ))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=8))

        # 3. Technical Skills
        story.append(Paragraph("TECHNICAL PROFICIENCIES", section_style))
        skills_text = (
            "<b>Languages:</b> Python, JavaScript, TypeScript, SQL, HTML5, CSS3, C++<br/>"
            "<b>Frameworks & Libraries:</b> FastAPI, React 18, Node.js, Express, SQLAlchemy ORM, Tailwind CSS, Recharts<br/>"
            "<b>Databases & Caching:</b> PostgreSQL, SQLite, Redis, FAISS Vector Indexing<br/>"
            "<b>Cloud & DevOps:</b> Docker, Docker Compose, Git, GitHub Actions, Linux Shell, AWS EC2/S3, CI/CD Pipelines<br/>"
            "<b>Core Competencies:</b> RESTful APIs, Retrieval-Augmented Generation (RAG), Microservices, Object-Oriented Design"
        )
        story.append(Paragraph(skills_text, body_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=8))

        # 4. Work Experience & Major Projects
        story.append(Paragraph("FEATURED ENGINEERING PROJECTS", section_style))
        
        story.append(Paragraph("<b>SKILLORA AI — Intelligent Academia-Industry Career Collaboration Platform</b>", bold_item_style))
        story.append(Paragraph("<i>Lead Architect & Full Stack Developer | Python, FastAPI, React, PostgreSQL, Vector RAG | 2026</i>", body_style))
        story.append(Paragraph(
            "• Designed and engineered high-performance quad-stakeholder career ecosystem serving 1,200+ students and corporate recruiters.<br/>"
            "• Implemented semantic vector RAG search with TF-IDF cosine ranking, yielding 98.4% alignment precision between resumes and job postings.<br/>"
            "• Built automated ATS parser extracting 20+ technical skill competencies with real-time feedback and diagnostic deficit roadmaps.<br/>"
            "• Architected normalized PostgreSQL relational schemas using SQLAlchemy ORM with Bcrypt security and JWT authentication.",
            body_style
        ))
        story.append(Spacer(1, 4))

        story.append(Paragraph("<b>Distributed High-Concurrency Microservices Gateway</b>", bold_item_style))
        story.append(Paragraph("<i>Backend Developer | FastAPI, Docker, PostgreSQL, Redis | 2025</i>", body_style))
        story.append(Paragraph(
            "• Developed asynchronous authentication gateway processing 3,500+ requests/minute with sub-40ms response latency.<br/>"
            "• Integrated Redis caching layer decreasing PostgreSQL read query loads by 65% during peak simulated traffic.<br/>"
            "• Automated container deployments utilizing multi-stage Docker builds reducing image sizes from 850MB to 110MB.",
            body_style
        ))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=8))

        # 5. Education
        story.append(Paragraph("EDUCATION", section_style))
        story.append(Paragraph("<b>National Institute of Technology (NIT) Bengaluru</b>", bold_item_style))
        story.append(Paragraph("Bachelor of Technology (B.Tech) in Computer Science & Engineering | CGPA: 8.8 / 10.0 (Graduation: 2027)", body_style))
        story.append(Spacer(1, 4))

        # 6. Certifications
        story.append(Paragraph("CERTIFICATIONS & ACCREDITATIONS", section_style))
        story.append(Paragraph(
            "• <b>Meta Front-End Developer Professional Certificate</b> (Coursera / Meta)<br/>"
            "• <b>AWS Certified Cloud Practitioner</b> (Amazon Web Services)<br/>"
            "• <b>Smart India Hackathon Finalist</b> (Team Byte Squad — SIH26044)",
            body_style
        ))

        doc.build(story)
        print(f"[+] Successfully generated ATS Resume PDF at: {out}")

if __name__ == "__main__":
    desktop_path = os.path.expanduser(r"~\Desktop\Skillora_Demo_Resume.pdf")
    public_path = r"C:\Users\M. VIGNESH RAHUL\.gemini\antigravity\scratch\skillora-ai\frontend\public\Skillora_Demo_Resume.pdf"
    root_path = r"C:\Users\M. VIGNESH RAHUL\.gemini\antigravity\scratch\skillora-ai\Skillora_Demo_Resume.pdf"
    
    generate_demo_resume([desktop_path, public_path, root_path])
