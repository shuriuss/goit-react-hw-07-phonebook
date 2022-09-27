import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

import { RotatingLines } from  'react-loader-spinner'


function ContactList() {
  const dispatch = useDispatch();
  // Получаем части состояния
  const { contacts, isLoading, error } = useSelector(getContacts);
  // Вызываем операцию
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  // Удаление контакта
  const handleDelete = id => {
    return dispatch(deleteContact(id));
  };
  // фильтрация по имени
  const filter = useSelector(getFilter);
  
  const currentContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  
  return (
    <>
  
      {isLoading && <RotatingLines/>}
      {error && <b>{error}</b>}
      {currentContacts.length === 0 ? (
        <p>No contact</p>
      ) : (
        <>
          <ul className={s.contact__list}>
            {currentContacts.map(({ id, name, phone }) => (
              <li key={id} className={s.contact__item}>
                <p>
                  {name}: {phone}
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

// function ContactList() {
//   const contacts = useSelector(getContacts);
//   const filter = useSelector(getFilter);
//   const dispatch = useDispatch();
//   const currentContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter)
//   );

//    // Получаем части состояния
//    const { items, isLoading, error } = useSelector(getContact);
//    // Вызываем операцию
//    useEffect(() => {
//      dispatch(fetchTasks());
//    }, [dispatch]);

//   const handleDelete = id => dispatch(deleteContact(id));

//   return (
//     <>
//       {currentContacts.length === 0 ? (
//         <p>No contact</p>
//       ) : (
//         <>
//           <ul className={s.contact__list}>
//             {currentContacts.map(({ id, name, number }) => (
//               <li key={id} className={s.contact__item}>
//                 <p>
//                   {name}: {number}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => handleDelete(id)}
//                   className={s.contact__button}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </>
//   );
// }
// ContactList.propTypes = {
//   handleDelete: PropTypes.func,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }).isRequired
//   ),
// };

// export default ContactList;
