import axios from 'axios';

// The Vercel build will correctly use the variable you set in the dashboard.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// --- API Functions ---
export const getAllCategories = () => apiClient.get('/categories');
export const getCategoryById = (id) => apiClient.get(`/categories/${id}`);
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
export const sendContactForm = (formData) => apiClient.post('/contact/send', formData);

// --- THIS IS THE CORRECTED FUNCTION ---
export const uploadProjectImage = (projectId, file, description) => {
    const formData = new FormData();
    formData.append('file', file);
    // Add the heading to the form data
    // if(heading) formData.append('heading', heading); 
    if(description) formData.append('description', description);

    return apiClient.post(`/project-images/upload/${projectId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};



export const deleteProjectImage = (id) => apiClient.delete(`/project-images/${id}`);