// App.jsx
import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'list'

  const handleAddContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
    setCurrentView('list'); // Switch to list view after adding
    console.log('Contact added:', newContact);
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <button 
          onClick={() => setCurrentView('form')}
          className={currentView === 'form' ? 'active' : ''}
        >
          Add Contact
        </button>
        <button 
          onClick={() => setCurrentView('list')}
          className={currentView === 'list' ? 'active' : ''}
        >
          Contacts ({contacts.length})
        </button>
      </nav>

      <main className="app-main">
        {currentView === 'form' ? (
          <ContactForm onAddContact={handleAddContact} />
        ) : (
          <ContactList contacts={contacts} />
        )}
      </main>
    </div>
  );
}

export default App;
