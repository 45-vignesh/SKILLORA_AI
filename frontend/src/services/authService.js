import API from './api';

export const authService = {
  async login(email, password) {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.access_token) {
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        id: res.data.user_id,
        email: res.data.email,
        full_name: res.data.full_name,
        role: res.data.role
      }));
    }
    return res.data;
  },

  async register(data) {
    const res = await API.post('/auth/register', data);
    if (res.data.access_token) {
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        id: res.data.user_id,
        email: res.data.email,
        full_name: res.data.full_name,
        role: res.data.role
      }));
    }
    return res.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },

  demoAccounts: [
    { role: 'STUDENT', email: 'student@skillora.ai', label: 'Student (Aarav Sharma)', targetPath: '/student/dashboard' },
    { role: 'INDUSTRY', email: 'industry@skillora.ai', label: 'Industry (TechNova Systems)', targetPath: '/industry/dashboard' },
    { role: 'INSTITUTION', email: 'institution@skillora.ai', label: 'Institution (NIT Bengaluru)', targetPath: '/institution/dashboard' },
    { role: 'ACADEMICIAN', email: 'academician@skillora.ai', label: 'Academician (Prof. Ananya Sen)', targetPath: '/academician/dashboard' },
    { role: 'ADMIN', email: 'admin@skillora.ai', label: 'System Admin (Byte Squad)', targetPath: '/institution/dashboard' }
  ]
};
