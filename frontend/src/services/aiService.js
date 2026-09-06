import API from './api';

export const aiService = {
  analyzeStudent: (data) => API.post('/ai/analyze-student', data),
  analyzeResume: (text) => API.post('/ai/analyze-resume', { query: text }),
  analyzeSkillGap: (skills, target_role, student_id) => API.post('/ai/skill-gap', { skills, target_role, student_id }),
  recommendCareer: (skills) => API.post('/ai/recommend-career', { skills }),
  recommendCourses: (skills, target_role) => API.post('/ai/recommend-courses', { skills, target_role }),
  matchJob: (student_id, job_id, skills) => API.post('/ai/match-job', { student_id, job_id, skills }),
  matchInternship: (student_id, internship_id, skills) => API.post('/ai/match-internship', { student_id, internship_id, skills }),
  curriculumInsights: (department, skills) => API.post('/ai/curriculum-insights', { department, skills }),
};
