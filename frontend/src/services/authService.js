import API from './api';

export const authService = {
  async login(email, password) {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data?.access_token) {
        localStorage.setItem('skillora_token', res.data.access_token);
        localStorage.setItem('skillora_user', JSON.stringify({
          id: res.data.user_id,
          email: res.data.email,
          full_name: res.data.full_name,
          role: res.data.role
        }));
      }
      return res.data;
    } catch (err) {
      // Graceful demo account fallback if backend is offline or unreachable
      const demo = this.demoAccounts.find(d => d.email.toLowerCase() === email.toLowerCase());
      if (demo && password === 'password123') {
        const fakeUser = {
          id: demo.role === 'STUDENT' ? 1 : demo.role === 'INDUSTRY' ? 2 : demo.role === 'INSTITUTION' ? 3 : 4,
          email: demo.email,
          full_name: demo.label.split('—')[1]?.trim() || 'Demo User',
          role: demo.role
        };
        localStorage.setItem('skillora_token', 'demo-token');
        localStorage.setItem('skillora_user', JSON.stringify(fakeUser));
        return { access_token: 'demo-token', ...fakeUser };
      }
      throw err;
    }
  },

  logout() {
    localStorage.removeItem('skillora_token');
    localStorage.removeItem('skillora_user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const u = localStorage.getItem('skillora_user');
    return u ? JSON.parse(u) : null;
  },

  demoAccounts: [
    { role: 'STUDENT', email: 'student@skillora.ai', label: 'Student — Aarav Sharma', path: '/student/dashboard' },
    { role: 'INDUSTRY', email: 'industry@skillora.ai', label: 'Company — TechNova Systems', path: '/company/dashboard' },
    { role: 'INSTITUTION', email: 'institution@skillora.ai', label: 'Institution — NIT Bengaluru', path: '/institution/dashboard' },
    { role: 'ACADEMICIAN', email: 'academician@skillora.ai', label: 'Academician — Prof. Ananya Sen', path: '/academician/dashboard' },
  ]
};
