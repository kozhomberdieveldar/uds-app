import axios from 'axios';

const API_URL = 'http://localhost:8001/api/uds';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Добавляем токен к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (phone, password) => {
    // JWT login: POST /api/users/token/ (phone, password)
    const response = await axios.post('http://localhost:8001/api/users/token/', { phone, password });
    const { access, refresh } = response.data;
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    return response;
  },
  refresh: async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) throw new Error('No refresh token');
    const response = await axios.post('http://localhost:8001/api/users/token/refresh/', { refresh });
    localStorage.setItem('token', response.data.access);
    return response;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};

export const companiesAPI = {
  getCompanies: () => api.get('/companies/'),
  getCompany: (id) => api.get(`/companies/${id}/`),
  getCompanyProducts: (id) => api.get(`/companies/${id}/products/`),
  connectToCompany: (id) => api.post(`/companies/${id}/connect/`),
};

export const productsAPI = {
  getProducts: () => api.get('/products/'),
  getProduct: (id) => api.get(`/products/${id}/`),
};

export const bonusAPI = {
  getBonuses: () => api.get('/bonuses/'),
  getBonusHistory: () => api.get('/transactions/'),
  getTotalBonus: () => api.get('/bonuses/total/'),
};

export const ordersAPI = {
  createOrder: (data) => api.post('/orders/', data),
  getOrders: () => api.get('/orders/'),
  getOrder: (id) => api.get(`/orders/${id}/`),
};

export default api; 