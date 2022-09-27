import React, { useState } from 'react';
import s from './Form.module.css';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

function Form() {
  const {contacts} = useSelector(getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const phone = e.target.elements.number.value;
    const newContact = { name, phone };
    

    if (name.length === 0) {
      return;
    }
    if (phone.length === 0) {
      return;
    }

    const inputContact =  contacts.some(el => el.name === name);
    
    if (inputContact) {
      alert(` ${name} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <>
      <h2 className={s.title}>Name</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id="newName"
          onChange={handleChange}
          value={name}
        />
        <h2 className={s.title}>Number</h2>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="newTel"
          onChange={handleChange}
          value={number}
        />
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

export default Form;
