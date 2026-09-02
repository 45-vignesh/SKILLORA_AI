def find_skill_gap(student_skills: list[str], required_skills: list[str]) -> list[str]:
    student = {skill.strip().lower() for skill in student_skills}
    return [skill for skill in required_skills if skill.strip().lower() not in student]
