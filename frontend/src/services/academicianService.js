import API from './api';

export const academicianService = {
  getProfile: () => API.get('/academician/profile'),
  updateProfile: (data) => API.put('/academician/profile', data),
  getOpportunities: () => API.get('/academician/opportunities'),
  getResearchProjects: () => API.get('/academician/research'),
  createResearchProject: (data) => API.post('/academician/research', data),
  getConsultancy: () => API.get('/academician/consultancy'),
  getMentorships: () => API.get('/academician/mentorships'),
};
