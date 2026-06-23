import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Content APIs
export const contentAPI = {
  getHomepage: () => apiClient.get('/content/homepage'),
  getAbout: () => apiClient.get('/content/about'),
  getLeadership: () => apiClient.get('/content/leadership'),
  getAcademicPrograms: () => apiClient.get('/content/academic-programs'),
  getDepartments: () => apiClient.get('/content/departments'),
  getAdmissions: () => apiClient.get('/content/admissions'),
  getSettings: () => apiClient.get('/content/settings'),
}

// News APIs
export const newsAPI = {
  getAll: (page = 1, limit = 10) => apiClient.get(`/news?page=${page}&limit=${limit}`),
  getById: (id: string) => apiClient.get(`/news/${id}`),
  create: (data: any) => apiClient.post('/news', data),
  update: (id: string, data: any) => apiClient.put(`/news/${id}`, data),
  delete: (id: string) => apiClient.delete(`/news/${id}`),
}

// Events APIs
export const eventsAPI = {
  getAll: (page = 1, limit = 10) => apiClient.get(`/events?page=${page}&limit=${limit}`),
  getById: (id: string) => apiClient.get(`/events/${id}`),
  create: (data: any) => apiClient.post('/events', data),
  update: (id: string, data: any) => apiClient.put(`/events/${id}`, data),
  delete: (id: string) => apiClient.delete(`/events/${id}`),
}

// Banners APIs
export const bannersAPI = {
  getAll: () => apiClient.get('/banners'),
  getById: (id: string) => apiClient.get(`/banners/${id}`),
  create: (data: any) => apiClient.post('/banners', data),
  update: (id: string, data: any) => apiClient.put(`/banners/${id}`, data),
  delete: (id: string) => apiClient.delete(`/banners/${id}`),
}

// Users APIs
export const usersAPI = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: any) => apiClient.post('/users', data),
  update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
}

// Auth APIs
export const authAPI = {
  login: (username: string, password: string) => 
    apiClient.post('/auth/login', { username, password }),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get('/auth/me'),
}

// Content Management APIs
export const contentManagementAPI = {
  updateSettings: (data: any) => apiClient.put('/content/settings', data),
  updatePage: (slug: string, data: any) => apiClient.put(`/content/pages/${slug}`, data),
  updateSection: (page: string, section: string, data: any) => 
    apiClient.put(`/content/pages/${page}/sections/${section}`, data),
}

export default apiClient
