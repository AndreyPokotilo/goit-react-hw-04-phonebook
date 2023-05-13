import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import initialContacts from './Data/contacts.json';
import css from './App.module.css';

const LOCAL_STOR = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LOCAL_STOR)) ?? initialContacts);

  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem(LOCAL_STOR, JSON.stringify(contacts)),
    [contacts]
  );

  const addContacts = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    const normaliseName = name.toLowerCase().trim();

    contacts.find(contact => contact.name.toLowerCase() === normaliseName)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = contactId =>
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );

  const onFilter = event => setFilter(event.target.value);

  const onFilterSearch = () => {
    const normaliseFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normaliseFilter)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.titel}>Phonebook</h1>
      <div className={css.contactSection}>
        <div className={css.formSection}>
          <ContactForm onSubmit={addContacts} />
        </div>

        <div className={css.listSection}>
          <h2 className={css.titelContacts}>Contacts</h2>
          <Filter filter={filter} onFilter={onFilter} />
          {contacts.length > 0 ? (
            <ContactList
              items={onFilterSearch()}
              onDeleteContacts={deleteContact}
            />
          ) : (
            <p className={css.message}>Add a new contact!</p>
          )}
        </div>
      </div>
    </div>
  );
}
