import API from './api';

export const industryService = {
  getProfile: () => API.get('/industry/profile'),
  updateProfile: (data) => API.put('/industry/profile', data),
  createJob: (data) => API.post('/industry/jobs', data),
  getJobs: () => API.get('/industry/jobs'),
  createInternship: (data) => API.post('/industry/internships', data),
  getInternships: () => API.get('/industry/internships'),
  getApplications: () => API.get('/industry/applications'),
  updateApplicationStatus: (id, status, notes, type) => API.put(`/industry/applications/${id}/status?app_type=${type || 'Job'}`, { status, notes }),
  searchStudents: (params) => API.get('/industry/students/search', { params }),
  scheduleInterview: (data) => API.post('/industry/interviews', data),
  getInterviews: () => API.get('/industry/interviews'),
  getFacultyTrainings: () => API.get('/industry/training'),
  createFacultyTraining: (data) => API.post('/industry/training', data),
};
