import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getAllProjects, createProject, updateProject, deleteProject, getAllCategories, 
  getImagesForProject, uploadProjectImage, deleteProjectImage 
} from '../../services/apiService';
import { Modal, Button, Form } from 'react-bootstrap';
import './AdminPage.css';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null, title: '', description: '', location: '', category: { id: '' }
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectImages, setProjectImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsResponse, categoriesResponse] = await Promise.all([
        getAllProjects(),
        getAllCategories()
      ]);
      setProjects(projectsResponse.data);
      setCategories(categoriesResponse.data);
      setError('');
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setFormData({ ...formData, category: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormData({ id: null, title: '', description: '', location: '', category: { id: '' } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category.id) {
      alert("Please select a category.");
      return;
    }
    try {
      if (isEditing) {
        await updateProject(formData.id, formData);
      } else {
        await createProject(formData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} project.`);
    }
  };
  
  const handleEditClick = (project) => {
    setIsEditing(true);
    setFormData({
        id: project.id,
        title: project.title,
        description: project.description,
        location: project.location,
        category: { id: project.category.id }
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleProjectDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter(p => p.id !== projectId));
      } catch (err) {
        setError('Failed to delete project.');
      }
    }
  };

  const handleShowImageModal = async (project) => {
    setSelectedProject(project);
    try {
      const response = await getImagesForProject(project.id);
      setProjectImages(response.data);
    } catch (err) {
      setError('Failed to load images for this project.');
    }
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedProject(null);
    setProjectImages([]);
    setImageFile(null);
    setImageDescription('');
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert('Please select an image file.');
    try {
      await uploadProjectImage(selectedProject.id, imageFile, imageDescription);
      const response = await getImagesForProject(selectedProject.id);
      setProjectImages(response.data);
      setImageFile(null);
      setImageDescription('');
      if(document.getElementById('image-file-input')) {
        document.getElementById('image-file-input').value = '';
      }
    } catch (err) {
      setError('Image upload failed.');
    }
  };
  
  const handleImageDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
        try {
            await deleteProjectImage(imageId);
            setProjectImages(projectImages.filter(img => img.id !== imageId));
        } catch (err) {
            setError('Failed to delete image.');
        }
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      <div className="admin-content">
        <div className="manage-header">
          <h2>Manage Projects</h2>
          <button onClick={() => { showForm ? resetForm() : setShowForm(true) }} className="add-new-btn">
            {showForm ? 'Cancel' : '+ Add New Project'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {showForm && (
          <form onSubmit={handleSubmit} className="add-project-form">
            <h3>{isEditing ? 'Edit Project' : 'Add a New Project'}</h3>
            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Project Title" required />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
            <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
            <select name="categoryId" value={formData.category.id} onChange={handleInputChange} required>
              <option value="">-- Select a Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button type="submit">Save Project</button>
          </form>
        )}
        {loading ? <p>Loading projects...</p> : (
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th><th>Location</th><th>Category</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.location}</td>
                  <td>{project.category.name}</td>
                  <td>
                    <button onClick={() => handleEditClick(project)} className="action-btn edit-btn">Edit</button>
                    <button onClick={() => handleShowImageModal(project)} className="action-btn manage-images-btn">Images</button>
                    <button onClick={() => handleProjectDelete(project.id)} className="action-btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedProject && (
        <Modal show={showImageModal} onHide={handleCloseImageModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Manage Images for: {selectedProject.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Upload New Image</h5>
            <Form.Group className="mb-3">
              <Form.Label>Image File</Form.Label>
              <Form.Control id="image-file-input" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description (optional)</Form.Label>
              {/* --- THIS IS THE ONLY CHANGE --- */}
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Enter image description" 
                value={imageDescription} 
                onChange={(e) => setImageDescription(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" onClick={handleImageUpload}>Upload Image</Button>
            <hr />
            <h5>Existing Images</h5>
            <div className="image-list">
              {projectImages.length > 0 ? projectImages.map(img => {
                const imageUrl = img.imageUrl.startsWith('http') ? img.imageUrl : `http://localhost:3344${img.imageUrl}`;
                return (
                  <div key={img.id} className="image-thumbnail">
                    <img src={imageUrl} alt={img.description} />
                    <button onClick={() => handleImageDelete(img.id)} className="delete-image-btn">×</button>
                  </div>
                );
              }) : <p>No images uploaded for this project yet.</p>}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;