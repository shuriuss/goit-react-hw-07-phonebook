/* eslint-disable no-dupe-class-members */
import React from 'react';

import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

import s from './App.module.css';

export function App() {
  return (
    <section className={s.section}>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </section>
  );
}
