import API from './api';

export const authService = {
  async login(email, password) {
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
  },

  async register(payload) {
    const res = await API.post('/auth/register', payload);
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
  },

  async getProfile() {
    try {
      const res = await API.get('/auth/me');
      if (res.data) {
        localStorage.setItem('skillora_user', JSON.stringify(res.data));
        return res.data;
      }
    } catch (e) {
      return this.getCurrentUser();
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

  isAuthenticated() {
    return !!localStorage.getItem('skillora_token');
  }
};
