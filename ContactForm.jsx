// ContactForm.jsx
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    photo: '',
    firstName: '',
    lastName: '',
    title: '',
    linkedinUrl: '',
    company: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName) {
      const newContact = {
        id: Date.now(),
        ...formData
      };
      onAddContact(newContact);
      // Reset form
      setFormData({
        photo: '',
        firstName: '',
        lastName: '',
        title: '',
        linkedinUrl: '',
        company: ''
      });
      setPhotoPreview(null);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.includes('linkedin.com');
    } catch {
      return false;
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        
        {/* Photo Upload */}
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <div className="photo-upload">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="photo-input"
            />
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview" />
              </div>
            )}
            <label htmlFor="photo" className="photo-label">
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </label>
          </div>
        </div>

        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            placeholder="Enter last name"
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Software Engineer"
          />
        </div>

        {/* LinkedIn URL */}
        <div className="form-group">
          <label htmlFor="linkedinUrl">LinkedIn URL</label>
          <input
            type="url"
            id="linkedinUrl"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/username"
            className={formData.linkedinUrl && !isValidUrl(formData.linkedinUrl) ? 'invalid' : ''}
          />
          {formData.linkedinUrl && !isValidUrl(formData.linkedinUrl) && (
            <span className="error">Please enter a valid LinkedIn URL</span>
          )}
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company name"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={!formData.firstName || !formData.lastName}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
