import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './Form.module.css';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts);
    return parsedContacts || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts!`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { ...formData, id: nanoid() },
    ]);
  };

  const handleFilter = event => {
    const value = event.target.value;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className={css.form_container}>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};