import { nanoid } from 'nanoid';
import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import initialContacts from './Data/contacts.json';
import css from './App.module.css';
// import PropTypes from 'prop-types';

const LOCAL_STOR = 'contacts';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContacts = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
    const normaliseName = name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === normaliseName)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onFilter = event => {
    this.setState({ filter: event.target.value });
  };

  onFilterSearch = () => {
    const { contacts, filter } = this.state;
    const normaliseFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normaliseFilter)
    );
  };

  componentDidMount() {
    const savedContact = localStorage.getItem(LOCAL_STOR);
    const parsedContact = JSON.parse(savedContact);

    if (parsedContact) {
      this.setState(() => ({
        contacts: parsedContact,
      }));
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LOCAL_STOR, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.titel}>Phonebook</h1>
        <div className={css.contactSection}>
          <div className={css.formSection}>
            <ContactForm onSubmit={this.addContacts} />
          </div>

          <div className={css.listSection}>
            <h2 className={css.titelContacts}>Contacts</h2>
            <Filter filter={filter} onFilter={this.onFilter} />
            {contacts.length > 0 ? (
              <ContactList
                items={this.onFilterSearch()}
                onDeleteContacts={this.deleteContact}
              />
            ) : (
              <p className={css.message}>Add a new contact!</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
