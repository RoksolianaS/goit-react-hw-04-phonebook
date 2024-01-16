import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    const formData = {
      name,
      number,
    };
    handleAddContact(formData);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <label
        className={css.label} >Name
        <input
          className={css.input}
          type="text"
          name="name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={css.label}> Number <input
          className={css.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={css.btn} type="submit">Add contact</button>
    </form>
  );
};