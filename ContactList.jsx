// ContactList.jsx
import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts }) => {
  const openLinkedIn = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="contact-list-container">
      <h2>My Contacts</h2>
      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts yet. Add your first contact!</p>
        </div>
      ) : (
        <div className="contact-list">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <div className="contact-photo">
                {contact.photo ? (
                  <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
                ) : (
                  <div className="photo-placeholder">
                    {contact.firstName[0]}{contact.lastName[0]}
                  </div>
                )}
              </div>
              
              <div className="contact-info">
                <h3>{contact.firstName} {contact.lastName}</h3>
                {contact.title && <p className="contact-title">{contact.title}</p>}
                {contact.company && <p className="contact-company">{contact.company}</p>}
                {contact.linkedinUrl && (
                  <button 
                    className="linkedin-btn"
                    onClick={() => openLinkedIn(contact.linkedinUrl)}
                  >
                    View LinkedIn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
