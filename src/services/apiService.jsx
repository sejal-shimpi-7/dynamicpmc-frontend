import axios from 'axios';

// Change this line back
const API_BASE_URL = 'http://localhost:3344/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// This "interceptor" runs before every request
apiClient.interceptors.request.use(
  (config) => {
    // Get the auth token from session storage
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the request header
      config.headers['Authorization'] = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- All your other API functions remain exactly the same ---
export const getAllCategories = () => apiClient.get('/categories');
export const getCategoryById = (id) => apiClient.get(`/categories/${id}`);
// ... etc.
export const createCategory = (categoryData) => apiClient.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
export const getAllProjects = () => apiClient.get('/projects');
export const getProjectsByCategory = (categoryId) => apiClient.get(`/projects/category/${categoryId}`);
export const getProjectById = (id) => apiClient.get(`/projects/${id}`);
export const createProject = (projectData) => apiClient.post('/projects', projectData);
export const updateProject = (id, projectData) => apiClient.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);
export const getImagesForProject = (projectId) => apiClient.get(`/project-images/project/${projectId}`);
export const uploadProjectImage = (projectId, file, description) => {
    const formData = new FormData();
    formData.append('file', file);
    if(description) formData.append('description', description);
    return apiClient.post(`/project-images/upload/${projectId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteProjectImage = (id) => apiClient.delete(`/project-images/${id}`);