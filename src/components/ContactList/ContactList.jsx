import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactSlice';
import { useSelector } from 'react-redux';

function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter)
  // const newConntact = Array.from(contacts)
  const dispatch = useDispatch();
  const currentContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter));

  console.log(contacts);
  




  const handleDelete = (id) =>  dispatch(deleteContact(id));
  

  return (
    <>
      {currentContacts.length === 0 ? (
        <p>No contact</p>
      ) : (
        <>
          <ul className={s.contact__list}>
            {currentContacts.map(({ id, name, number }) => (
              <li key={id} className={s.contact__item}>
                <p>
                  {name}: {number}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(id)}
                  className={s.contact__button}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
ContactList.propTypes = {
  handleDelete: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default ContactList;
